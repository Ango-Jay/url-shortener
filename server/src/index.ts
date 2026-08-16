import Koa from "koa";
import cors from "@koa/cors";
import bodyParser from "koa-bodyparser";
import { logger } from "./common/logger";
import { errorMiddleware } from "./middleware/error";
import { requestLogMiddleware } from "./middleware/request-log";
import { aliasModule } from "./modules/alias";
import { healthModule } from "./modules/health";

const app = new Koa();
const port = Number(process.env.PORT) || 4000;
const allowedOrigins = (
  process.env.CLIENT_URL ?? "http://localhost:3001"
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.on("error", (err) => {
  logger.error({ err }, "Application error");
});

// middleware
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

app.listen(port, () => {
  logger.info(`Server listening on http://localhost:${port}`);
});
