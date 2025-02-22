import express from "express";
import { getAllNews, getNewsById, getRecentNews, getKRecentNews } from "./news.controllers.js"; // Use named imports

const router = express.Router();

// Define routes
router.get("/all", getAllNews);
router.get('/recentnews', getRecentNews);
router.get('/', getKRecentNews); 
router.get('/:id' , getNewsById);

export default router;
