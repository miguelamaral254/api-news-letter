import { EngagementMetrics } from "../../domain/models/EngagementMetrics";
import { User } from "../../domain/models/User";


describe("Engagement Metrics", () => {
  it("should increment the open count when a user opens a newsletter", async () => {
    const user = new User();
    user.email = "usuario@example.com";
    const metrics = new EngagementMetrics();
    metrics.user = user;
    metrics.opens = 0;
    metrics.clicks = 0;
    metrics.shares = 0;

    const updatedMetrics = await updateEngagementMetrics(metrics, "open"); 

    expect(updatedMetrics.opens).toBe(1); 
  });

  it("should increment the click count when a user clicks on a newsletter", async () => {
    const user = new User();
    user.email = "usuario@example.com";
    const metrics = new EngagementMetrics();
    metrics.user = user;
    metrics.opens = 0;
    metrics.clicks = 0;
    metrics.shares = 0;

    const updatedMetrics = await updateEngagementMetrics(metrics, "click");

    expect(updatedMetrics.clicks).toBe(1); 
  });
});