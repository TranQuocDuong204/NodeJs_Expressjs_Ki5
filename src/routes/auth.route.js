import express from "express";
import authController from "../app/controllers/AuthControllers.js";

const router = express.Router();

router.post("/login", authController.login); 
router.post("/register", authController.register);
router.get("/logout", authController.logout); 
router.get("/sign", authController.signup);
router.get('/', authController.loginpage);

export default router;