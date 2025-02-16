import { Request, Response } from "express";
import { EngagementMetricsService } from "../../domain/services/EngagementMetricsService";
import { UserService } from "../../domain/services/UserService";
import { User } from "../../domain/models/User";

export class EngagementMetricsController {
  private engagementMetricsService: EngagementMetricsService;
  private userService: UserService;

  constructor() {
    this.engagementMetricsService = new EngagementMetricsService();
    this.userService = new UserService();
  }

  // Rota para obter as métricas de engajamento de um usuário
  async getMetrics(req: Request, res: Response): Promise<Response> {
    try {
      const { userEmail } = req.params;  

      // Buscar o usuário pelo email
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

  // Rota para atualizar as métricas de engajamento (ex: abrir, clicar, compartilhar)
  async updateMetrics(req: Request, res: Response): Promise<Response> {
    try {
      const { userEmail } = req.params;  // Aqui esperamos que o email seja passado na URL
      const { action } = req.body; // action: open, click, share

      // Validar se a ação é válida
      if (!["open", "click", "share"].includes(action)) {
        return res.status(400).json({ message: "Ação inválida. Use 'open', 'click' ou 'share'" });
      }

      // Buscar o usuário pelo email
      const user = await this.userService.getByEmail(userEmail);
      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      // Buscar as métricas do usuário
      let metrics = await this.engagementMetricsService.getMetricsByUser(user);

      // Se não encontrar métricas, cria um novo registro
      if (!metrics) {
        metrics = await this.engagementMetricsService.createEngagementMetrics(user);
      }

      // Atualizar as métricas conforme a ação
      const updatedMetrics = await this.engagementMetricsService.updateEngagementMetrics(metrics, action);

      return res.status(200).json(updatedMetrics);
    } catch (error) {
      return res.status(500).json({ message: "Erro interno do servidor", error });
    }
  }
}