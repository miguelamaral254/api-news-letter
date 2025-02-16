import { Router, Request, Response } from "express";
import { StreakController } from "../controllers/StreakController";

const streakController = new StreakController();
const router = Router();

/**
 * @swagger
 * tags:
 *   name: Streaks
 *   description: Gerenciar as streaks dos usuários
 */

/**
 * @swagger
 * path:
 *  /api/streak:
 *    post:
 *      summary: Calcular a streak de um usuário com base no email
 *      tags: [Streaks]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                  description: Email do usuário
 *      responses:
 *        200:
 *          description: Streak processada com sucesso
 *        400:
 *          description: Usuário não encontrado
 *        500:
 *          description: Erro interno no servidor
 */
router.post("/", async (req: Request, res: Response) => {
  try {
    await streakController.calculate(req, res);
  } catch (error) {
    console.error("Error in route:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/**
 * @swagger
 * path:
 *  /api/streak/reset:
 *    post:
 *      summary: Resetar a streak de um usuário com base no email
 *      tags: [Streaks]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                  description: Email do usuário
 *      responses:
 *        200:
 *          description: Streak resetada com sucesso
 *        400:
 *          description: Usuário não encontrado
 *        500:
 *          description: Erro interno no servidor
 */
router.post("/reset", async (req: Request, res: Response) => {
  try {
    await streakController.reset(req, res);
  } catch (error) {
    console.error("Error in route:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;