import express from "express";
import getAllNews from "./news.controllers.js"; // Ensure correct file path and export

const router = express.Router();

// Define routes
router.get("/all", getAllNews)

export default router;
