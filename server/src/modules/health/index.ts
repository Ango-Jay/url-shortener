import Router from "@koa/router";
import { createModule } from "../../common/module";
import { getHealth } from "./controller";

export const healthModule = createModule("health", () => {
  const router = new Router();
  router.get("/health", getHealth);
  return router;
});
