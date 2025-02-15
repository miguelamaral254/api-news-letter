import "reflect-metadata";
import { DataSource } from "typeorm";
import { config } from "../config/db.config"; 

import path from 'path';
import { User } from "../../domain/models/User";
import { Streak } from "../../domain/models/Streak";
import { EngagementMetrics } from "../../domain/models/EngagementMetrics";
import { Newsletter } from "../../domain/models/Newsletter";
import { Badge } from "../../domain/models/Badge";

export const AppDataSource = new DataSource({
    type: config.dialect as "mysql" | "postgres" | "sqlite" | "mssql" | "oracle",
    host: config.HOST!,
    port: config.PORT,
    username: config.USER!,
    password: config.PASSWORD!,
    database: config.DB!,
    entities: [
        User,
        Streak,
        EngagementMetrics,
        Newsletter,
        Badge,
    ],
    synchronize: true,
    migrationsRun: true,
    migrations: [],
    logging: false,
});
