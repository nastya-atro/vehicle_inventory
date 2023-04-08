import { Exclude, Expose } from "class-transformer";
import { RoleEntity } from "../../../common/entities/role.entity";

@Exclude()
export class RoleOutputDto {
  @Expose()
  title: string;

  constructor(partial: Partial<RoleEntity>) {
    Object.assign(this, partial);
  }

  static new(partial: Partial<RoleEntity>) {
    return new RoleOutputDto(partial);
  }
}
