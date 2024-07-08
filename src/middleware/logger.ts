/* eslint-disable no-console */
import chalk from "chalk";
import { LoggerFormat, Middleware } from "../types/router-types";
import moment from "moment";
import path from "path";

const methodColor: chalk.Chalk = chalk.bold.green;
const timeColor: chalk.Chalk = chalk.dim.bold;
const successColor: chalk.Chalk = chalk.greenBright;
const infoColor: chalk.Chalk = chalk.whiteBright;
const fileNameColor: chalk.Chalk = chalk.underline.magenta;
const errorColor: chalk.Chalk = chalk.redBright;
const changeColor: chalk.Chalk = chalk.blueBright;

const thisLine = () => {
  try {
    const e = new Error();
    if (!e.stack) {
      return;
    }
    const regex = /\((.*):(\d+):(\d+)\)$/;
    const match = regex.exec(e.stack.split("\n")[3]);
    if (!match) {
      return;
    }
    const fileName = path.basename(match[1]);
    return `${fileName} ${match[2]}:${match[3]}`;
  } catch (error) {
    console.log("error in finding file");
  }
};

const responseCode = (code: number): chalk.Chalk => {
  if (code >= 200 && code <= 299) {
    return successColor;
  } else if (code >= 300 && code <= 399) {
    return changeColor;
  } else {
    return errorColor;
  }
};

export const logger =
  (format: LoggerFormat): Middleware =>
  (req, res, next) => {
    const showTime = process.env.IS_DEV ? false : true;
    const startTime = Date.now();
    const requestFormat: string[] = [];
    if (showTime) {
      requestFormat.push(timeColor(moment().format(format.time || "LLL")));
    }
    requestFormat.push(methodColor(`-> /${req.method}`));
    requestFormat.push(chalk.green(`${req.originalUrl}`));
    console.log(requestFormat.join(" "));
    res.on("finish", () => {
      const responseFormat: string[] = [];
      const color: chalk.Chalk = responseCode(res.statusCode);
      responseFormat.push(`${color.bold(`<- ${res.statusCode}, Time- ${Date.now() - startTime}ms ${req.method.toLowerCase()}(${req.baseUrl || req.url})\n`)}`);
      if (showTime) {
        responseFormat.push(timeColor(moment().format(format.time || "LLL")));
      }
      if (format.showResponse) {
        responseFormat.push(chalk.green(`\n ${JSON.stringify(res.__customBody__, null, 2)}`));
      }
      console.log(responseFormat.join(" "));
    });
    next();
  };

const successLog = (message: any) => console.log(successColor(message));
const infoLog = (message: any) => {
  return console.log(fileNameColor(thisLine()), infoColor(message));
};

export { successLog, infoLog };
