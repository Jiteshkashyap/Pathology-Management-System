import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { errorHandler } from './middleware/errorMiddleware.js';
import helmet from "helmet";
import compression from 'compression';



import connectDB from './config/db.js' 
import redisClient from './config/redis.js'
import { startEmailWorker } from "./workers/emailWorker.js";
import { connectRabbitMQ } from './config/rabbitmq.js'

import doctorRoutes from './routes/doctorRoutes.js'
import authRoutes from './routes/authRoutes.js'
import testRoutes from './routes/testRoutes.js'
import packageRoutes from './routes/packageRoutes.js'
import reportRoutes from "./routes/reportRoutes.js";


dotenv.config()

const app= express()

app.use(helmet())

app.set('trust proxy', 1)
app.use(cors({ origin: "https://pathology-frontend-zx1t.onrender.com",
    credentials: true,}))
app.use (compression())

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use(errorHandler)

app.use('/api/auth', authRoutes);
app.use('/api/doctors', doctorRoutes);
app.use("/api/tests", testRoutes);
app.use("/api/packages", packageRoutes);
app.use("/api/reports", reportRoutes);

const PORT=process.env.PORT ||5002

const startServer = async () => {
  try {
    await connectDB();

    await redisClient.connect();
    console.log("Redis connected");

    await connectRabbitMQ();
    console.log("RabbitMQ connected");

    startEmailWorker();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Startup failed:", error.message);
    process.exit(1);
  }
};

startServer();

