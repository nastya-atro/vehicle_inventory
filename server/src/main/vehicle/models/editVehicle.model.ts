import { ImageCropSettings } from "../../../common/models/image-crop-settings.model";

export interface EditVehicleModel {
  name: string;
  type: number;
  image: string;
  latitude: number;
  longitude: number;
  originImage: string;
  imageCropSettings: ImageCropSettings;
  lastConnection: Date | null;
}
