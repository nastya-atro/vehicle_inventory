import { ValidateNested } from "class-validator";
import { plainToInstance, Transform, Type } from "class-transformer";
import { EditVehicleInputDto } from "./editVehicle.input.dto";

export class VehicleEditFileInputDto {
  @Transform(
    ({ value }) => plainToInstance(EditVehicleInputDto, JSON.parse(value)),
    {
      toClassOnly: true,
      toPlainOnly: false,
    }
  )
  @Type(() => EditVehicleInputDto)
  @ValidateNested({ each: true })
  vehicle: EditVehicleInputDto;
}
