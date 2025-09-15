import express from "express";

import fetchFile from "../controller/filepageController.js";
import fetchFileById from "../controller/filebyidController.js";
import deleteFile from "../controller/operator/DeleteFile.js";
import auth from "../connection/auth.js";
import fileUploadController from "../controller/fileuploadController.js";
import fileupload from "../middleware/fileupload.js";
import FileEdit from "../controller/operator/FileEdit.js";
import FetchforEdit from "../controller/operator/FetchFileforEdit.js";
import VerifyData from "../controller/operator/VerifyData.js";
import RejectData from "../controller/operator/RejectData.js";

const router = express.Router();

router.get("/", fetchFile);

router.get("/list", auth, FetchforEdit);

router.get("/:id", fetchFileById);

router.post("/verify/:id", auth, VerifyData);

router.post("/reject/:id", auth, RejectData);

router.post("/upload", auth, fileupload.single('file') ,fileUploadController);

router.put("/edit/:id", auth, fileupload.single('file'), FileEdit);

router.delete("/delete/:id", auth, deleteFile);

export default router;