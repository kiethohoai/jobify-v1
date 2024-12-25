import express from "express";
import "dotenv/config";

// Database
import connectDB from "./db/connect.js";

// Middleware
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

// App
const port = process.env.PORT || 5000;
const app = express();

// Routes
app.get("/", (req, res) => {
  res.send("Welcome");
});

// Handle
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    // Connect DB
    await connectDB(process.env.MONGO_URL);
    console.log(`🚀Database Connected Successfully`);

    // App running
    app.listen(port, () => {
      console.log(`🚀App Running On Port: ${port}`);
    });
  } catch (error) {
    console.log(`🚀Error:`, error);
  }
};

// Init App Run
start();
