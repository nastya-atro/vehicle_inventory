import { Exclude, Expose } from "class-transformer";

@Exclude()
export class VehicleListFiltersOutputDto {
  @Expose()
  q: string;

  @Expose()
  types: string[];
}
