// src/domain/repositories/EngagementMetricsRepository.ts
import { Repository } from "typeorm";
import { AppDataSource } from "../../infrastructure/db/data-source";
import { EngagementMetrics } from "../models/EngagementMetrics";

export class EngagementMetricsRepository {
  private engagementMetricsRepository: Repository<EngagementMetrics>;

  constructor() {
    this.engagementMetricsRepository = AppDataSource.getRepository(EngagementMetrics);
  }
  async findOneByUserId(userId: string): Promise<EngagementMetrics | null> {
    return this.engagementMetricsRepository.findOne({ where: { user: { id: userId } } });
  }
  async save(metrics: EngagementMetrics): Promise<EngagementMetrics> {
    return this.engagementMetricsRepository.save(metrics);
  }
}