import { IsNumber } from "class-validator";

export class CropInputDto {
  @IsNumber()
  readonly x1: number;

  @IsNumber()
  readonly y1: number;

  @IsNumber()
  readonly x2: number;

  @IsNumber()
  readonly y2: number;
}
