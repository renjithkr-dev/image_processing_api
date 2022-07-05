import express, { Router } from "express";
import { logger } from "../../../utilities/logger";

const router = Router();

const verifyImageQueryParams = (params: any): boolean => {
  if (!params.filename || !params.height || !params.width) return false;
  return true;
};

router.get("/", (req: express.Request, res: express.Response): void => {
  res
    .status(200)
    .send(
      "<h2>Call /images with the following query parameters</h2> <ul><li>filename</li><li>width</li><li>height</li></ul>",
    );
});

router.get("/images", (req: express.Request, res: express.Response): void => {
  if (!verifyImageQueryParams(req.query)) {
    res.status(400).send("Missing mandatory params");
  }
  const width = Number.isNaN(parseInt(req.query.width as string, 10))
    ? 100
    : req.query.width;
  const height = Number.isNaN(parseInt(req.query.height as string, 10))
    ? 100
    : req.query.height;
  res
    .status(200)
    .send(
      `<img src="/images/full/${req.query.filename}" width=${width} height=${height}/>`,
    );
});

export default router;
