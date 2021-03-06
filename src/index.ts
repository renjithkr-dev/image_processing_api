import express from "express";
import { logger, enableDebug } from "./utilities/logger";
import morgan from "./utilities/morganMiddleware";

import APIRouter from "./routes/api/index";

const app = express();

const PORT: number = (process.env.NODE_PORT as unknown as number) || 3000;
const DEBUG = process.env.NODE_ENV === "development";
if (DEBUG) enableDebug(logger);

app.use(morgan);
app.use("/images", express.static("assets"));

app.use("/api", APIRouter);

app.get("/", (req: express.Request, res: express.Response) => {
  res.status(200).send("<h3>Available routes</h3><ul><li>api/v1</li></ul>");
});

app.get("*", (req: express.Request, res: express.Response) => {
  res.status(404).send("Not found");
});

const errorHandler = (
  err: Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  res.status(500).send(err.message);
};

app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Server started on localhost:${PORT}`);
});

export default app;
