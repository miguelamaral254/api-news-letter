// src/api/routes/webhook.routes.ts
import { Router } from "express";
import { WebhookController } from "../controllers/WebhookController";

const webhookController = new WebhookController();
const router = Router();

/**
 * @swagger
 * tags:
 *   name: Webhook
 *   description: Gerenciar webhooks para o processamento de streaks
 */

/**
 * @swagger
 * path:
 *  /api/webhook:
 *    post:
 *      summary: Processar webhook para atualizar a streak do usuário
 *      tags: [Webhook]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                userId:
 *                  type: string
 *                  description: ID do usuário
 *                action:
 *                  type: string
 *                  description: Ação realizada (open, click, share, etc.)
 *      responses:
 *        200:
 *          description: Streak processada com sucesso
 *        400:
 *          description: Campos obrigatórios ausentes
 *        500:
 *          description: Erro ao processar a streak
 */
router.post("/", webhookController.handleWebhook.bind(webhookController));
export default router;