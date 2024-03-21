import express from "express";
import signController from "../app/controllers/SignController.js";

const router = express.Router();


router.use("/", signController.sign);

export default router;
