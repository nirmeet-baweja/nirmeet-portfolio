import { Router } from "express";

import { predictEmotion } from "../controllers/emotionPredictorController";

const router = Router();

router.get("/predict", predictEmotion);

router.use("/", (_, res) => res.sendStatus(404));

export default router;
