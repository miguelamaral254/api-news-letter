// src/domain/services/NewsletterService.ts
import { AppDataSource } from "../../infrastructure/db/data-source";
import { Newsletter } from "../models/Newsletter";
import { Repository } from "typeorm";

import { validateOrReject } from "class-validator";
import { NewsletterCreateDTO } from "../dtos/newsletter/NewsletterCreateDTO";
import { NewsletterResponseDTO } from "../dtos/newsletter/NewsletterResponseDTO";

export class NewsletterService {
  private newsletterRepository: Repository<Newsletter>;

  constructor() {
    this.newsletterRepository = AppDataSource.getRepository(Newsletter);
  }

  async create(newsletterData: NewsletterCreateDTO): Promise<NewsletterResponseDTO> {
    // Valida os dados de entrada
    await validateOrReject(newsletterData);

    const newsletter = this.newsletterRepository.create(newsletterData);
    const savedNewsletter = await this.newsletterRepository.save(newsletter);

    return new NewsletterResponseDTO(savedNewsletter);
  }

  async getAll(): Promise<NewsletterResponseDTO[]> {
    const newsletters = await this.newsletterRepository.find();
    return newsletters.map((newsletter) => new NewsletterResponseDTO(newsletter));
  }
}