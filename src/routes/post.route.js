import express from "express";
import postControllers from "../app/controllers/PostController.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: "src/public/uploads",
  filename: (req, file, cb) => {
    cb(null, file.filename + "_" + Date.now() + "_" + file.originalname);
  },
});
var uploadMiddleware = multer({ storage }).single("avatar");
const router = express.Router();

router.post("/update/:id", uploadMiddleware, postControllers.updates);
router.get('/edit/:id', postControllers.edit);
router.post("/delete", postControllers.delete);
router.post("/store", uploadMiddleware, postControllers.store);
router.get("/create", postControllers.create);
router.get("/:id", postControllers.details);
router.get("/", postControllers.index);

export default router;
