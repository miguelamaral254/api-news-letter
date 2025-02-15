import { Request, Response } from "express";
import { UserService } from "../../domain/services/UserService";
import { UserCreateDTO } from "../../domain/dtos/user/UserCreateDTO";
import { UserResponseDTO } from "../../domain/dtos/user/UserResponseDTO";


export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  // Criar um usuário
  async create(req: Request, res: Response): Promise<void> {
    try {
      const userData: UserCreateDTO = req.body;
      const user = await this.userService.create(userData);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ message: "Error creating user", error });
    }
  }

  // Obter todos os usuários
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const users: UserResponseDTO[] = await this.userService.getAll();
      res.status(200).json(users);
    } catch (error) {
      res.status(400).json({ message: "Error fetching users", error });
    }
  }
}