import express, { Router } from "express";

const router = Router();

router.get("/", (req: express.Request, res: express.Response): void => {
  res.status(200).send(req.originalUrl);
});

export default router;
