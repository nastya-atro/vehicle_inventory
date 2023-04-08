import { Exclude, Expose, Type } from "class-transformer";
import { VehicleEntity } from "../../../../common/entities/vehicle.entity";
import { CarTypeEntity } from "../../../../common/entities/car-type.entity";
import { ImageCropSettingOutputDto } from "./image-crop-setting.output";
import { Point } from "geojson";

@Exclude()
export class VehicleOneOutputDto {
  @Expose()
  id: number;

  @Expose()
  name: number;

  @Expose()
  createDate: Date;

  @Expose()
  updateDate: Date;

  @Expose()
  lastConnection: Date;

  lastGeoPoint: Point;

  @Expose()
  image: string;

  @Expose()
  originImage: string;

  @Expose()
  @Type(() => ImageCropSettingOutputDto)
  imageCropSettings: ImageCropSettingOutputDto;

  type: CarTypeEntity;

  @Expose()
  get typeId() {
    return this.type.id;
  }

  @Expose()
  get latitude() {
    return 0;
  }

  @Expose()
  get longitude() {
    return 0;
  }

  constructor(partial: Partial<VehicleEntity>) {
    Object.assign(this, partial);
  }

  static new(partial: Partial<VehicleEntity>) {
    return new VehicleOneOutputDto(partial);
  }
}
