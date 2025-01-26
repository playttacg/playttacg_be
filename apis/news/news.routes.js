import express from "express";
import getAllNews from "./news.controllers.js"; // Ensure correct file path and export

const router = express.Router();

// Define routes
router.get("/all", async (req, res) => {
  try {
    const news = await getAllNews(); // Call the controller function
    res.status(200).json({ success: true, data: news }); // Send response
  } catch (error) {
    next(error); // Pass the error to the error-handling middleware
  }
});

export default router;
