import express from "express";
import "dotenv/config";

// Middleware
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

// App
const port = process.env.PORT || 5000;
const app = express();

// Routes
app.get("/", (req, res) => {
  throw new Error("Error");
  res.send("Welcome");
});

// Handle
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// App running
app.listen(port, () => {
  console.log(`🚀App Running On Port: ${port}`);
});
