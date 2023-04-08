import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { VehicleService } from "./vehicle.service";
import { ValidateDTO } from "../../common/decorators/validate-dto.decorator";
import { Host } from "../../common/decorators/host.decorator";
import { CurrentUser } from "../../common/decorators/current-user.decorators";
import { SessionUser } from "../../common/session/models/session.model";
import { PaginationPipe } from "../../common/pipes/pagination.pipe";
import { OrderPipe } from "../../common/pipes/order.pipe";
import { FiltersPipe } from "../../common/pipes/filters.pipe";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { FilesModel } from "./models/files.model";
import { VehicleCreateFileInputDto } from "./dto/input/vehicle-create-file.input.dto";
import { VehicleEditFileInputDto } from "./dto/input/vehicle-edit-file.input.dto";
import { VehicleListFiltersOutputDto } from "./dto/output/vehicle-list-filters.output.dto";

@Controller("vehicle")
@UseGuards()
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Get(":id")
  @ValidateDTO()
  async findOne(@Param("id", ParseIntPipe) id: number) {
    return await this.vehicleService.findOne(id);
  }

  @Get()
  @ValidateDTO()
  async findAll(
    @Query(
      new PaginationPipe(),
      new OrderPipe(),
      new FiltersPipe(VehicleListFiltersOutputDto)
    )
    query
  ) {
    const { pagination, order, filters } = query;
    return await this.vehicleService.findAll(pagination, order, filters);
  }

  @ValidateDTO()
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: "imageFile", maxCount: 1 },
      { name: "croppedImageFile", maxCount: 1 },
    ])
  )
  async create(
    @UploadedFiles()
    files: FilesModel,
    @Body() body: VehicleCreateFileInputDto,
    @Host() domain,
    @CurrentUser() user: SessionUser
  ) {
    return await this.vehicleService.create(
      body.vehicle,
      domain,
      user?.id,
      files
    );
  }

  @ValidateDTO()
  @Put(":id")
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: "imageFile", maxCount: 1 },
      { name: "croppedImageFile", maxCount: 1 },
    ])
  )
  edit(
    @UploadedFiles()
    files: FilesModel,
    @Param("id", ParseIntPipe) id: number,
    @Body() body: VehicleEditFileInputDto
  ) {
    return this.vehicleService.edit(id, body.vehicle, files);
  }

  @Delete(":id")
  async delete(@Param("id", ParseIntPipe) id: number) {
    return await this.vehicleService.remove(id);
  }
}
