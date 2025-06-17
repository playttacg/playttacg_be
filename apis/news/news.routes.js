import express from "express";
import { getAllNews, getNewsById, getRecentNews, getKRecentNews, createNews, updateNews } from "./news.controllers.js"; // Use named imports
import { upload } from '../../config/multerConfig.js';


const router = express.Router();

// Define routes
router.get("/all", getAllNews);
router.get('/recentnews', getRecentNews);
router.get('/', getKRecentNews); 
router.post('/create',upload.single('image'), createNews);
router.post('/update/:id', upload.single('image'), updateNews); // Assuming createNews handles both creation and update
router.get('/:id' , getNewsById);

export default router;
