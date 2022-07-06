import { createLogger, format, Logger, transports } from "winston";

const logger = createLogger({
  level: "error",
  format: format.json(),
  transports: [new transports.Console()],
});

const debugConsole = new transports.Console({ level: "debug" });

const enableDebug = (l: Logger): void => {
  l.clear().add(debugConsole);
};
export { logger, enableDebug };
