import { StreakService } from "../../domain/services/StreakService";
import { User } from "../../domain/models/User";
import { Streak } from "../../domain/models/Streak";
import { Newsletter } from "../../domain/models/Newsletter";
import { StreakRepository } from "../../domain/repositories/StreakRepository";

jest.mock("../../domain/repositories/StreakRepository");

describe("Streak Calculation", () => {
  it("should increment streak when a user opens a newsletter consecutively", async () => {
    const user = new User();
    user.email = "usuario@example.com";

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const streak = new Streak();
    streak.id = "123e4567-e89b-12d3-a456-426614174000";
    streak.streak = 3;
    streak.lastOpenedAt = yesterday;
    streak.user = user;
    streak.newsletter = new Newsletter();

    user.streaks = [streak];

    const streakRepositoryMock = jest.fn(() => ({
      findOneByUserId: jest.fn().mockResolvedValue(streak),
      save: jest.fn().mockResolvedValue(streak),
    }));

    const streakRepository = new streakRepositoryMock();
    jest.spyOn(StreakRepository.prototype, "findOneByUserId").mockImplementation(streakRepository.findOneByUserId);
    jest.spyOn(StreakRepository.prototype, "save").mockImplementation(streakRepository.save);

    const streakService = new StreakService();
    const updatedUser = await streakService.calculateStreak(user);

    expect(updatedUser.streaks[0].streak).toBe(4);
  });

  it("should reset streak when user misses a day", async () => {
    const user = new User();
    user.email = "usuario@example.com";

    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

    const streak = new Streak();
    streak.id = "123e4567-e89b-12d3-a456-426614174000";
    streak.streak = 3;
    streak.lastOpenedAt = twoDaysAgo;
    streak.user = user;
    streak.newsletter = new Newsletter();

    user.streaks = [streak];

    const streakRepositoryMock = jest.fn(() => ({
      findOneByUserId: jest.fn().mockResolvedValue(streak),
      save: jest.fn().mockResolvedValue(streak),
    }));

    const streakRepository = new streakRepositoryMock();
    jest.spyOn(StreakRepository.prototype, "findOneByUserId").mockImplementation(streakRepository.findOneByUserId);
    jest.spyOn(StreakRepository.prototype, "save").mockImplementation(streakRepository.save);

    const streakService = new StreakService();
    const updatedUser = await streakService.resetStreakIfNeeded(user, new Date());

    expect(updatedUser.streaks[0].streak).toBe(0);
  });
});