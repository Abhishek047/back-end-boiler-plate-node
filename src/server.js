import express from "express";
import mongoose from "mongoose";
import { routers } from "./router";
import { createRouter } from "./utils/createRouter";

const app = express();
const PORT = process.env.PORT || 8080;

// mongo connection
const MONGO_URI =
  process.env.IS_PRODUCTION || process.env.IS_QA || process.env.IS_DEV
    ? `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_CLUSTER}.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`
    : `mongodb://localhost:27017/spark`;

const connectDatabase = async () => {
  await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

try {
  connectDatabase();
  console.log("Database connected...");
} catch (error) {
  console.log("Mongo connection error");
}

app.use(express.json());

routers.forEach((router) => {
  app.use(`/api${router.prefix}`, createRouter(router.routes, []));
});

app.listen(PORT, () => {
  console.log(`App is listening to port ${PORT}`);
});

process.on("SIGINT", () => {
  console.log("Stopping server...");
  process.exit();
});
