import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NestExpressApplication } from "@nestjs/platform-express";
import helmet from "helmet";
import * as express from "express";
import * as session from "express-session";
import * as nocache from "nocache";
import { logger } from "./common/middleware/logger.middleware";
import { getCacheClient } from "./shared/redis";
import * as RedisStore from "connect-redis";
import { UploadPath } from "./common/constants/uploadPath.constants";

const PORT = parseInt(process.env.PORT, 10) || 3000;
const HOST = process.env.HOST || "localhost";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix(process.env.ROUTER_PREFIX);
  if (process.env.ALLOW_CORS) {
    app.enableCors({
      origin: process.env.ACCESS_CONTROL_ALLOW_ORIGIN.split(","),
      credentials: true,
    });
  }
  // app.use(helmet());
  app.use(nocache());
  app.use(logger);

  app.use(
    session({
      store: new (RedisStore(session))({
        client: getCacheClient(),
      }),
      cookie: {
        sameSite: false,
        httpOnly: true,
        secure: process.env.SESSION_SECURE === "true",
        maxAge: 24 * 60 * 60 * 1000, // 24 hours,
      },
      secret: process.env.SESSION_SECRET,
      name: process.env.SESSION_NAME,
      resave: false,
      saveUninitialized: false,
    })
  );

  app.use("/uploads", express.static(UploadPath.globalStoragePath));
  app.use("/images", express.static(UploadPath.globalImagesPath));

  await app.listen(PORT, HOST);
}
bootstrap();
