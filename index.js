import express from "express";
import dotenv from "dotenv";
import newsRoutes from "./apis/news/news.routes.js";
import eventRoutes from "./apis/events/events.routes.js";
import playerRoutes from "./apis/players/players.routes.js";
import connectMongoDB from "./config/db.connection.js";
import cors from "cors";

// Load environment variables
dotenv.config();

// Ensure required environment variables are available
if (!process.env.PORT) {
  console.error("PORT is not defined in the environment variables");
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT;

// Connect to MongoDB
connectMongoDB()


// Middleware for parsing JSON request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Add if expecting form data
app.use(cors()); // Enable CORS for all routes

// Route for the home page
app.get("/", (req, res) => {
  res.status(200).send("Hello TT");
});

// Importing Routes 
app.use("/api/news", newsRoutes); // Ensure routes are exported correctly
app.use("/api/events" , eventRoutes);
app.use("/api/players" , playerRoutes);

// Catch-all route handler for non-existent routes
app.all("*", (req, res) => {
  res.status(404).json({ message: "Route does not exist" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
