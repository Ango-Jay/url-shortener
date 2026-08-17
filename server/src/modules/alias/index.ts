import Router from "@koa/router";
import { createModule } from "../../common/module";
import { createAliasController } from "./controller";
import { createAliasService } from "./service";

export const aliasModule = createModule("alias", (dependencies) => {
  if (!dependencies?.aliasRepository) {
    throw new Error("Alias module requires aliasRepository");
  }

  const service = createAliasService(dependencies.aliasRepository);
  const controller = createAliasController(service);
  const router = new Router();

  router.get("/aliases/:alias", controller.getAlias);
  router.post("/aliases", controller.createAlias);

  return router;
});
