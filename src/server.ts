import express from 'express';
import mongoose from 'mongoose';
import { routers } from './router';
import { createRouter } from './utils/createRouter';
import { Middleware } from './types/router-types';

const app = express();

// mongo connection
const MONGO_URI =
  process.env.IS_PRODUCTION || process.env.IS_QA || process.env.IS_DEV
    ? `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_CLUSTER}.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`
    : // : `mongodb://localhost:27017/spark`;
    ``;
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
const middlewares: Middleware[] = [];
routers.forEach((router) => {
  app.use(`/api${router.prefix}`, createRouter(router.routes, middlewares));
});
app.use('/', (_, res) => {
  res.sendStatus(200);
})

export { app };
