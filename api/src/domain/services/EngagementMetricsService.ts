import { EngagementMetricsRepository } from "../repositories/EngagementMetricsRepository";
import { EngagementMetrics } from "../models/EngagementMetrics";
import { User } from "../models/User";

export class EngagementMetricsService {
  private engagementMetricsRepository: EngagementMetricsRepository;

  constructor() {
    this.engagementMetricsRepository = new EngagementMetricsRepository();
  }

  async createEngagementMetrics(user: User): Promise<EngagementMetrics> {
    const metrics = new EngagementMetrics();
    metrics.user = user;
    metrics.opens = 0;
    metrics.clicks = 0;
    metrics.shares = 0;

    return await this.engagementMetricsRepository.save(metrics);
  }

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

  async getMetricsByUser(user: User): Promise<EngagementMetrics | null> {
    return this.engagementMetricsRepository.findOneByUserId(user.id);
  }
}