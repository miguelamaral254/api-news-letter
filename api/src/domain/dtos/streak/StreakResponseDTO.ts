import { Streak } from "../../models/Streak";

export class StreakResponseDTO {
  id: string;
  streak: number;
  lastOpenedAt: Date;
  userId: string;
  newsletterId: string;

  constructor(streak: Streak) {
    this.id = streak.id;
    this.streak = streak.streak;
    this.lastOpenedAt = streak.lastOpenedAt;
    this.userId = streak.user.id;
    this.newsletterId = streak.newsletter.id;
  }
}