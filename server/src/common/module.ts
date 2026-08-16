import type Koa from "koa";
import type Router from "@koa/router";

export type AppModule = {
  name: string;
  router: Router;
  install(app: Koa): void;
};

export function createModule(name: string, router: Router): AppModule {
  return {
    name,
    router,
    install(app) {
      app.use(router.routes()).use(router.allowedMethods());
    },
  };
}
