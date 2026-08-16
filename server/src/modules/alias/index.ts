import Router from "@koa/router";
import { createModule } from "../../common/module";
import { createAlias, getAlias } from "./controller";

const router = new Router();

router.get("/aliases/:alias", getAlias);
router.post("/aliases", createAlias);

export const aliasModule = createModule("alias", router);
