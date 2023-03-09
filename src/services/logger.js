import { createLogger, format, transports } from "winston";

const { combine, timestamp, label, printf } = format;

const loggerFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
  format: combine(label({ label: "index.js" }), timestamp(), loggerFormat),
  transports: [new transports.File({ filename: "application.log" })],
});

export const createLog = (data) => {
  logger.info(JSON.stringify({ action: "Get post from ChatGPT", data }));
};
