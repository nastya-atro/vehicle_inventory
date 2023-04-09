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

  @Expose()
  image: string;

  @Expose()
  latitude: number;

  @Expose()
  longitude: number;

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

  constructor(partial: Partial<VehicleEntity>) {
    Object.assign(this, partial);
  }

  static new(partial: Partial<VehicleEntity>) {
    return new VehicleOneOutputDto(partial);
  }
}
