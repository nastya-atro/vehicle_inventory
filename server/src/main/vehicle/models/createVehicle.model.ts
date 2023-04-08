import { ImageCropSettings } from "../../../common/models/image-crop-settings.model";

export interface CreateVehicleModel {
  name: string;
  type: number;
  image: string;
  latitude: number;
  longitude: number;
  originImage: string;
  imageCropSettings: ImageCropSettings;
}
