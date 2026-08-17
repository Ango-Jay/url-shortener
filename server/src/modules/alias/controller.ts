import type { Context } from "koa";
import { BadRequestError, InternalError } from "../../common/error";
import type { CreateAliasResponse } from "./dto";
import type { AliasService } from "./service";

function apiBase(): string {
  const base = process.env.API_PUBLIC_URL?.replace(/\/$/, "");
  if (!base) {
    throw new InternalError("API_PUBLIC_URL is not configured");
  }
  return base;
}

export function createAliasController(service: AliasService) {
  async function getAlias(ctx: Context): Promise<void> {
    const alias = ctx.params.alias;
    const result = await service.getAlias(alias);

    ctx.status = 302;
    ctx.set("Location", result.url);
  }

  async function createAlias(ctx: Context): Promise<void> {
    const body = ctx.request.body as { url?: string } | undefined;
    const url = body?.url?.trim();

    if (!url) {
      throw new BadRequestError("url is required");
    }

    const created = await service.createAlias(url);
    const response: CreateAliasResponse = {
      shortLink: `${apiBase()}/aliases/${created.alias}`,
    };

    ctx.status = 201;
    ctx.body = response;
  }

  return { getAlias, createAlias };
}
