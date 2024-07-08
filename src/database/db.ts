/* eslint-disable no-console */
import chalk from 'chalk';
import mongoose from 'mongoose';
import { successLog } from '../middleware/logger';

const MONGO_URI =
  process.env.IS_PRODUCTION || process.env.IS_QA || process.env.IS_DEV
    ? `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_CLUSTER}.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`
    : `mongodb://localhost:27017/database`;
class DB {
  #isConnected = false;
  static #instance: null | DB = null;
  constructor() {
    if (DB.#instance) {
      console.log('Call getInstance()...');
    }
    DB.#instance = this;
  }
  static getInstance() {
    if (!DB.#instance) {
      DB.#instance = new DB();
    }
    return DB.#instance;
  }
  connectionStatus() {
    console.log(this.#isConnected ? `Db connection Status ${this.#isConnected}` : chalk.yellow(`Db connection status ${this.#isConnected}`));
    return this.#isConnected;
  }
  async connectDatabase() {
    if (this.#isConnected) {
      successLog('Db already connected...');
      return;
    }
    try {
      this.#isConnected = true;
      await mongoose.connect(MONGO_URI);
      successLog('Database connected...');
    } catch (error) {
      console.log('Mongo connection error');
    }
  }
  async disconnectDatabase() {
    if (!this.#isConnected) {
      console.log('No connection found!');
    }
    try {
      await mongoose.disconnect();
      this.#isConnected = false;
      successLog('Database disconnected...');
    } catch (error) {
      console.error('Mongo disconnection error', error);
      throw error;
    }
  }
}

export { DB };
