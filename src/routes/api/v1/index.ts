import express, { Router } from "express";
import { constants } from "fs";
import { access } from "fs/promises";
import { logger } from "../../../utilities/logger";

const router = Router();

const verifyImageQueryParams = (params: any): boolean => {
  if (!params.filename || !params.height || !params.width) return false;
  return true;
};

const errorHandler = (
  err: Error,
  req: express.Request,
  res: express.Response,
) => {
  res.status(500).send(err.message);
};

router.get("/", (req: express.Request, res: express.Response): void => {
  res
    .status(200)
    .send(
      "<h2>Call /images with the following query parameters</h2> <ul><li>filename</li><li>width</li><li>height</li></ul>",
    );
});

router.get(
  "/images",
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ): Promise<void> => {
    if (!verifyImageQueryParams(req.query)) {
      res.status(400).send("Missing mandatory params");
    }
    try {
      logger.debug(`Checking access to assets/full/${req.query.filename}`);
      await access(
        `assets/full/${req.query.filename}`,
        constants.F_OK,
      );

      logger.info("file exists");

      const width = Number.isNaN(parseInt(req.query.width as string, 10))
        ? 500
        : req.query.width;
      const height = Number.isNaN(parseInt(req.query.height as string, 10))
        ? 500
        : req.query.height;
      res
        .status(200)
        .send(
          `<img src="/images/full/${req.query.filename}" width=${width} height=${height}/>`,
        );
    } catch (err) {
      logger.error(err);
      Error.stackTraceLimit = 0;
      next(new Error(`file ${req.query.filename} doesn't exist`));
    }
  },
);

router.use(errorHandler);

export default router;
