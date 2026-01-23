import express from "express";
import movieController from "../controller/movieController.js";

const router = express.Router();


router.get("/", movieController.index);
router.get("/:slug", movieController.show);
router.post("/:id/reviews", movieController.storeReview);
router.post("/", upload.single("image"), movieController.store);



export default router; 