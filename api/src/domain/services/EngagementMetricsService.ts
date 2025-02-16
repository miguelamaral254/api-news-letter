// src/domain/services/EngagementMetricsService.ts
import { EngagementMetricsRepository } from "../repositories/EngagementMetricsRepository";
import { EngagementMetrics } from "../models/EngagementMetrics";
import { User } from "../models/User";

export class EngagementMetricsService {
  private engagementMetricsRepository: EngagementMetricsRepository;

  constructor() {
    this.engagementMetricsRepository = new EngagementMetricsRepository();
  }

  // Criar ou inicializar as métricas de engajamento para o usuário
  async createEngagementMetrics(user: User): Promise<EngagementMetrics> {
    const metrics = new EngagementMetrics();
    metrics.user = user;
    metrics.opens = 0;
    metrics.clicks = 0;
    metrics.shares = 0;

    return await this.engagementMetricsRepository.save(metrics);
  }

  // Atualizar as métricas com base na ação (open, click, share)
  async updateEngagementMetrics(metrics: EngagementMetrics, action: "open" | "click" | "share"): Promise<EngagementMetrics> {
    if (action === "open") {
      metrics.opens += 1;
    } else if (action === "click") {
      metrics.clicks += 1;
    } else if (action === "share") {
      metrics.shares += 1;
    }

    return await this.engagementMetricsRepository.save(metrics);
  }

  // Buscar as métricas de engajamento para um usuário
  async getMetricsByUser(user: User): Promise<EngagementMetrics | null> {
    return this.engagementMetricsRepository.findOneByUserId(user.id);
  }
}