import { Exclude, Expose } from "class-transformer";
import { ProfileEntity } from "../../../common/entities/profile.entity";

@Exclude()
export class ProfileOutputDto {
  @Expose()
  id: number;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  constructor(partial: Partial<ProfileEntity>) {
    Object.assign(this, partial);
  }

  static new(partial: Partial<ProfileEntity>) {
    return new ProfileOutputDto(partial);
  }
}
