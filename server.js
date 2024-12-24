import express from "express";
import "dotenv/config";

const port = process.env.PORT || 5000;
const app = express();

// Routes
app.get("/", (req, res) => {
  res.send("Welcome");
});

// App running
app.listen(port, () => {
  console.log(`🚀App Running On Port: ${port}`);
});
