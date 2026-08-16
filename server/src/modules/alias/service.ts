import { nanoid } from "nanoid";
import { BadRequestError, ConflictError, NotFoundError } from "../../common/error";
import { validateUrl } from "../../common/utils/validateUrl";
import type { Alias } from "./model";

const MAX_LENGTH = 8; // determine the length of the alias
const MAX_RETRY_ATTEMPT = 5; // determine the maximum number of attempts to generate a unique alias
const aliases = new Map<string, Alias>();

export function getAlias(alias: string): Alias {
  const result = aliases.get(alias);

  if (!result) {
    throw new NotFoundError("Alias not found", "ALIAS_NOT_FOUND");
  }

  return result;
}

export function createAlias(url: string): Alias {
  if (!validateUrl(url)) {
    throw new BadRequestError("Invalid url", "INVALID_URL");
  }

  for (let attempt = 0; attempt < MAX_RETRY_ATTEMPT; attempt++) {
    const alias = nanoid(MAX_LENGTH);

    if (aliases.has(alias)) {
      continue;
    }

    const created: Alias = {
      alias,
      url,
      createdAt: new Date().toISOString(),
    };

    aliases.set(alias, created);
    return created;
  }

  throw new ConflictError("Alias already exists", "ALIAS_ALREADY_EXISTS");
}
