import { Repository } from "typeorm";
import { AppDataSource } from "../../infrastructure/db/data-source";
import { Streak } from "../models/Streak";

export class StreakRepository {
  private streakRepository: Repository<Streak>;

  constructor() {
    this.streakRepository = AppDataSource.getRepository(Streak);
  }

  async findOneByUserId(userId: string): Promise<Streak | null> {
    return this.streakRepository.findOne({ where: { user: { id: userId } } });
  }

  async save(streak: Streak): Promise<Streak> {
    return this.streakRepository.save(streak);
  }
}