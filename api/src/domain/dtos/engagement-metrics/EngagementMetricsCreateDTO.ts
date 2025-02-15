import { IsNumber, IsUUID } from "class-validator";

export class EngagementMetricsCreateDTO {
  @IsUUID()
  userId!: string;

  @IsNumber()
  opens!: number;

  @IsNumber()
  clicks!: number;

  @IsNumber()
  shares!: number;
}