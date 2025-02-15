// src/domain/services/UserService.ts
import { AppDataSource } from "../../infrastructure/db/data-source";
import { User } from "../models/User";
import { Repository } from "typeorm";
import { UserCreateDTO } from "../dtos/user/UserCreateDTO";
import { UserResponseDTO } from "../dtos/user/UserResponseDTO";
import { validateOrReject } from "class-validator";

export class UserService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  async create(userData: UserCreateDTO): Promise<UserResponseDTO> {
    await validateOrReject(userData);

    const user = this.userRepository.create(userData);
    const savedUser = await this.userRepository.save(user);

    return new UserResponseDTO(savedUser);
  }

  async getAll(): Promise<UserResponseDTO[]> {
    const users = await this.userRepository.find();
    return users.map((user) => new UserResponseDTO(user));
  }
}