// Representa o streak (sequência de aberturas) de um usuário em uma newsletter
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";
import { Newsletter } from "./Newsletter";

@Entity()
export class Streak {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => User, (user) => user.streaks)
  @JoinColumn({ name: "user_id" })
  user!: User;

  @ManyToOne(() => Newsletter, (newsletter) => newsletter.streaks)
  @JoinColumn({ name: "newsletter_id" })
  newsletter!: Newsletter;

  @Column()
  streak!: number;

  @Column()
  lastOpenedAt!: Date;
}