import { Middleware } from '../types/router-types';

export const overrideSend: Middleware = (req, res, next) => {
  const originalSend = res.send;
  res.send = function sendOverWrite(body) {
    this.__customBody__ = body;
    return originalSend.call(this, body);
  };
  next();
};
