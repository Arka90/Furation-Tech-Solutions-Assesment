const { createLogger, transports, format } = require("winston");

module.exports.itemLogger = createLogger({
  transports: [
    new transports.File({
      filename: "item.log",
      level: "info",
      format: format.combine(format.timestamp(), format.json()),
    }),

    new transports.File({
      filename: "item-error.log",
      level: "error",
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
});
