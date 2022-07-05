/* eslint-disable prefer-promise-reject-errors */
import sharp, { OutputInfo } from "sharp";
import { logger } from "./logger";
import { ImageOptions } from "./types";

// accepts location to the inout file and output file return success/failure
const imageConverter = (
  infile: string,
  width: string,
  height: string,
  outFile: string,
  imgOptions: ImageOptions
): Promise<OutputInfo> => {
  return new Promise((resolve, reject) => {
    return sharp(infile)
      .resize(parseInt(width), parseInt(height), imgOptions)
      .toFile(outFile)
      .then((info: OutputInfo) => {
        resolve(info);
      })
      .catch((err) => {
        logger.error(err.message);
        reject(err);
      });
  });
};

export default imageConverter;
