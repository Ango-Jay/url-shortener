import type Koa from "koa";
import type Router from "@koa/router";
import type { Dependencies } from "../config/dependencies";

export type AppModule = {
  name: string;
  install(app: Koa, dependencies?: Dependencies): void;
};

export function createModule(
  name: string,
  setup: (dependencies?: Dependencies) => Router,
): AppModule {
  return {
    name,
    install(app, dependencies) {
      const router = setup(dependencies);
      app.use(router.routes()).use(router.allowedMethods());
    },
  };
}
