import Router from "@koa/router";
import { createModule } from "../../common/module";
import { createRateLimitMiddleware } from "../../middleware/rate-limit";
import { createAliasController } from "./controller";
import { createAliasService } from "./service";

export const aliasModule = createModule("alias", (dependencies) => {
  if (!dependencies?.aliasRepository) {
    throw new Error("Alias module requires aliasRepository");
  }

  if (!dependencies.redis) {
    throw new Error("Alias module requires redis");
  }

  const service = createAliasService(dependencies.aliasRepository);
  const controller = createAliasController(service);
  const rateLimit = createRateLimitMiddleware(dependencies.redis);
  const router = new Router();

  router.get("/aliases/:alias", controller.getAlias);
  router.post("/aliases", rateLimit, controller.createAlias);

  return router;
});
