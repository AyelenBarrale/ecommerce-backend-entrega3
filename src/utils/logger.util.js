import winston from "winston";

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.Console({ level: "info" }),
  ],
});

export { logger };
