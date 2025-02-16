// Representa as métricas de engajamento de um usuário em relação às newsletters
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class EngagementMetrics {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => User, (user) => user.engagementMetrics)
  @JoinColumn({ name: "user_id" })
  user!: User;

  @Column("int", { default: 0 })
  opens!: number;

  @Column("int", { default: 0 })
  clicks!: number;

  @Column("int", { default: 0 })
  shares!: number;

  @Column("int", { default: 0 })
  unsubscribes!: number;

  @Column("int", { default: 0 })
  spamReports!: number;

  @Column("int", { default: 0 })
  recipients!: number;

  @Column("int", { default: 0 })
  delivered!: number;
}