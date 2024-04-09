import express from "express";
import UserAdmin from "../app/controllers/UserAdmin.js";

const router = express.Router();
router.post("/update/:id", UserAdmin.updates);
router.get("/edit/:id", UserAdmin.edit);
router.post("/delete", UserAdmin.delete);
router.get("/", UserAdmin.index);

export default router;
