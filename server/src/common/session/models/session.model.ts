import { ROLES } from "../../constants/roles.constants";

export interface SessionUser {
  id?: number;
  username?: string;
  role?: ROLES.ADMIN | ROLES.EMPLOYEE;
}
