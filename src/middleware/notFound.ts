import { Middleware } from '../types/router-types';

export const notFound: Middleware = (_, res, next) => {
  res.status(404).json({
    message: 'Route not found',
  });
  next();
};
