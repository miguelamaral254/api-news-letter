// src/domain/services/StreakService.ts
import { AppDataSource } from "../../infrastructure/db/data-source";
import { Streak } from "../models/Streak";
import { Repository } from "typeorm";
import { StreakCreateDTO } from "../dtos/streak/StreakCreateDTO";
import { StreakResponseDTO } from "../dtos/streak/StreakResponseDTO";
import { validateOrReject } from "class-validator";

export class StreakService {
  private streakRepository: Repository<Streak>;

  constructor() {
    this.streakRepository = AppDataSource.getRepository(Streak);
  }

  async create(streakData: StreakCreateDTO): Promise<StreakResponseDTO> {
    // Valida os dados de entrada
    await validateOrReject(streakData);

    const streak = this.streakRepository.create(streakData);
    const savedStreak = await this.streakRepository.save(streak);

    return new StreakResponseDTO(savedStreak);
  }

  async getAll(): Promise<StreakResponseDTO[]> {
    const streaks = await this.streakRepository.find({ relations: ["user", "newsletter"] });
    return streaks.map((streak) => new StreakResponseDTO(streak));
  }
}