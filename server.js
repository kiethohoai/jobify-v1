import express from "express";
import "dotenv/config";

// Middleware
import notFoundMiddleware from "./middleware/not-found.js";

// App
const port = process.env.PORT || 5000;
const app = express();

// Routes
app.get("/", (req, res) => {
  res.send("Welcome");
});
app.use("*", notFoundMiddleware);

// App running
app.listen(port, () => {
  console.log(`🚀App Running On Port: ${port}`);
});
