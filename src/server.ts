/* eslint-disable no-console */
import express from "express";
import { routers } from "./router";
import { createRouter } from "./utils/createRouter";
import { Middleware } from "./types/router-types";
import { logger } from "./middleware/logger";
import { DB } from "./database/db";
import { overrideSend } from "./middleware/overrideSend";
import { notFound } from "./middleware/notFound";
import admin from "firebase-admin";

const app = express();
const FIREBASE_CREDENTIALS = (process.env.FIREBASE_CREDENTIALS && JSON.parse(process.env.FIREBASE_CREDENTIALS)) || require("../firebase-credentials.json");
// update send function
const originalSend = app.response.send;
app.response.send = function sendOverWrite(body) {
  this.__customBody__ = body;
  return originalSend.call(this, body);
};

const DBInstance: DB = DB.getInstance();
admin.initializeApp({
  projectId: "matrix-cfa77",
  credential: admin.credential.cert(FIREBASE_CREDENTIALS),
});

const startServer = async () => {
  if (!DBInstance.connectionStatus()) {
    await DBInstance.connectDatabase();
  }
  app.use(express.json());
  app.use(overrideSend);
  // logger
  app.use(
    logger({
      time: "DD-MM-YYYY hh:mm:ss",
      showResponse: false,
    }),
  );
  const middlewares: Middleware[] = [];
  routers.forEach(router => {
    app.use(`/api${router.prefix}`, createRouter(router.routes, middlewares));
  });
  app.use("/health", (_, res) => {
    res.sendStatus(200);
  });
  // Middleware to handle 404 for non-existent routes
  app.use(notFound);
};

export { app, startServer };
