// src/api/controllers/StreakController.ts
import { Request, Response } from "express";
import { StreakService } from "../../domain/services/StreakService";
import { UserService } from "../../domain/services/UserService";

export class StreakController {
  private streakService: StreakService;
  private userService: UserService;

  constructor() {
    this.streakService = new StreakService();
    this.userService = new UserService();
  }

  // Calcular a streak
  async calculate(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;  // O email vem do corpo da requisição

    try {
      // Buscando o usuário com base no email
      const user = await this.userService.getByEmail(email);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Chamando o método do service para calcular o streak
      await this.streakService.calculateStreak(user);

      return res.status(200).json({ message: "Streak processed successfully" });
    } catch (error) {
      console.error("Error in calculating streak:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async reset(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    try {
      const user = await this.userService.getByEmail(email);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      await this.streakService.resetStreakIfNeeded(user, new Date());
      return res.status(200).json({ message: "Streak reset successfully" });
    } catch (error) {
      console.error("Error in resetting streak:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}