import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { ProfileEntity } from "./profile.entity";
import { CarTypeEntity } from "./car-type.entity";
import { ImageCropSettings } from "../models/image-crop-settings.model";

@Entity("vehicle")
export class VehicleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "name", type: "varchar", length: 80 })
  name: string;

  @Column({ name: "create_date" })
  createDate: Date;

  @Column({ name: "update_date" })
  updateDate: Date;

  @Column({ name: "last_connection" })
  lastConnection: Date;

  // @Column("geometry", {
  //   name: "last_geo_point",
  //   spatialFeatureType: "Point",
  //   srid: 4326,
  // })
  // @Index({ spatial: true })
  // lastGeoPoint: Geometry;

  @Column({
    name: "last_geo_point",
  })
  lastGeoPoint: string;

  @Column({ type: "varchar", length: 255 })
  image: string;

  @Column({ name: "origin_image", type: "varchar", length: 255 })
  originImage: string;

  @Column({ name: "image_crop_settings", type: "json" })
  imageCropSettings: ImageCropSettings;

  @ManyToOne(() => CarTypeEntity, (type) => type.id)
  @JoinColumn({ name: "type_id" })
  type?: CarTypeEntity;

  @ManyToOne(() => ProfileEntity, (profile) => profile.id)
  @JoinColumn({ name: "user_id" })
  profile?: ProfileEntity;

  constructor(stream?: Partial<VehicleEntity>) {
    stream && Object.assign(this, stream);
  }
}
