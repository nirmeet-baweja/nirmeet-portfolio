import { Router } from "express";

import { projectsGetAll } from "../controllers/projectController";

const router = Router();

router.get("/all", projectsGetAll);

router.use("/", (_, res) => res.sendStatus(404));

export default router;
