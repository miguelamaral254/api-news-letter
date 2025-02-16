import { Application } from "express";
import userRoutes from "./user.routes";
import webhookRoutes from "./webhook.routes";
import streakRoutes from "./streak.routes";
import engagementMetricsRoutes from "./engagement-metrics.routes";
//import newsletterRoutes from "./newsletter.routes";
//import badgeRoutes from "./badge.routes";

export default class Routes {
  constructor(app: Application) {
    // Definindo as rotas para cada entidade
    app.use("/api/users", userRoutes);
    app.use("/api/webhook", webhookRoutes); 

    app.use("/api/streaks", streakRoutes);
    app.use("/api/engagement-metrics", engagementMetricsRoutes);
    //app.use("/api/newsletters", newsletterRoutes);
    //app.use("/api/badges", badgeRoutes);
  }
}