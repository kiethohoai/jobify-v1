import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Loggers
import morgan from 'morgan';

// Database & Authenticate User
import connectDB from './db/connect.js';

// Routers
import authRouter from './routes/authRoutes.js';
import jobRouter from './routes/jobRoutes.js';

// Middleware
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';
import authenticateUser from './middleware/auth.js';

// App
const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());

// only when ready to deploy
app.use(express.static(path.resolve(__dirname, './client/dist')));

app.use(cors());
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticateUser, jobRouter);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/dist', 'index.html'));
});

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
