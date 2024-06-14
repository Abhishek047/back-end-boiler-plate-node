import express from "express";
import { Middleware, Route } from "../types/router-types";

// If want to add middleware while verifying
export const createRouter = (routes: Route[], middlewares: Middleware[] = []) => {
  const router = express.Router();
  routes.forEach((route: Route) => {
    const middleware = route.middleware ? [...route.middleware, ...middlewares] : middlewares;
    router[route.method](route.path, ...middleware, route.handler);
  });
  return router;
};
