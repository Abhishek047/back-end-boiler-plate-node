import express from "express";

// If want to add middleware while verifying
export const createRouter = (routes, middlewares = []) => {
  const router = express.Router();
  routes.forEach((route) => {
    const middleware = route.middleware ? [...route.middleware, ...middlewares] : middlewares;
    router[route.method](route.path, ...middleware, route.handler);
  });
  return router;
};
