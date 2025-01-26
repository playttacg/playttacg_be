import express from "express";
import dotenv from "dotenv";
import newsRoutes from "./apis/news/news.routes.js"; // Fixed import naming
import connectMongoDB from "./config/db.connection.js";

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
  .then(() => {
    console.log("Connected to MongoDB successfully");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit the process if DB connection fails
  });

// Middleware for parsing JSON request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Add if expecting form data

// Route for the home page
app.get("/", (req, res) => {
  res.status(200).send("Hello");
});

// Importing Routes
app.use("/api/news", newsRoutes); // Ensure routes are exported correctly

// Catch-all route handler for non-existent routes
app.all("*", (req, res) => {
  res.status(404).json({ message: "Route does not exist" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
