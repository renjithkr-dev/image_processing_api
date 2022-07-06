import express, { Router } from "express";
import { constants } from "fs";
import { access } from "fs/promises";
import { logger } from "../../../utilities/logger";
import imageConverter from "../../../utilities/imageProcessor";
import * as ImgSettings from "../../../utilities/types";
import { OutputInfo } from "sharp";

const router = Router();

const verifyImageQueryParams = (
  params: any
): { success: boolean; message: string } => {
  const info: { success: boolean; message: string } = {
    success: true,
    message: "Verified",
  };
  if (!params.filename || !params.height || !params.width) {
    info.success = true;
    info.message = "Missing mandatory parameter(s)";
  }
  for (const element in params) {
    logger.debug(params[element]);
    if (typeof params[element] !== "string") {
      info.success = false;
      info.message = "Possible duplicate parameter(s)";
      return info;
    }
  }
  return info;
};

const errorHandler = (
  err: Error,
  req: express.Request,
  res: express.Response
) => {
  res.status(500).send(err.message);
};

router.get("/", (req: express.Request, res: express.Response): void => {
  res
    .status(200)
    .send(
      "<h2>Call /images with the following query parameters</h2> <ul><li>filename</li><li>width</li><li>height</li></ul>"
    );
});

router.get(
  "/images",
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    const queryVerificationStatus = verifyImageQueryParams(req.query);
    if (!queryVerificationStatus.success) {
      res.status(400).send(queryVerificationStatus.message);
    }
    try {
      logger.debug(`Checking access to assets/full/${req.query.filename}`);
      await access(`assets/full/${req.query.filename}`, constants.F_OK);

      logger.info("file exists");

      let width = Number.isNaN(req.query.width) ? "500" : req.query.width;
      let height = Number.isNaN(req.query.height) ? "500" : req.query.height;

      // setup image options
      logger.debug(req.query.height + ": " + typeof req.query.height);
      const imgOptions: ImgSettings.ImageOptions = {
        fit: req.query.fit
          ? (req.query.fit as unknown as ImgSettings.ImageFit)
          : ImgSettings.ImageFit.cover,
        format: ImgSettings.ImageFormat.jpeg,
        quality: req.query.quality
          ? parseInt(req.query.quality as unknown as string)
          : 100,
      };

      const fname: string = req.query.filename as unknown as string;
      const outFile =
        fname?.slice(0, fname?.lastIndexOf(".")) + `-${width}-${height}.jpg`;
      try {
        await access(`assets/thumbs/${outFile}`, constants.F_OK);
        logger.debug("Thumbnail  available");
        res.status(200).send(`<img src="/images/thumbs/${outFile}"/>`);
      } catch (thumbError) {
        logger.debug("Thumbnail not available");

        imageConverter(
          `assets/full/${req.query.filename}`,
          width as string,
          height as string,
          `assets/thumbs/${outFile}`,
          imgOptions
        )
          .then((info: OutputInfo) => {
            logger.info("Image converted successfully ");
            logger.debug(
              "Image dimensions : " + info.width + " : " + info.height
            );
            width = info.width.toString();
            height = info.height.toString();
          })
          .catch((err) => {
            logger.error(err.message);
          });
        res
          .status(200)
          .send(
            `<img src="/images/thumbs/${outFile}"/> <!--  width=${width} height=${height} -->`
          );
      }
    } catch (err) {
      logger.error(err);
      Error.stackTraceLimit = 0;
      next(new Error(`file ${req.query.filename} doesn't exist`));
    }
  }
);

router.use(errorHandler);

export default router;
