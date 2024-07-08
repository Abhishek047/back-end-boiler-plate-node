/* eslint-disable @typescript-eslint/no-explicit-any */
interface ErrorResponse {
  status: number;
  message: string;
}
export class CustomError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "CustomError";

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }
  }
}
export const handleError = (error: any): ErrorResponse => {
  const response: ErrorResponse = {
    status: 500,
    message: "Internal Server Error",
  };
  console.log(error);
  if (error instanceof CustomError) {
    return {
      status: 400,
      message: error.message,
    };
  } else {
    return response;
  }
};
