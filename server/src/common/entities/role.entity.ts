import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity("roles")
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 80 })
  title: string;

  @OneToMany(() => UserEntity, (user) => user.role)
  users?: UserEntity[];

  constructor(role?: Partial<RoleEntity>) {
    role && Object.assign(this, role);
  }
}
