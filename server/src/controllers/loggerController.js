const winston = require("winston");
const logger = new winston.Logger({
  transports: [
    new winston.transports.File({
      name: "info-file",
      filename: "src/logs/info.log",
      level: "info",
      json: true,
      maxsize: 10485760, // 10mb
      maxFiles: 5,
    }),
    new winston.transports.File({
      name: "error-file",
      filename: "src/logs/error.log",
      level: "error",
      json: true,
      maxsize: 10485760, // 10mb
      maxFiles: 5,
    }),
  ],
});

module.exports = logger;
