import { EntityRepository, Repository } from "typeorm";
import { EngagementMetrics } from "../models/EngagementMetrics";

@EntityRepository(EngagementMetrics)
export class EngagementMetricsRepository extends Repository<EngagementMetrics> {
  // Custom queries can go here
}