import  express from "express";
import { logger, enableDebug } from "./utilities/logger";
import morgan from "./utilities/morganMiddleware"

const app = express();

const PORT: number = (process.env.NODE_PORT as unknown) as number || 3000;
const DEBUG = process.env.NODE_ENV === "development";
if (DEBUG) enableDebug(logger);

app.use(morgan);

app.get("/",(req:express.Request,res:express.Response) => {
    res.status(200).send("Hello");
})
app.listen(PORT, () => {
  logger.info("test info");
  logger.debug("test debug");
  logger.info("test info");
  logger.debug("test debug1");
});
