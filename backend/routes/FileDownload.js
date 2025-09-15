import express from "express";

import DownloadController from "../controller/DownloadController.js";

const router = express.Router();

router.get("/:id", DownloadController)

export default router;