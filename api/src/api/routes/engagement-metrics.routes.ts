import { Router, Request, Response } from "express";
import { EngagementMetricsController } from "../controllers/EngagementMetricsController";

const engagementMetricsController = new EngagementMetricsController();
const router = Router();

/**
 * @swagger
 * tags:
 *   name: EngagementMetrics
 *   description: Gerenciar as métricas de engajamento dos usuários
 */

/**
 * @swagger
 * path:
 *  /api/engagement-metrics:
 *    get:
 *      summary: Obter métricas de engajamento de um usuário
 *      tags: [EngagementMetrics]
 *      parameters:
 *        - name: userEmail
 *          in: path
 *          required: true
 *          schema:
 *            type: string
 *          description: Email do usuário
 *      responses:
 *        200:
 *          description: Retorna as métricas de engajamento
 *        404:
 *          description: Usuário ou métricas não encontradas
 *        500:
 *          description: Erro interno no servidor
 */
router.get("/:userEmail", async (req: Request, res: Response) => {
  try {
    await engagementMetricsController.getMetrics(req, res);
  } catch (error) {
    console.error("Error in route:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/**
 * @swagger
 * path:
 *  /api/engagement-metrics:
 *    patch:
 *      summary: Atualizar métricas de engajamento de um usuário
 *      tags: [EngagementMetrics]
 *      parameters:
 *        - name: userEmail
 *          in: path
 *          required: true
 *          schema:
 *            type: string
 *          description: Email do usuário
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                action:
 *                  type: string
 *                  description: Tipo de ação ('open', 'click', 'share')
 *      responses:
 *        200:
 *          description: Métricas atualizadas com sucesso
 *        400:
 *          description: Ação inválida
 *        404:
 *          description: Usuário não encontrado
 *        500:
 *          description: Erro interno no servidor
 */
router.patch("/:userEmail", async (req: Request, res: Response) => {
  try {
    await engagementMetricsController.updateMetrics(req, res);
  } catch (error) {
    console.error("Error in route:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;