import express, { Application } from "express";
import { AppDataSource } from "./infrastructure/db/data-source";
import { swaggerUi, swaggerSpec } from "./infrastructure/config/swagger.config";
import { corsOptions } from "./infrastructure/config/cors.config";
import Routes from "./api/routes/routes";
import cors from "cors";

export class Server {
  constructor(app: Application) {
    this.config(app);
    new Routes(app);
  }

  private config(app: Application): void {
    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  }
}

const app: Application = express();
AppDataSource.initialize()
  .then(() => {
    console.log("Banco de dados conectado.");

    const server: Server = new Server(app);
    const PORT: number = 8080;
    app.listen(PORT, "0.0.0.0", function () {
      console.log(`Servidor rodando na porta ${PORT}.`);
      console.log(`Documentação Swagger disponível em: http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((error) => {
    console.error("Erro ao conectar ao banco de dados:", error);
  });