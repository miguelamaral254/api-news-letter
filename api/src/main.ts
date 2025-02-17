import express, { Application } from "express";
import { AppDataSource } from "./infrastructure/db/data-source";
import { swaggerUi, swaggerSpec } from "./infrastructure/config/swagger.config";
import { corsOptions } from "./infrastructure/config/cors.config";
import Routes from "./api/routes/routes";
import cors from "cors";
import http, { Server } from "http";

const startServer = async (): Promise<Server> => {
  const app: Application = express();

  // Configurações do Express
  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Swagger documentation route
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  try {
    // Inicializa a conexão com o banco de dados
    await AppDataSource.initialize();
    console.log("Banco de dados conectado.");

    // Inicializa as rotas da API
    new Routes(app);

    // Configuração e inicialização do servidor HTTP
    const PORT: number = 8080;
    const server: Server = http.createServer(app);

    // Inicia o servidor
    server.listen(PORT, "0.0.0.0", () => {
      console.log(`Servidor rodando na porta ${PORT}.`);
      console.log(`Documentação Swagger disponível em: http://localhost:${PORT}/api-docs`);
    });

    // Permite que o processo de testes finalize corretamente
    server.unref();

    return server;

  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
    throw error; // Re-lançando o erro para que a falha seja tratada
  }
};

// Inicia a API ao chamar startServer
startServer().catch((error) => {
  console.error("Erro ao iniciar o servidor:", error);
});