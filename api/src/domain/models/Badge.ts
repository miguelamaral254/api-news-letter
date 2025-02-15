// Representa um badge (distinção) concedido a um usuário por suas ações no sistema
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Badge {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => User, (user) => user.badges)
  @JoinColumn({ name: "user_id" })
  user!: User;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column("timestamp")
  awardedAt!: Date;
}