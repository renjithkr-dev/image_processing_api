import express from "express";

import APIV1Router from "./v1/index";

const router = express.Router();

router.use("/v1", APIV1Router);
router.get("/", (req: express.Request, res: express.Response): void => {
  res.status(200).send(req.originalUrl);
});

export default router;
