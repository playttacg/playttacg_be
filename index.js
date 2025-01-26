// server.js (or index.js)
import express from "express";
import dotenv from "dotenv";
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
connectMongoDB();

// Middleware for parsing JSON request bodies
app.use(express.json());

// Route for the home page
app.get("/", (req, res) => {
  res.status(200).send("Hello");
});

// Catch-all route handler for non-existent routes
app.all("*", (req, res) => {
  res.status(404).send("Route does not exist");
});

// Start the server
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
