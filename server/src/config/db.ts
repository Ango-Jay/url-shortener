import { DataSource } from "typeorm";
import { Alias } from "../modules/alias/model";

export async function initializeDb(): Promise<DataSource> {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is not configured");
  }

  const dataSource = new DataSource({
    type: "postgres",
    url,
    entities: [Alias],
    synchronize: true,
  });

  if (!dataSource.isInitialized) {
    await dataSource.initialize();
  }

  return dataSource;
}
