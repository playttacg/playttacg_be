import express from "express";
import { getAllNews, getNewsById, getRecentNews } from "./news.controllers.js"; // Use named imports

const router = express.Router();

// Define routes
router.get("/all", getAllNews);
router.get('/recentnews', getRecentNews);
router.get('/:id' , getNewsById);

export default router;
