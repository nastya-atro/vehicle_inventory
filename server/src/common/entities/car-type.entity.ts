import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { VehicleEntity } from "./vehicle.entity";

@Entity("car_type")
export class CarTypeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 80 })
  type: string;

  @OneToMany(() => VehicleEntity, (v) => v.type)
  vehicle?: VehicleEntity[];

  constructor(status?: Partial<CarTypeEntity>) {
    status && Object.assign(this, status);
  }
}
