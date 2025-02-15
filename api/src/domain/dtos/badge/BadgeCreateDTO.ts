import { IsDate, IsString, IsUUID } from "class-validator";

export class BadgeCreateDTO {
  @IsUUID()
  userId!: string;

  @IsString()
  name!: string;

  @IsString()
  description!: string;

  @IsDate()
  awardedAt!: Date;
}