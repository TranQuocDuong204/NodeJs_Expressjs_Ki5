import express from "express";
import postControllers from "../app/controllers/PostController.js";

const router = express.Router();

router.post('/store', postControllers.store);
router.get('/create', postControllers.create);
router.get('/:id', postControllers.details);
router.get('/', postControllers.index);

export default router;
