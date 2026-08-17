import type { Repository } from "typeorm";
import type { Alias } from "../modules/alias/model";

export type Dependencies = {
  aliasRepository: Repository<Alias>;
};
