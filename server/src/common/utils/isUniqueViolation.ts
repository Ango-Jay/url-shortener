const UNIQUE_VIOLATION_CODES = new Set([
  "23505", // PostgreSQL, CockroachDB, SQLite
  "1062", // MySQL, MariaDB
  "2627", // SQL Server (unique constraint)
  "2601", // SQL Server (unique index)
  "ORA-00001", // Oracle
]);

function getDriverCode(error: unknown): string | undefined {
  if (typeof error !== "object" || error === null) {
    return undefined;
  }

  const withCode = error as {
    code?: unknown;
    driverError?: { code?: unknown };
  };

  const code = withCode.driverError?.code ?? withCode.code;
  return typeof code === "string" || typeof code === "number"
    ? String(code)
    : undefined;
}

export function isUniqueViolation(error: unknown): boolean {
  const code = getDriverCode(error);
  return code !== undefined && UNIQUE_VIOLATION_CODES.has(code);
}
