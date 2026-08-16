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

app.on("error", (err) => {
  logger.error({ err }, "Application error");
});

// middleware
app.use(cors());
app.use(requestLogMiddleware);
app.use(errorMiddleware);
app.use(bodyParser());

// modules
healthModule.install(app);
aliasModule.install(app);

app.listen(port, () => {
  logger.info(`Server listening on http://localhost:${port}`);
});
