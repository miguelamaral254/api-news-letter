// src/domain/services/EngagementMetricsService.ts
import { AppDataSource } from "../../infrastructure/db/data-source";
import { EngagementMetrics } from "../models/EngagementMetrics";
import { Repository } from "typeorm";

import { validateOrReject } from "class-validator";
import { EngagementMetricsCreateDTO } from "../dtos/engagement-metrics/EngagementMetricsCreateDTO";
import { EngagementMetricsResponseDTO } from "../dtos/engagement-metrics/EngagementMetricsResponseDTO";

export class EngagementMetricsService {
  private engagementMetricsRepository: Repository<EngagementMetrics>;

  constructor() {
    this.engagementMetricsRepository = AppDataSource.getRepository(EngagementMetrics);
  }

  async create(metricsData: EngagementMetricsCreateDTO): Promise<EngagementMetricsResponseDTO> {
    // Valida os dados de entrada
    await validateOrReject(metricsData);

    const metrics = this.engagementMetricsRepository.create(metricsData);
    const savedMetrics = await this.engagementMetricsRepository.save(metrics);

    return new EngagementMetricsResponseDTO(savedMetrics);
  }

  async getAll(): Promise<EngagementMetricsResponseDTO[]> {
    const metrics = await this.engagementMetricsRepository.find({ relations: ["user"] });
    return metrics.map((metric) => new EngagementMetricsResponseDTO(metric));
  }
}