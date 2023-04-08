import { createParamDecorator } from "@nestjs/common";

export const Host = createParamDecorator((data, ctx) => {
  const req = ctx.switchToHttp().getRequest();
  return (
    process.env.CUSTOM_HOST ||
    `${req.get("X-Forwarded-Protocol") || req.protocol}://${req.get("host")}`
  );
});
