import { IsNumber, IsOptional } from "class-validator";

export class EngagementMetricsUpdateDTO {
  @IsOptional()
  @IsNumber()
  opens?: number;

  @IsOptional()
  @IsNumber()
  clicks?: number;

  @IsOptional()
  @IsNumber()
  shares?: number;
}