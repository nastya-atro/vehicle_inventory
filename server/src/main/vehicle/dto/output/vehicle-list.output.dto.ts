import { Exclude, Expose } from "class-transformer";
import { VehicleEntity } from "../../../../common/entities/vehicle.entity";
import { CarTypeEntity } from "../../../../common/entities/car-type.entity";
import { Point } from "geojson";

@Exclude()
export class VehicleListOutputDto {
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

  type: CarTypeEntity;

  @Expose()
  get typeName() {
    return this.type.type;
  }

  constructor(partial: Partial<VehicleEntity>) {
    Object.assign(this, partial);
  }

  static new(partial: Partial<VehicleEntity>) {
    return new VehicleListOutputDto(partial);
  }
}
