import { StreakRepository } from "../repositories/StreakRepository";
import { User } from "../models/User";
import { Streak } from "../models/Streak";

export class StreakService {
  private streakRepository: StreakRepository;

  constructor() {
    this.streakRepository = new StreakRepository();
  }

  async calculateStreak(user: User): Promise<User> {
    const streak = await this.ensureStreakExists(user);
    this.adjustStreak(streak);
    user.streaks = [await this.streakRepository.save(streak)];
    return user;
  }

  async resetStreakIfNeeded(user: User, today: Date): Promise<User> {
    const streak = await this.ensureStreakExists(user);
    this.resetStreakIfOverdue(streak, today);
    user.streaks = [await this.streakRepository.save(streak)];
    return user;
  }

  private async ensureStreakExists(user: User): Promise<Streak> {
    const streak = await this.streakRepository.findOneByUserId(user.id);
    return streak || this.createInitialStreak(user);
  }

  private createInitialStreak(user: User): Streak {
    const streak = new Streak();
    streak.streak = 0;
    streak.lastOpenedAt = new Date();
    streak.user = user;
    return streak;
  }

  private adjustStreak(streak: Streak) {
    const now = new Date();
    const differenceInDays = Math.floor((now.getTime() - streak.lastOpenedAt.getTime()) / (1000 * 3600 * 24));
    if (differenceInDays === 1) {
      streak.streak += 1;
    } else if (differenceInDays > 1) {
      streak.streak = 1;
    }
    streak.lastOpenedAt = now;
  }

  private resetStreakIfOverdue(streak: Streak, today: Date) {
    const differenceInDays = Math.floor((today.getTime() - streak.lastOpenedAt.getTime()) / (1000 * 3600 * 24));
    if (differenceInDays > 1) {
      streak.streak = 0;
    }
    streak.lastOpenedAt = today;
  }
}