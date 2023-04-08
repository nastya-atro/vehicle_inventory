import { createParamDecorator } from "@nestjs/common";

export const CurrentUser = createParamDecorator((data, ctx) => {
  const req = ctx.switchToHttp().getRequest();
  if (req && req.session && req.session.currentUser) {
    const user = req.session.currentUser;
    return user;
  }
  return null;
});
