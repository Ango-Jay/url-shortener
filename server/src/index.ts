import Koa from "koa";
import cors from "@koa/cors";
import bodyParser from "koa-bodyparser";
import { healthModule } from "./modules/health";

const app = new Koa();
const port = Number(process.env.PORT) || 3000;

// middleware
app.use(cors());
app.use(bodyParser());

// modules
healthModule.install(app);

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
