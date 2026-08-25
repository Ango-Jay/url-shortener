import "reflect-metadata";
import Koa from "koa";
import cors from "@koa/cors";
import bodyParser from "koa-bodyparser";
import { config } from "./config";
import { createCache } from "./common/cache";
import { logger } from "./common/logger";
import { initializeDb } from "./config/db";
import type { Dependencies } from "./config/dependencies";
import { initializeRedis } from "./config/redis";
import { errorMiddleware } from "./middleware/error";
import { requestLogMiddleware } from "./middleware/request-log";
import { aliasModule } from "./modules/alias";
import { Alias } from "./modules/alias/model";
import { healthModule } from "./modules/health";

async function bootstrap(): Promise<void> {
  const app = new Koa();

  app.on("error", (err) => {
    logger.error({ err }, "Application error");
  });

  app.use(
    cors({
      origin: (ctx) => {
        const requestOrigin = ctx.get("Origin");
        const allowedOrigins = config.clientOrigins
          .flatMap((origin) => origin.split(","))
          .map((origin) => origin.trim())
          .filter(Boolean);

        return allowedOrigins.includes(requestOrigin) ? requestOrigin : "";
      },
    }),
  );
  app.use(requestLogMiddleware);
  app.use(errorMiddleware);
  app.use(bodyParser());

  const dataSource = await initializeDb();
  logger.info("Database connected");

  const redis = await initializeRedis();
  logger.info("Redis connected");

  const aliasCache = createCache<string, Alias>({
    max: 1000,
    ttl: 1000 * 60 * 5,
  });

  const dependencies: Dependencies = {
    aliasRepository: dataSource.getRepository(Alias),
    redis,
    aliasCache,
  };

  healthModule.install(app);
  aliasModule.install(app, dependencies);

  app.listen(config.port, () => {
    logger.info(`Server listening on http://localhost:${config.port}`);
  });
}

bootstrap().catch((err) => {
  logger.error({ err }, "Failed to start server");
  process.exit(1);
});
