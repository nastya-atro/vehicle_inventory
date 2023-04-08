import { PassportStrategy } from "@nestjs/passport";
import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";

@Injectable()
export class AuthLocalStrategy extends PassportStrategy(
  Strategy,
  "authStrategy"
) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string) {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    if (!user.enabled) {
      throw new ForbiddenException(
        "User is not active or has been deactivated"
      );
    }
    return user;
  }
}
