import { Request, Response } from "express";
import { StreakService } from "../../domain/services/StreakService";

export class WebhookController {

  private streakService: StreakService;

  constructor() {
    this.streakService = new StreakService();
  }

  async handleWebhook(req: Request, res: Response) {
    const { userId, action } = req.body;

    if (!userId || !action) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    try {
      const updatedUser = await this.streakService.calculateStreak(userId);

      return res.status(200).json({
        message: "Streak processed successfully",
        user: updatedUser,
      });
    } catch (error) {
      return res.status(500).json({
        message: "An error occurred while processing the streak",
        error: (error as Error).message,
      });
    }
  }
}