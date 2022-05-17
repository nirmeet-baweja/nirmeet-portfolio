import { Router } from "express";

import { homeGet } from "../controllers/homeController";

const router = Router();

router.get("/", homeGet);

router.use("/", (_, res) => res.sendStatus(404));

export default router;
