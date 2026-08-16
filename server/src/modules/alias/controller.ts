import type { Context } from "koa";
import { BadRequestError } from "../../common/error";
import * as aliasService from "./service";

export async function getAlias(ctx: Context): Promise<void> {
  const alias = ctx.params.alias;
  const result = aliasService.getAlias(alias);

  ctx.status = 200;
  ctx.body = result;
}

export async function createAlias(ctx: Context): Promise<void> {
  const body = ctx.request.body as { alias?: string; url?: string } | undefined;
  const alias = body?.alias?.trim();
  const url = body?.url?.trim();

  if (!alias || !url) {
    throw new BadRequestError("alias and url are required");
  }

  const created = aliasService.createAlias(alias, url);
  ctx.status = 201;
  ctx.body = created;
}
