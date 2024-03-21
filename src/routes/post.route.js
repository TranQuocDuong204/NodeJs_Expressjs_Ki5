import express from "express";
import postController from "../app/controllers/PostController.js";

const router = express.Router();


router.use("/:id", postController.detail);
router.use("/", postController.post);

export default router;
