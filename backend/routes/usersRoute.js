import express from "express";
import registerHandler from "../controller/registerController.js";
import auth from "../connection/auth.js";
import loginHandler from "../controller/loginController.js";
import DeleteUser from "../controller/admin/DeleteUser.js";
import GetAllUser from "../controller/admin/GetAllUserforAdmin.js";

const router = express.Router();

router.post("/login", loginHandler);

router.get("/", auth, GetAllUser);

router.post("/register", auth, registerHandler);

router.delete("/delete/:id", auth, DeleteUser);

export default router;