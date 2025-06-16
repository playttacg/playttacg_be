import mongoose from "mongoose";

const connect_to_db = async () => {    
  if (!process.env.DB_URI) {
    throw new Error("DB_URI is not defined in the environment variables");
  }

  try {
    const conn = await mongoose.connect(process.env.DB_URI);
    console.log(`DB is connected on: ${process.env.DB_URI}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); 
  }
};

export default connect_to_db;
