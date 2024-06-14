import express from 'express';
import mongoose from 'mongoose';
import { routers } from './router';
import { createRouter } from './utils/createRouter';
import { Middleware } from './types/router-types';
import { logger } from './middleware/logger';

const app = express();

// update send function
const originalSend = app.response.send;
app.response.send = function sendOverWrite(body) {
  this.__customBody__ = body;
  return originalSend.call(this, body);
};


// mongo connection
const MONGO_URI =
  process.env.IS_PRODUCTION || process.env.IS_QA || process.env.IS_DEV
    ? `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_CLUSTER}.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`
    : `mongodb://localhost:27017/database`;

const connectDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Database connected...');
  } catch (error) {
    console.log('Mongo connection error');
  }
};

connectDatabase();

app.use(express.json());
// logger
app.use(logger({
  time: "format"
}))
const middlewares: Middleware[] = [];
routers.forEach((router) => {
  app.use(`/api${router.prefix}`, createRouter(router.routes, middlewares));
});
app.use('/', (_, res) => {
  res.sendStatus(200);
})

export { app };
