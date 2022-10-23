import winston from "winston";
const { combine, timestamp, label, printf } = winston.format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const options = {
  console: {
    level: "debug",
    handleExceptions: true,
    json: false,
    colorize: true,
    format: combine(label({ label: "express_server" }), timestamp(), myFormat),
  },
};

let logger = new winston.createLogger({
  transports: [new winston.transports.Console(options.console)],
  exitOnError: false,
});

logger.stream = {
  write: function (message, encoding) {
    logger.info(message);
  },
};

export default logger;
