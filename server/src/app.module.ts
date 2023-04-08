import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { APP_FILTER, APP_INTERCEPTOR, RouterModule } from "@nestjs/core";
import { ConfigModule } from "@nestjs/config";
import * as path from "path";
import { LoggerModule } from "./common/logger/logger.module";
import { TransformInterceptor } from "./common/interceptors/transform.interceptor";
import { AllExceptionFilter } from "./common/exeptions/all-exception.filter";
import { DatabaseModule } from "./database/database.module";
import { MainModule } from "./main/main.module";

const envFile = process.env.NODE_ENV
  ? `.env.${process.env.NODE_ENV}`
  : ".env.development";
const baseDir = path.join(__dirname, "../env");
const envPath = path.resolve(baseDir, `${envFile}`);

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`${baseDir}/.env.development.local`, envPath],
    }),
    DatabaseModule.forRoot(),
    RouterModule.register([
      {
        path: "",
        module: MainModule,
        children: [], // map module types
      },
    ]),
    MainModule,
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
  ],
})
export class AppModule {}
