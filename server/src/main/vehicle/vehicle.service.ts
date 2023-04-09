import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { ProfileEntity } from "../../common/entities/profile.entity";
import { VehicleEntity } from "../../common/entities/vehicle.entity";
import { CreateVehicleModel } from "./models/createVehicle.model";
import * as moment from "moment";
import { VehicleListOutputDto } from "./dto/output/vehicle-list.output.dto";
import { Order, Pagination } from "../../common/models/pagination.model";
import { getSortByAllowed } from "../../common/utils/pagination.utils";
import { EditVehicleModel } from "./models/editVehicle.model";
import { UserEntity } from "../../common/entities/user.entity";
import { TransportService } from "../../shared/transport/transport.service";
import { VehicleFilters } from "./models/vehicle-filters.model";
import { UploadPath } from "../../common/constants/uploadPath.constants";
import { cleaningDirectory, uploadImage } from "../../common/utils/fs.utils";
import * as path from "path";
import { CarTypeEntity } from "../../common/entities/car-type.entity";
import { FilesModel } from "./models/files.model";
import { VehicleOneOutputDto } from "./dto/output/vehicle-one.output.dto";

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(ProfileEntity)
    private profileRepository: Repository<ProfileEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(VehicleEntity)
    private vehicleRepository: Repository<VehicleEntity>,
    @InjectRepository(CarTypeEntity)
    private carTypeRepository: Repository<CarTypeEntity>,
    private dataSource: DataSource,
    private transport: TransportService
  ) {}

  async findAll(pagination: Pagination, order: Order, filters: VehicleFilters) {
    const { limit, page, offset } = pagination;
    const { sortOrder } = order;

    const sortBy: string = getSortByAllowed(order.sortBy, {
      id: "vehicle.id",
    });

    const query = this.dataSource
      .createQueryBuilder(VehicleEntity, "vehicle")
      .leftJoinAndSelect("vehicle.profile", "profile")
      .leftJoinAndSelect("vehicle.type", "car_type");

    //Filter by q search
    filters.q &&
      query.andWhere("vehicle.name LIKE :q", { q: `%${filters.q}%` });

    //Filter by types
    filters.types &&
      query.andWhere(`vehicle.type in (:types)`, {
        types: filters.types,
      });

    query.orderBy(sortBy, sortOrder).skip(offset).take(limit);

    const $count = query.getCount();
    const [total, results] = await Promise.all([$count, query.getMany()]);
    return {
      results: results.map(VehicleListOutputDto.new),
      totalPages: Math.ceil(total / limit),
      total,
      sortOrder,
      sortBy: order.sortBy,
      limit,
      page,
    };
  }

  async findOne(id: number) {
    const vehicle = await this.dataSource
      .createQueryBuilder(VehicleEntity, "vehicle")
      .addSelect("ST_X(`last_geo_point`)", "latitude")
      .addSelect("ST_Y(`last_geo_point`)", "longitude")
      .leftJoinAndSelect("vehicle.type", "type")
      .whereInIds([id])
      .getOne();

    if (!vehicle) {
      throw new NotFoundException();
    }

    return VehicleOneOutputDto.new(vehicle);
  }

  async create(
    vehicle: CreateVehicleModel,
    domain: string,
    userId: number,
    files: FilesModel
  ) {
    const { name, type, latitude, longitude } = vehicle;
    let vehicleId = null;
    const profile = await this.profileRepository.findOneBy({
      id: userId,
    });
    try {
      const selectedType = await this.carTypeRepository.findOneBy({
        id: type,
      });

      const geoPoint = `POINT(${latitude} ${longitude})`;

      await this.dataSource.transaction(async (manager) => {
        const newVehicle = await manager.save(VehicleEntity, {
          name,
          type: selectedType,
          createDate: moment.utc().toDate(),
          updateDate: "",
          lastConnection: "",
          lastGeoPoint: geoPoint,
          profile,
        });
        const { originImageFilename, croppedImageFilename } = this.uploadImages(
          newVehicle.id,
          files,
          vehicle.originImage,
          vehicle.image
        );

        const vehicleForUpdating = {
          ...newVehicle,
          originImage: originImageFilename,
          image: croppedImageFilename,
          imageCropSettings: vehicle.imageCropSettings,
        };

        await manager
          .createQueryBuilder()
          .update(VehicleEntity, { ...vehicleForUpdating })
          .whereInIds([newVehicle.id])
          .execute();

        vehicleId = newVehicle.id;

        if (files) {
          const uploadPath = path.join(
            UploadPath.globalVehiclesStoragePath,
            `${newVehicle.id}`
          );
          const image = path.basename(croppedImageFilename || "");
          const originImage = path.basename(originImageFilename || "");

          try {
            await cleaningDirectory(
              uploadPath,
              (file) => ![image, originImage].includes(file)
            );
          } catch (e) {
            // throw new ConflictException();
          }
        }
      });
      return { vehicleId };
    } catch (e) {
      if (e.code === "ER_DUP_ENTRY") {
        throw new ConflictException();
      }
      throw e;
    }
  }

  async edit(id: number, body: EditVehicleModel, files: FilesModel) {
    try {
      const { originImageFilename, croppedImageFilename } = this.uploadImages(
        id,
        files,
        body.originImage,
        body.image
      );

      const selectedType = await this.carTypeRepository.findOneBy({
        id: body.type,
      });

      const geoPoint = `POINT(${body.latitude} ${body.longitude})`;

      const vehicleForUpdating = {
        name: body.name,
        type: selectedType,
        updateDate: moment.utc().toDate(),
        lastConnection: body.lastConnection,
        lastGeoPoint: geoPoint,
        image: croppedImageFilename,
        originImage: originImageFilename,
        imageCropSettings: body.imageCropSettings,
      };

      await this.dataSource
        .createQueryBuilder()
        .update(VehicleEntity, vehicleForUpdating)
        .whereInIds([id])
        .execute();

      if (files) {
        const uploadPath = path.join(
          UploadPath.globalVehiclesStoragePath,
          `${id}`
        );
        const image = path.basename(croppedImageFilename || "");
        const originImage = path.basename(originImageFilename || "");

        try {
          await cleaningDirectory(
            uploadPath,
            (file) => ![image, originImage].includes(file)
          );
        } catch (e) {
          // throw new ConflictException();
        }
      }
      return { statusCode: 204 };
    } catch (e) {
      if (e.code === "ER_DUP_ENTRY") {
        throw new ConflictException();
      }
      throw e;
    }
  }

  private uploadImages(id: number, files: FilesModel, originImage, image) {
    const globalPath = UploadPath.globalVehiclesStoragePath;
    const localPath = UploadPath.localVehiclesStoragePath;
    const originImageFilename = files?.imageFile
      ? uploadImage(
          String(id),
          files.imageFile[0],
          globalPath,
          localPath,
          "origin-image"
        )
      : originImage || "";

    const croppedImageFilename = files?.croppedImageFile
      ? uploadImage(
          String(id),
          files.croppedImageFile[0],
          globalPath,
          localPath,
          "image"
        )
      : image || "";

    return { originImageFilename, croppedImageFilename };
  }

  async remove(id: number) {
    await this.vehicleRepository
      .createQueryBuilder()
      .delete()
      .whereInIds([id])
      .execute();

    return { statusCode: 204 };
  }
}
