import { unlink, constants } from "fs";
import { access } from "fs/promises";

import imageConverter from '../utilities/imageProcessor'
import {ImageOptions,ImageFit,ImageFormat} from "../utilities/types";

it("Test Image conversion function", async () => {
    try{
        await access(`assets/thumbs/fjord-800-600,jpg`, constants.F_OK);
        unlink(`assets/thumbs/fjord-800-600,jpg`, () => {

        })
    }catch(e){ }
    const imgOptions: ImageOptions = {
        fit: ImageFit.cover,
        format: ImageFormat.jpeg,
        quality:  100,
      };
    const result= await imageConverter(
        `assets/full/fjord.jpg`,
        '800',
        '600',
        `assets/thumbs/fjord-800-600,jpg`,
        imgOptions
      )
      expect(result.height).toBe(600)
      expect(result.width).toBe(800)
      expect(await access(`assets/thumbs/fjord-800-600,jpg`, constants.F_OK)).toBe(undefined)
})