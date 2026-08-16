import { post } from "./http";

export type CreateAliasResponse = {
  shortLink: string;
};

export function createAlias(url: string): Promise<CreateAliasResponse> {
  return post<CreateAliasResponse>("/aliases", { url });
}
