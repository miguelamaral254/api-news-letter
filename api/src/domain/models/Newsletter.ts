import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Streak } from "./Streak";

@Entity()
export class Newsletter {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  title!: string;

  @Column({ nullable: true })
  subtitle!: string; 

  @Column()
  content!: string;

  @Column({ nullable: true })
  subjectLine!: string; 

  @Column({ nullable: true })
  slug!: string; 
  @Column({ nullable: true })
  thumbnailUrl!: string; 

  @Column({ nullable: true })
  webUrl!: string; 

  @Column({ default: "draft" })
  status!: string; 

  @Column("timestamp", { nullable: true })
  publishDate!: Date; 

  @Column("timestamp")
  created!: Date;

  @Column("json", { nullable: true })
  contentTags!: string[]; 

  @Column({ nullable: true })
  audience!: string; 

  @OneToMany(() => Streak, (streak) => streak.newsletter)
  streaks!: Streak[];
}