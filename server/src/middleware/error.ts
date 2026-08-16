import type { Context, Next } from "koa";
import { AppError, InternalError, toErrorBody } from "../common/error";

export async function errorMiddleware(ctx: Context, next: Next): Promise<void> {
  try {
    await next();
  } catch (err) {
    const error =
      err instanceof AppError ? err : new InternalError("Internal server error");

    if (!(err instanceof AppError)) {
      ctx.app.emit("error", err, ctx);
    }

    ctx.status = error.status;
    ctx.body = toErrorBody(error);
  }
}
