/* eslint-disable no-unused-vars */
import { Response, Request, NextFunction } from "express";
import { UserRecord } from "firebase-admin/lib/auth/user-record";

export type Middleware = (req: Request, res: Response, next: NextFunction) => void;
export type Route = {
  path: string;
  method: "get" | "post" | "delete" | "patch";
  handler: (_req: Request, _res: Response) => void;
  middleware?: Middleware[];
};
export type Routes = {
  prefix: string;
  routes: Route[];
};
//logger format
declare module "express-serve-static-core" {
  interface Response {
    __customBody__?: any;
  }
  interface Request {
    __user?: UserRecord;
  }
}
export type LoggerFormat = {
  time?: string;
  showResponse?: boolean;
};

export type ResponseHandlerParams = {
  res: Response;
  status: number;
  json?: Record<string, any>;
};

export type ResponseHandler = (params: ResponseHandlerParams) => void;
