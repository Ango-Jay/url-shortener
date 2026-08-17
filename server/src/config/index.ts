import dotenv from "dotenv";

export type AppConfig = {
  nodeEnv: "development" | "production";
  isProduction: boolean;
  port: number;
  apiPublicUrl: string;
  clientOrigins: string[];
  databaseUrl: string;
  redisUrl: string;
  logLevel: string;
};

export const config: AppConfig = (() => {
  dotenv.config();

  const requireEnv = (name: string): string => {
    const value = process.env[name];
    if (!value) {
      throw new Error(`${name} is not configured`);
    }
    return value;
  };

  const isProduction = process.env.NODE_ENV === "production";
  const logLevel = process.env.LOG_LEVEL ?? "info";

  if (isProduction) {
    const rawPort = process.env.API_PORT ?? process.env.PORT;
    if (!rawPort) {
      throw new Error("API_PORT is not configured");
    }

    const port = Number(rawPort);
    if (!Number.isFinite(port) || port <= 0) {
      throw new Error("API_PORT is not configured");
    }

    return {
      nodeEnv: "production",
      isProduction: true,
      port,
      apiPublicUrl: requireEnv("API_PUBLIC_URL").replace(/\/$/, ""),
      clientOrigins: [requireEnv("CLIENT_URL")],
      databaseUrl: requireEnv("DATABASE_URL"),
      redisUrl: requireEnv("REDIS_URL"),
      logLevel,
    };
  }

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not configured");
  }

  const redisUrl = process.env.REDIS_URL;
  if (!redisUrl) {
    throw new Error("REDIS_URL is not configured");
  }

  return {
    nodeEnv: "development",
    isProduction: false,
    port: Number(process.env.API_PORT ?? process.env.PORT) || 4000,
    apiPublicUrl: (process.env.API_PUBLIC_URL ?? "http://localhost:4000").replace(
      /\/$/,
      "",
    ),
    clientOrigins: [process.env.CLIENT_URL ?? "http://localhost:3001"],
    databaseUrl,
    redisUrl,
    logLevel,
  };
})();
