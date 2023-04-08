import { createParamDecorator } from "@nestjs/common";
import { SessionService } from "src/common/session/session.service";

export const Session = createParamDecorator((data, ctx) => {
  const req = ctx.switchToHttp().getRequest();
  return new SessionService(req);
});
