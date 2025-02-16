import { Request, Response } from "express";
import { StreakService } from "../../domain/services/StreakService";
import { UserService } from "../../domain/services/UserService";

export class WebhookController {
  private streakService: StreakService;
  private userService: UserService;

  constructor() {
    this.streakService = new StreakService();
    this.userService = new UserService();
  }

  async handleWebhook(req: Request, res: Response): Promise<void> {
    const { userId, action } = req.body;

    if (!userId || !action) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }

    try {
      const user = await this.userService.getById(userId);
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      const updatedUser = await this.streakService.calculateStreak(user);
      res.status(200).json({
        message: "Streak processed successfully",
        user: updatedUser,
      });
    } catch (error) {
      res.status(500).json({
        message: "An error occurred while processing the streak",
        error: (error as Error).message,
      });
    }
  }
}