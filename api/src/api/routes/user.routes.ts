// src/api/routes/user.routes.ts
import { Router } from "express";
import { UserController } from "../controllers/UserController";

const userController = new UserController();
const router = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Gerenciar usuários
 */

/**
 * @swagger
 * path:
 *  /api/users:
 *    post:
 *      summary: Criação de um novo usuário
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                  description: Email do usuário
 *                name:
 *                  type: string
 *                  description: Nome do usuário
 *      responses:
 *        201:
 *          description: Usuário criado com sucesso
 *        400:
 *          description: Dados inválidos
 */
router.post("/", userController.create.bind(userController));

/**
 * @swagger
 * path:
 *  /api/users:
 *    get:
 *      summary: Listar todos os usuários
 *      tags: [Users]
 *      responses:
 *        200:
 *          description: Lista de usuários
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: string
 *                      description: ID do usuário
 *                    email:
 *                      type: string
 *                      description: Email do usuário
 *                    name:
 *                      type: string
 *                      description: Nome do usuário
 *        500:
 *          description: Erro no servidor
 */
router.get("/", userController.getAll.bind(userController));

export default router;