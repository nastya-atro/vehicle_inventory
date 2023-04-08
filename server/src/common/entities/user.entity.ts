import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { ProfileEntity } from "./profile.entity";
import { RoleEntity } from "./role.entity";

@Entity("users")
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 50 })
  email: string;

  @Column({ name: "password_hash", type: "varchar", length: 64 })
  passwordHash: string;

  @Column({ name: "password_salt", type: "varchar", length: 16 })
  passwordSalt: string;

  @Column()
  enabled: boolean;

  @Column({ name: "token", type: "varchar", length: 64 })
  token: string;

  @Column({
    name: "token_expiration_date",
  })
  tokenExpirationDate: Date;

  @Column({ name: "confirm_token", type: "varchar", length: 64 })
  confirmToken: string;

  @Column()
  deleted: boolean;

  @Column({ name: "forgot_password_token", type: "varchar", length: 64 })
  forgotPasswordToken: string;

  @Column({
    name: "forgot_password_expiration_date",
  })
  forgotPasswordExpirationDate: Date;

  @Column({ name: "create_date" })
  createDate: Date;

  @ManyToOne(() => RoleEntity, (role) => role.users)
  @JoinColumn({ name: "role_id" })
  role?: RoleEntity;

  @OneToOne(() => ProfileEntity, (profile) => profile.id, {
    cascade: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "id" })
  profile?: ProfileEntity;

  constructor(user?: Partial<UserEntity>) {
    user && Object.assign(this, user);
  }
}
