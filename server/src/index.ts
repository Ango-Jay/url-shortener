import Koa from "koa";
import cors from "@koa/cors";
import bodyParser from "koa-bodyparser";
import { errorMiddleware } from "./middleware/error";
import { aliasModule } from "./modules/alias";
import { healthModule } from "./modules/health";

const app = new Koa();
const port = Number(process.env.PORT) || 3000;

app.on("error", (err) => {
  console.error(err);
});

// middleware
app.use(errorMiddleware);
app.use(cors());
app.use(bodyParser());

// modules
healthModule.install(app);
aliasModule.install(app);

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
