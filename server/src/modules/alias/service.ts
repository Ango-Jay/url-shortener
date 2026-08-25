import type { Repository } from "typeorm";
import { nanoid } from "nanoid";
import type { Cache } from "../../common/cache";
import { BadRequestError, ConflictError, NotFoundError } from "../../common/error";
import { isUniqueViolation } from "../../common/utils/isUniqueViolation";
import { validateUrl } from "../../common/utils/validateUrl";
import { Alias } from "./model";

const MAX_LENGTH = 8;
const MAX_RETRY_ATTEMPT = 5;

export function createAliasService(
  repository: Repository<Alias>,
  cache: Cache<string, Alias>,
) {
  async function getAlias(alias: string): Promise<Alias> {
    const cached = cache.get(alias);
    if (cached) {
      return cached;
    }

    const result = await repository.findOneBy({ alias });

    if (!result) {
      throw new NotFoundError("Alias not found", "ALIAS_NOT_FOUND");
    }

    cache.set(alias, result);
    return result;
  }

  async function createAlias(url: string): Promise<Alias> {
    if (!validateUrl(url)) {
      throw new BadRequestError("Invalid url", "INVALID_URL");
    }

    for (let attempt = 0; attempt < MAX_RETRY_ATTEMPT; attempt++) {
      const alias = nanoid(MAX_LENGTH);
      const created = repository.create({ alias, url });

      try {
        const saved = await repository.save(created);
        cache.set(saved.alias, saved);
        return saved;
      } catch (error) {
        if (isUniqueViolation(error)) {
          continue;
        }
        throw error;
      }
    }

    throw new ConflictError("Alias already exists", "ALIAS_ALREADY_EXISTS");
  }

  return { getAlias, createAlias };
}

export type AliasService = ReturnType<typeof createAliasService>;
