import { IsDate, IsOptional, IsString } from "class-validator";

export class BadgeUpdateDTO {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDate()
  awardedAt?: Date;
}