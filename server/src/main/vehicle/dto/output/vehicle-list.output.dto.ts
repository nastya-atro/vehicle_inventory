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

  lastGeoPoint: Point;

  @Expose()
  image: string;

  type: CarTypeEntity;

  @Expose()
  get typeName() {
    return this.type.type;
  }

  @Expose()
  get geo() {
    return this.lastGeoPoint;
  }

  constructor(partial: Partial<VehicleEntity>) {
    Object.assign(this, partial);
  }

  static new(partial: Partial<VehicleEntity>) {
    return new VehicleListOutputDto(partial);
  }
}
