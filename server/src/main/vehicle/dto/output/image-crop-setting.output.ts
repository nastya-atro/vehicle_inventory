import { IsNumber } from "class-validator";
import { ImageCropSettings } from "../../../../common/models/image-crop-settings.model";

export class ImageCropSettingOutputDto implements ImageCropSettings {
  @IsNumber({ maxDecimalPlaces: 0 })
  readonly x1: number;

  @IsNumber({ maxDecimalPlaces: 0 })
  readonly y1: number;

  @IsNumber({ maxDecimalPlaces: 0 })
  readonly x2: number;

  @IsNumber({ maxDecimalPlaces: 0 })
  readonly y2: number;
}
