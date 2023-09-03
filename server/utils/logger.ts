import * as winston from "winston";
import dayjs from "dayjs";
export const logger: winston.Logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  level: "info",
  transports: [
    new winston.transports.File({
      filename: `./logs/${getYMDTime()}-error.log`,
      level: "error",
    }),
    new winston.transports.File({ filename: "./logs/all.log" }),
  ],
});

function getYMDTime() {
  return dayjs().format("YYYY_MM_DD");
}
