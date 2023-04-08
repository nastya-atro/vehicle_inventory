import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { MainService } from "./main.service";
import { MainController } from "./main.controller";
import { VehicleModule } from "./vehicle/vehicle.module";
import { ProfileModule } from "./profile/profile.module";

@Module({
  imports: [AuthModule, VehicleModule, ProfileModule],
  providers: [MainService],
  controllers: [MainController],
  exports: [],
})
export class MainModule {}
