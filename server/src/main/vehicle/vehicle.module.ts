import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VehicleService } from "./vehicle.service";
import { VehicleController } from "./vehicle.controller";
import { ProfileEntity } from "../../common/entities/profile.entity";
import { TransportModule } from "../../shared/transport/transport.module";
import { VehicleEntity } from "../../common/entities/vehicle.entity";
import { CarTypeEntity } from "../../common/entities/car-type.entity";
import { UserEntity } from "../../common/entities/user.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      VehicleEntity,
      CarTypeEntity,
      ProfileEntity,
      UserEntity,
    ]),
    TransportModule,
  ],
  providers: [VehicleService],
  controllers: [VehicleController],
  exports: [VehicleService],
})
export class VehicleModule {}
