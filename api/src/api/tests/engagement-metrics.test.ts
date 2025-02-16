import { EngagementMetricsService } from "../../domain/services/EngagementMetricsService";
import { EngagementMetrics } from "../../domain/models/EngagementMetrics";
import { User } from "../../domain/models/User";
import { EngagementMetricsRepository } from "../../domain/repositories/EngagementMetricsRepository";

jest.mock("../../domain/repositories/EngagementMetricsRepository");

describe("Engagement Metrics", () => {
  let service: EngagementMetricsService;
  let repositoryMock: jest.Mock;

  beforeEach(() => {
    // Aqui a gente cria um mock do repositório que começa sem métrica nenhuma e retorna as métricas salvas
    repositoryMock = jest.fn(() => ({
      findOneByUserId: jest.fn().mockResolvedValue(null),
      save: jest.fn().mockImplementation((metrics: EngagementMetrics) => Promise.resolve(metrics)),
    }));

    // Injetamos o mock no repositório de métricas
    const engagementMetricsRepository = new repositoryMock();
    jest.spyOn(EngagementMetricsRepository.prototype, "findOneByUserId").mockImplementation(engagementMetricsRepository.findOneByUserId);
    jest.spyOn(EngagementMetricsRepository.prototype, "save").mockImplementation(engagementMetricsRepository.save);

    service = new EngagementMetricsService();
  });

  // Teste pra ver se a métrica começa do zero quando não existe nada e incrementa o contador de aberturas
  it("deve inicializar métricas se nenhuma existir e incrementar o contador de aberturas", async () => {
    const user = new User();
    user.email = "usuario@example.com";

    // Primeiro verificamos que não existe métrica nenhuma no início
    let metrics = await service.getMetricsByUser(user);
    expect(metrics).toBeNull();

    // Depois criamos uma nova métrica
    metrics = await service.createEngagementMetrics(user);
    expect(metrics.opens).toBe(0);

    // E testamos que ao incrementar, a abertura passa de 0 pra 1
    const updatedMetrics = await service.updateEngagementMetrics(metrics, "open");
    expect(updatedMetrics.opens).toBe(1);
  });

  // Teste pra ver se quando já tem métricas salvas, o contador de cliques é incrementado corretamente
  it("deve incrementar o contador de cliques para métricas existentes", async () => {
    const user = new User();
    user.email = "usuario@example.com";

    // Criamos uma métrica fictícia com valores já existentes
    const existingMetrics = new EngagementMetrics();
    existingMetrics.id = "fake-id";
    existingMetrics.user = user;
    existingMetrics.opens = 5;
    existingMetrics.clicks = 2;
    existingMetrics.shares = 1;

    // Simulamos que o repositório encontra essas métricas
    jest.spyOn(EngagementMetricsRepository.prototype, "findOneByUserId").mockResolvedValueOnce(existingMetrics);

    // Pega essas métricas salvas
    const metrics = await service.getMetricsByUser(user);
    expect(metrics).not.toBeNull();
    expect(metrics!.clicks).toBe(2);

    // E verifica que o clique foi incrementado
    const updatedMetrics = await service.updateEngagementMetrics(metrics!, "click");
    expect(updatedMetrics.clicks).toBe(3);
  });
});