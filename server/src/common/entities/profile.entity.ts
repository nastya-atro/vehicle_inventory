import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { UserEntity } from "./user.entity";

@Entity("profiles")
export class ProfileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "first_name", type: "varchar", length: 80 })
  firstName: string;

  @Column({ name: "last_name", type: "varchar", length: 80 })
  lastName: string;


  @OneToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({ name: "id" })
  user: UserEntity[];

  constructor(profile?: Partial<ProfileEntity>) {
    profile && Object.assign(this, profile);
  }
}
