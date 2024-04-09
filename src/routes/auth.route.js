import express from "express";
import authController from "../app/controllers/AuthControllers.js";
import Check from "../app/helpers/Check.js";
import CheckLogin from "../app/helpers/CheckLogin.js";
const router = express.Router();

router.post("/login",Check, authController.login); 
router.post("/register", authController.register);
router.get("/logout", authController.logout); 
router.get("/sign", authController.signup);
router.get('/',  CheckLogin,authController.loginpage);

export default router;