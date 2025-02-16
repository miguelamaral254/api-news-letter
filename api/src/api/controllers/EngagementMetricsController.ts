// src/api/controllers/EngagementMetricsController.ts
import { Request, Response } from "express";
import { EngagementMetricsService } from "../../domain/services/EngagementMetricsService";
import { UserService } from "../../domain/services/UserService";

export class EngagementMetricsController {
  private engagementMetricsService: EngagementMetricsService;
  private userService: UserService;

  constructor() {
    this.engagementMetricsService = new EngagementMetricsService();
    this.userService = new UserService();
  }

  async getMetrics(req: Request, res: Response): Promise<Response> {
    try {
      const { userEmail } = req.params;
      const user = await this.userService.getByEmail(userEmail);

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      const metrics = await this.engagementMetricsService.getMetricsByUser(user);

      if (!metrics) {
        return res.status(404).json({ message: "Métricas de engajamento não encontradas" });
      }

      return res.status(200).json(metrics);
    } catch (error) {
      return res.status(500).json({ message: "Erro interno do servidor", error });
    }
  }

  async updateMetrics(req: Request, res: Response): Promise<Response> {
    try {
      const { userEmail } = req.params;
      const { action } = req.body;

      if (!["open", "click", "share"].includes(action)) {
        return res.status(400).json({ message: "Ação inválida. Use 'open', 'click' ou 'share'" });
      }

      const user = await this.userService.getByEmail(userEmail);

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      let metrics = await this.engagementMetricsService.getMetricsByUser(user);

      if (!metrics) {
        metrics = await this.engagementMetricsService.createEngagementMetrics(user);
      }

      const updatedMetrics = await this.engagementMetricsService.updateEngagementMetrics(metrics, action);

      return res.status(200).json(updatedMetrics);
    } catch (error) {
      return res.status(500).json({ message: "Erro interno do servidor", error });
    }
  }
}