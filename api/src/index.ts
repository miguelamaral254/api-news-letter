import express, { Application } from "express";
import { AppDataSource } from "./infrastructure/db/data-source";
import { swaggerUi, swaggerSpec } from "./infrastructure/config/swagger.config";
import { corsOptions } from "./infrastructure/config/cors.config";
import Routes from "./api/routes/routes";
import cors from "cors";
import http, { Server } from "http";

export const startServer = async (): Promise<Server> => {
  const app: Application = express();

  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  try {
    await AppDataSource.initialize();
    console.log("Banco de dados conectado.");

    new Routes(app);

    const PORT: number = 8080;
    const server: Server = http.createServer(app);

    server.listen(PORT, "0.0.0.0", () => {
      console.log(`Servidor rodando na porta ${PORT}.`);
      console.log(`Documentação Swagger disponível em: http://localhost:${PORT}/api-docs`);
    });

    server.unref();
    return server;

  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
    throw error;
  }
};