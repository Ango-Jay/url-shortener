import type { Repository } from "typeorm";
import type { Alias } from "../modules/alias/model";
import type { RedisClient } from "./redis";

export type Dependencies = {
  aliasRepository: Repository<Alias>;
  redis: RedisClient;
};
