import express from "express";
import {getAllEvents ,getEventById,getRecentEvents} from "./events.controllers.js"; // Ensure you're importing correctly
const router = express.Router();

router.get('/all', getAllEvents); 
router.get('/recent', getRecentEvents);
router.get('/:id' , getEventById);

export default router;
