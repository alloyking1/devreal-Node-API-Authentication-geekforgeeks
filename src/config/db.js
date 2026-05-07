const mongoose = require("mongoose");

const DATABASE_NAME = "devreal-node-auth-db";
const APP_NAME = "devreal-tutorial-nodejs-authentication-geeksforgeeks";

const connectDB = async () => {
  try {
    const mongoUri = `${process.env.MONGO_URI_BASE}/${DATABASE_NAME}?retryWrites=true&w=majority&appName=${APP_NAME}`;

    await mongoose.connect(mongoUri);

    console.log("MongoDB connected");
    console.log(`Database: ${DATABASE_NAME}`);
    console.log(`App Name: ${APP_NAME}`);
  } catch (error) {
    console.error("MongoDB connection failed:");
    console.error(error.message);

    process.exit(1);
  }
};

module.exports = connectDB;