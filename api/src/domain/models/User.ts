// Representa o usuário no sistema, com informações básicas e métricas relacionadas a newsletters
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Streak } from "./Streak";
import { EngagementMetrics } from "./EngagementMetrics";
import { Badge } from "./Badge";  // Importação do Badge

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ nullable: true })
  name!: string;

  @OneToMany(() => Streak, (streak) => streak.user)
  streaks!: Streak[];

  @OneToMany(() => EngagementMetrics, (metrics) => metrics.user)
  engagementMetrics!: EngagementMetrics[];

  @OneToMany(() => Badge, (badge) => badge.user) 
  badges!: Badge[];  
}