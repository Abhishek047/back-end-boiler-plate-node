import { LoggerFormat, Middleware } from "../types/router-types";

export const logger = (format: LoggerFormat): Middleware => (req, res, next) => {
    console.log(format);
    res.on("finish", function () {
        console.log("on request end", res.__customBody__);
    });
    next();
};
