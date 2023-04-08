import { Exclude, Expose, Type } from "class-transformer";
import { UserEntity } from "../../../common/entities/user.entity";
import { RoleOutputDto } from "./role.output.dto";
import { ProfileOutputDto } from "./profile.output.dto";

@Exclude()
export class UserProfileOutputDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  get firstName() {
    return this.profile.firstName;
  }

  @Expose()
  get lastName() {
    return this.profile.lastName;
  }

  @Expose()
  enabled: boolean;

  @Expose({ name: "role" })
  getRole() {
    return this.role.title;
  }

  @Type(() => RoleOutputDto)
  role: RoleOutputDto;

  profile: ProfileOutputDto;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
    if (partial?.profile) {
      Object.assign(this, { profile: partial.profile });
    }

    if (partial?.role) {
      Object.assign(this, { role: partial.role });
    }
  }

  static new(partial: Partial<UserEntity>) {
    return new UserProfileOutputDto(partial);
  }
}
