import { ConflictError, NotFoundError } from "../../common/error";
import type { Alias } from "./model";

const aliases = new Map<string, Alias>();

export function getAlias(alias: string): Alias {
  const result = aliases.get(alias);

  if (!result) {
    throw new NotFoundError("Alias not found", "ALIAS_NOT_FOUND");
  }

  return result;
}

export function createAlias(alias: string, url: string): Alias {
  const existing = aliases.get(alias);
  if (existing) {
    throw new ConflictError("Alias already exists", "ALIAS_ALREADY_EXISTS");
  }

  const created: Alias = {
    alias,
    url,
    createdAt: new Date().toISOString(),
  };

  aliases.set(alias, created);
  return created;
}
