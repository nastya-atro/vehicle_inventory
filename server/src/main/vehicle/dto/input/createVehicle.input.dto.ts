import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { Transform, Type } from "class-transformer";
import { CropInputDto } from "./image-crop.input.dto";

export class CreateVehicleInputDto {
  @IsNotEmpty({ always: true })
  @IsString({ always: true })
  readonly name: string;

  @IsNotEmpty({ always: true })
  @IsNumber()
  readonly latitude: number;

  @IsNotEmpty({ always: true })
  @IsNumber()
  readonly longitude: number;

  @IsNotEmpty({ always: true })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  readonly type: number;

  @IsOptional()
  @IsString()
  readonly image: string;

  @IsOptional()
  @IsString()
  readonly originImage: string;

  @IsOptional()
  @Type(() => CropInputDto)
  @ValidateNested({ each: true })
  readonly imageCropSettings: CropInputDto;
}
