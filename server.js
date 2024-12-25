import express from 'express';
import 'dotenv/config';

// Database & Authenticate User
import connectDB from './db/connect.js';

// Routers
import authRouter from './routes/authRouttes.js';

// Middleware
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';

// App
const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Welcome');
});

app.use('/api/v1/auth', authRouter);

// Handle
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// Init App
const start = async () => {
  try {
    // Connect DB
    await connectDB(process.env.MONGO_URL);
    console.log(`🚀Database Connected`);

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
