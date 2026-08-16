import Router from "@koa/router";
import { createModule } from "../../common/module";
import { getHealth } from "./controller";

const router = new Router();

router.get("/health", getHealth);

export const healthModule = createModule("health", router);
