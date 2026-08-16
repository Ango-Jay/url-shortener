import { get, post } from "./http";

export type Alias = {
  alias: string;
  url: string;
  createdAt: string;
};

export function createAlias(url: string): Promise<Alias> {
  return post<Alias>("/aliases", { url });
}

export function getAlias(alias: string): Promise<Alias> {
  return get<Alias>(`/aliases/${encodeURIComponent(alias)}`);
}
