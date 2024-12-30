import 'express-async-errors';
import express from 'express';
import 'dotenv/config';

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
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Routes
app.get('/', (req, res) => {
  res.json({ msg: 'Welcome' });
});
app.get('/api/v1', (req, res) => {
  res.json({ msg: 'Welcome' });
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticateUser, jobRouter);

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
