import { DataSource } from "typeorm";
import { Alias } from "../modules/alias/model";
import { config } from "./index";

export async function initializeDb(): Promise<DataSource> {
  const dataSource = new DataSource({
    type: "postgres",
    url: config.databaseUrl,
    entities: [Alias],
    synchronize: true,
  });

  if (!dataSource.isInitialized) {
    await dataSource.initialize();
  }

  return dataSource;
}
