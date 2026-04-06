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
import { startAppointmentReminderJob } from "./jobs/appointmentReminderJob.js";

import doctorRoutes from './routes/doctorRoutes.js'
import authRoutes from './routes/authRoutes.js'
import testRoutes from './routes/testRoutes.js'
import packageRoutes from './routes/packageRoutes.js'
import reportRoutes from "./routes/reportRoutes.js";
import appointmentRoutes from './routes/appointmentRoute.js'
import adminRoute from './routes/adminRoutes.js'
import userRoutes from "./routes/userRoutes.js";
import aiRoutes from './routes/aiRoutes.js'
import webhookRoutes from './routes/webhook.js'
import paymentRoutes from './routes/payment.js'


dotenv.config()

const app= express()

app.use(helmet())

app.set('trust proxy', 1)
app.use(cors({
  origin: [
    "https://meditrusty.com",
    "https://www.meditrusty.com"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));


app.use (compression())

app.use("/api/webhook", express.raw({ type: "application/json" }));
app.use("/api/webhook", webhookRoutes);


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())



app.use('/api/auth', authRoutes);
app.use('/api/doctors', doctorRoutes);
app.use("/api/tests", testRoutes);
app.use("/api/packages", packageRoutes);
app.use("/api/reports", reportRoutes);
app.use('/api/appointments',appointmentRoutes)
app.use('/api/admin',adminRoute)
app.use("/api/users", userRoutes);
app.use("/api/health" , aiRoutes);
app.use("/api/payment" ,paymentRoutes)


app.use(errorHandler)

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

    startAppointmentReminderJob();

  } catch (error) {
    console.error("Startup failed:", error.message);
    process.exit(1);
  }
};

startServer();

