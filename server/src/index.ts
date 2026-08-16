import Koa from "koa";
import { healthModule } from "./modules/health";

const app = new Koa();
const port = Number(process.env.PORT) || 3000;

healthModule.install(app);

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
