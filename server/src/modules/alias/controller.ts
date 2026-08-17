import type { Context } from "koa";
import { BadRequestError } from "../../common/error";
import { config } from "../../config";
import type { CreateAliasResponse } from "./dto";
import type { AliasService } from "./service";

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
      shortLink: `${config.apiPublicUrl}/aliases/${created.alias}`,
    };

    ctx.status = 201;
    ctx.body = response;
  }

  return { getAlias, createAlias };
}
