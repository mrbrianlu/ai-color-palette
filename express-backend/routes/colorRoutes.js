import express from "express";
import { fetchColors } from "../controllers/colorController.js";

const router = express.Router();

router.route("/").post(fetchColors);

export default router;
