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
  const body = ctx.request.body as { url?: string } | undefined;
  const url = body?.url?.trim();

  if (!url) {
    throw new BadRequestError("url is required");
  }

  const created = aliasService.createAlias(url);
  ctx.status = 201;
  ctx.body = created;
}
