import { IsDate, IsNumber, IsUUID } from "class-validator";

export class StreakCreateDTO {
  @IsUUID()
  userId!: string;

  @IsUUID()
  newsletterId!: string;

  @IsNumber()
  streak!: number;

  @IsDate()
  lastOpenedAt!: Date;
}