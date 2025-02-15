// Representa a newsletter, contendo o título, conteúdo e os streaks associados
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Streak } from "./Streak";

@Entity()
export class Newsletter {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  title!: string;

  @Column()
  content!: string;

  @OneToMany(() => Streak, (streak) => streak.newsletter)
  streaks!: Streak[];
}