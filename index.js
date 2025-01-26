import express from "express";
const app = express();

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
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
