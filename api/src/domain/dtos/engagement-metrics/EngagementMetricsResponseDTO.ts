import { EngagementMetrics } from "../../models/EngagementMetrics";

export class EngagementMetricsResponseDTO {
  id: string;
  opens: number;
  clicks: number;
  shares: number;
  userId: string;

  constructor(metrics: EngagementMetrics) {
    this.id = metrics.id;
    this.opens = metrics.opens;
    this.clicks = metrics.clicks;
    this.shares = metrics.shares;
    this.userId = metrics.user.id;
  }
}