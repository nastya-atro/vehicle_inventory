import { ProfileEntity } from "../../../common/entities/profile.entity";
import { RoleEntity } from "../../../common/entities/role.entity";

export interface SignInModel {
  id: number;
  email: string;
  passwordHash: string;
  passwordSalt: string;
  enabled: boolean;
  deleted: boolean;
  confirmToken: string;
  confirmTokenExpirationDate?: Date;
  forgotPasswordToken: string;
  forgotPasswordTokenExpirationDate?: Date;
  createDate: Date;
  role?: RoleEntity;
  profile?: ProfileEntity;
}
