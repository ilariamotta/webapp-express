import express from "express";
import movieController from "../controller/movieController.js";

const router = express.Router();

// INDEX
router.get("/", movieController.index);

// SHOW
router.get("/:id", movieController.show);


export default router; 