export class AppError extends Error {
  readonly status: number;
  readonly code: string;

  constructor(status: number, code: string, message: string) {
    super(message);
    this.name = "AppError";
    this.status = status;
    this.code = code;
  }
}

export class BadRequestError extends AppError {
  constructor(message: string, code = "BAD_REQUEST") {
    super(400, code, message);
    this.name = "BadRequestError";
  }
}

export class NotFoundError extends AppError {
  constructor(message: string, code = "NOT_FOUND") {
    super(404, code, message);
    this.name = "NotFoundError";
  }
}

export class ConflictError extends AppError {
  constructor(message: string, code = "CONFLICT") {
    super(409, code, message);
    this.name = "ConflictError";
  }
}

export class InternalError extends AppError {
  constructor(message = "Internal server error", code = "INTERNAL_ERROR") {
    super(500, code, message);
    this.name = "InternalError";
  }
}

export type ErrorBody = {
  error: {
    status: number;
    code: string;
    message: string;
  };
};

export function toErrorBody(error: AppError): ErrorBody {
  return {
    error: {
      status: error.status,
      code: error.code,
      message: error.message,
    },
  };
}
