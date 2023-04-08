import * as path from "path";

export class UploadPath {
  static globalVehiclesStoragePath = path.join(
    process.env.STORAGE_DIR ||
      path.join(__dirname, "..", "..", "..", "public/"),
    "uploads/vehicles"
  );
  static localVehiclesStoragePath = "uploads/vehicles";

  static globalStoragePath = path.join(
    process.env.STORAGE_DIR ||
      path.join(__dirname, "..", "..", "..", "public/"),
    "uploads"
  );

  static globalImagesPath = path.join(
    process.env.STORAGE_DIR ||
      path.join(__dirname, "..", "..", "..", "public/"),
    "images"
  );
}
