// src/domain/services/BadgeService.ts
import { AppDataSource } from "../../infrastructure/db/data-source";
import { Badge } from "../models/Badge";
import { Repository } from "typeorm";
import { BadgeCreateDTO } from "../dtos/badge/BadgeCreateDTO";
import { BadgeResponseDTO } from "../dtos/badge/BadgeResponseDTO";
import { validateOrReject } from "class-validator";

export class BadgeService {
  private badgeRepository: Repository<Badge>;

  constructor() {
    this.badgeRepository = AppDataSource.getRepository(Badge);
  }

  async create(badgeData: BadgeCreateDTO): Promise<BadgeResponseDTO> {
    // Valida os dados de entrada
    await validateOrReject(badgeData);

    const badge = this.badgeRepository.create(badgeData);
    const savedBadge = await this.badgeRepository.save(badge);

    return new BadgeResponseDTO(savedBadge);
  }

  async getAll(): Promise<BadgeResponseDTO[]> {
    const badges = await this.badgeRepository.find({ relations: ["user"] });
    return badges.map((badge) => new BadgeResponseDTO(badge));
  }
}