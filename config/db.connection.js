// config/db.connection.js
import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    if (!process.env.DB_URI) {
      throw new Error("DB_URI is not defined in the environment variables");
    }

    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.DB_URI);
    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message || error);
    process.exit(1); // Exit process if the database connection fails
  }
};

export default connectMongoDB;
