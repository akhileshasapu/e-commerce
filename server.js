import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRouter from './routes/userRouter.js';
import categoryRouter from './routes/categoryRouter.js';
import productRouter from './routes/productRouter.js';
import cookieParser from 'cookie-parser';

// Load environment variables from .env file
dotenv.config();

// Debugging: Log environment variables to verify they are loaded correctly
console.log('MONGODB_URL:', process.env.MONGODB_URL);
console.log('PORT:', process.env.PORT);

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Routes
app.use('/user', userRouter);
app.use('/app', categoryRouter);
app.use('/products', productRouter);

// Connect to MongoDB
const URI = process.env.MONGODB_URL;

// Correct usage of console.log()
console.log('URI:', URI); // Corrected

if (!URI) {
  console.error('MONGODB_URL is not defined. Please check your .env file.');
  process.exit(1); // Exit the application
}

mongoose
  .connect(URI, {
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB:', err.message);
  });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is started at ${PORT}`);
});
