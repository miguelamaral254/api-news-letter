import express, { Application } from "express";
import { Server } from "./index";
import { swaggerUi, swaggerSpec } from "./infrastructure/config/swagger.config";

const app: Application = express();
const server: Server = new Server(app);
const PORT: number = 8080;

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, "0.0.0.0", function () {
  console.log(`Servidor rodando na porta ${PORT}.`);
  console.log(`Documentação Swagger disponível em: http://localhost:${PORT}/api-docs`);
})
.on("error", (err: any) => {
  if (err.code === "EADDRINUSE") {
    console.log("Erro: Endereço já em uso!");
  } else {
    console.log(err);
  }
});