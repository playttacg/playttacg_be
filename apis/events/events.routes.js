import express from "express";
import getAllEvents  from "./events.controllers.js"; // Ensure you're importing correctly
const router = express.Router();

router.get('/all', getAllEvents);  // This will call the getAllEvents controller

export default router;
