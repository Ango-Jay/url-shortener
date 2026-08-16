import type { Context } from "koa";
import { BadRequestError } from "../../common/error";
import type { CreateAliasResponse } from "./model";
import * as aliasService from "./service";

function apiBase(ctx: Context): string {
  const fromEnv = process.env.API_PUBLIC_URL?.replace(/\/$/, "");
  return fromEnv || ctx.origin;
}

export async function getAlias(ctx: Context): Promise<void> {
  const alias = ctx.params.alias;
  const result = aliasService.getAlias(alias);

  ctx.status = 302;
  ctx.set("Location", result.url);
}

export async function createAlias(ctx: Context): Promise<void> {
  const body = ctx.request.body as { url?: string } | undefined;
  const url = body?.url?.trim();

  if (!url) {
    throw new BadRequestError("url is required");
  }

  const created = aliasService.createAlias(url);
  const response: CreateAliasResponse = {
    shortLink: `${apiBase(ctx)}/aliases/${created.alias}`,
  };

  ctx.status = 201;
  ctx.body = response;
}
