import { ValidateNested } from "class-validator";
import { plainToInstance, Transform, Type } from "class-transformer";
import { CreateVehicleInputDto } from "./createVehicle.input.dto";

export class VehicleCreateFileInputDto {
  @Transform(
    ({ value }) => plainToInstance(CreateVehicleInputDto, JSON.parse(value)),
    {
      toClassOnly: true,
      toPlainOnly: false,
    }
  )
  @Type(() => CreateVehicleInputDto)
  @ValidateNested({ each: true })
  vehicle: CreateVehicleInputDto;
}
