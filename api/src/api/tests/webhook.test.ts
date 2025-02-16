// src/api/tests/webhook.test.ts
import { WebhookController } from "../controllers/WebhookController";
import { StreakService } from "../../domain/services/StreakService";
import { UserService } from "../../domain/services/UserService";
import { User } from "../../domain/models/User";
import { Streak } from "../../domain/models/Streak";
import { EngagementMetrics } from "../../domain/models/EngagementMetrics";
import { Badge } from "../../domain/models/Badge";

// Aqui a gente faz o mock dos serviços pra não precisar rodar os métodos reais
jest.mock("../../domain/services/StreakService");
jest.mock("../../domain/services/UserService");

describe("WebhookController", () => {
  let webhookController: WebhookController;
  let mockStreakService: jest.Mocked<StreakService>;
  let mockUserService: jest.Mocked<UserService>;

  beforeEach(() => {
    // Antes de cada teste, cria mocks "novinhos em folha"
    mockStreakService = new StreakService() as jest.Mocked<StreakService>;
    mockUserService = new UserService() as jest.Mocked<UserService>;

    // Instancia o controller e injeta os mocks
    webhookController = new WebhookController();
    (webhookController as any).streakService = mockStreakService;
    (webhookController as any).userService = mockUserService;
  });

  it("should receive the correct data and process the streak", async () => {
    // Testa um cenário onde os dados enviados estão corretos
    const mockReq = {
      body: {
        userId: "fake-user-id",
        action: "open",
      },
    };

    // Mock da resposta com funções espiãs
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Cria mocks de objetos de exemplo
    const streakMock = new Streak();
    streakMock.id = "streak-id";
    streakMock.streak = 5;
    streakMock.lastOpenedAt = new Date();

    const engagementMetricsMock = new EngagementMetrics();
    engagementMetricsMock.id = "metrics-id";
    engagementMetricsMock.opens = 10;
    engagementMetricsMock.clicks = 2;
    engagementMetricsMock.shares = 1;

    const badgeMock = new Badge();
    badgeMock.id = "badge-id";
    badgeMock.name = "First Streak";
    badgeMock.description = "Awarded for achieving a streak";
    badgeMock.awardedAt = new Date();

    // Preenche o usuário mockado com os dados bonitinhos
    const userMock: User = {
      id: "fake-user-id",
      email: "test@example.com",
      name: "Fake Name",
      streaks: [streakMock],
      engagementMetrics: [engagementMetricsMock],
      badges: [badgeMock],
    };

    // Diz pro mockUserService o que ele deve retornar
    mockUserService.getById.mockResolvedValue(userMock);
    mockStreakService.calculateStreak.mockResolvedValue(userMock);

    // Roda o método do controller com a requisição e resposta mockadas
    await webhookController.handleWebhook(mockReq as any, mockRes as any);

    // Verifica se o status foi 200 e se a resposta JSON está certinha
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "Streak processed successfully",
      user: userMock,
    });
  });

  it("should return an error if data is missing", async () => {
    // Testa o cenário onde não manda os dados necessários
    const mockReq = { body: {} };

    // Mock da resposta
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Chama o método do controller e verifica se retorna erro 400
    await webhookController.handleWebhook(mockReq as any, mockRes as any);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "Missing required fields",
    });
  });

  it("should return a 404 error if the user is not found", async () => {
    // Testa o caso em que o userId não existe
    const mockReq = {
      body: {
        userId: "nonexistent-user-id",
        action: "open",
      },
    };

    // Mock da resposta
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Configura o mock pra retornar null (usuário não encontrado)
    mockUserService.getById.mockResolvedValue(null);

    // Chama o método e verifica se retorna erro 404
    await webhookController.handleWebhook(mockReq as any, mockRes as any);

    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "User not found",
    });
  });

  it("should return a 500 error if there is a service failure", async () => {
    // Testa o caso em que dá algum erro interno no serviço
    const mockReq = {
      body: {
        userId: "fake-user-id",
        action: "open",
      },
    };

    // Mock da resposta
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock de um usuário "bonitinho"
    const streakMock = new Streak();
    streakMock.id = "streak-id";
    streakMock.streak = 5;
    streakMock.lastOpenedAt = new Date();

    const engagementMetricsMock = new EngagementMetrics();
    engagementMetricsMock.id = "metrics-id";
    engagementMetricsMock.opens = 10;
    engagementMetricsMock.clicks = 2;
    engagementMetricsMock.shares = 1;

    const badgeMock = new Badge();
    badgeMock.id = "badge-id";
    badgeMock.name = "First Streak";
    badgeMock.description = "Awarded for achieving a streak";
    badgeMock.awardedAt = new Date();

    const userMock: User = {
      id: "fake-user-id",
      email: "test@example.com",
      name: "Fake Name",
      streaks: [streakMock],
      engagementMetrics: [engagementMetricsMock],
      badges: [badgeMock],
    };

    // Configura o mock pra retornar erro no cálculo do streak
    mockUserService.getById.mockResolvedValue(userMock);
    mockStreakService.calculateStreak.mockRejectedValue(new Error("Some internal error"));

    // Chama o método e verifica se retorna erro 500
    await webhookController.handleWebhook(mockReq as any, mockRes as any);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "An error occurred while processing the streak",
      error: "Some internal error",
    });
  });
});