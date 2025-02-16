
import request from "supertest";
import { startServer } from "../../server";
import { Server } from "http"; // Importando o tipo Server

let server: Server;

beforeAll(async () => {
  server = await startServer();
});

afterAll(() => {
  server.close(); 
});

describe("POST /webhook", () => {
  it("should receive the correct data and process the streak", async () => {
    const mockData = {
      userId: "e0a3e4f4-df8b-4d84-9e5b-bca870b2fbb2",
      action: "open"
    };

    const response = await request(server).post("/api/webhook").send(mockData); // Mudança aqui

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Streak processed successfully");
  });

  it("should return an error if data is missing", async () => {
    const mockData = {};

    const response = await request(server).post("/api/webhook").send(mockData); // Mudança aqui

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Missing required fields");
  });
});