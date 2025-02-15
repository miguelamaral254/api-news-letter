import { IsDate, IsNumber, IsOptional } from "class-validator";

export class StreakUpdateDTO {
  @IsOptional()
  @IsNumber()
  streak?: number;

  @IsOptional()
  @IsDate()
  lastOpenedAt?: Date;
}