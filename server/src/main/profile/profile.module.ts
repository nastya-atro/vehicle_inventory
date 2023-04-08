import { Module } from "@nestjs/common";
import { ProfileService } from "./profile.service";
import { ProfileController } from "./profile.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../../common/entities/user.entity";
import { ProfileEntity } from "../../common/entities/profile.entity";
import { TransportModule } from "../../shared/transport/transport.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, ProfileEntity]),
    TransportModule,
  ],
  providers: [ProfileService],
  controllers: [ProfileController],
  exports: [ProfileService],
})
export class ProfileModule {}
