import express from "express";
const router = express.Router();
import {getAllEvents ,getEventById,getRecentEvents} from "./events.controllers.js"; // Ensure you're importing correctly

router.get('/all', getAllEvents); 
router.get('/recent', getRecentEvents);
router.get('/:id' , getEventById);

export default router;
