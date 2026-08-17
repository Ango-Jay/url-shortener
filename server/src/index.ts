import "reflect-metadata";
import path from "node:path";
import dotenv from "dotenv";
import Koa from "koa";
import cors from "@koa/cors";
import bodyParser from "koa-bodyparser";
import { initializeDb } from "./config/db";
import { logger } from "./common/logger";
import { errorMiddleware } from "./middleware/error";
import { requestLogMiddleware } from "./middleware/request-log";
import { aliasModule } from "./modules/alias";
import { healthModule } from "./modules/health";

async function bootstrap(): Promise<void> {
  dotenv.config({ path: path.resolve(__dirname, "../../.env.local") });

  const app = new Koa();
  const port = Number(process.env.API_PORT ?? process.env.PORT) || 4000;
  const allowedOrigins = (process.env.CLIENT_URL ?? "http://localhost:3001")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
// middleware
  app.on("error", (err) => {
    logger.error({ err }, "Application error");
  });

  app.use(
    cors({
      origin: (ctx) => {
        const requestOrigin = ctx.get("Origin");
        return allowedOrigins.includes(requestOrigin) ? requestOrigin : "";
      },
    }),
  );
  app.use(requestLogMiddleware);
  app.use(errorMiddleware);
  app.use(bodyParser());

  // modules
  healthModule.install(app);
  aliasModule.install(app);
  
// db
  await initializeDb();
  logger.info("Database connected");

  app.listen(port, () => {
    logger.info(`Server listening on http://localhost:${port}`);
  });
}

bootstrap().catch((err) => {
  logger.error({ err }, "Failed to start server");
  process.exit(1);
});
