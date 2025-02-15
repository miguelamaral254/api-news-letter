// src/infrastructure/config/swagger.config.ts
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API News Letter",
      version: "1.0.0",
      description: "Documentação da API para News Letter",
    },
    servers: [
      {
        url: "http://localhost:8080",
        description: "Servidor principal",
      },
    ],
  },
  apis: ["src/api/routes/**/*.ts"],  
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };