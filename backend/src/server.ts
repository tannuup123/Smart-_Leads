import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import leadRoutes from "./routes/leadRoutes";
import dashboardRoutes from "./routes/dashboardRoutes";
import analyticsRoutes from "./routes/analyticsRoutes";
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: (origin, callback) => callback(null, true), // Allow all origins for seamless deployment
    credentials: true,
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/analytics", analyticsRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Smart Leads API running 🚀");
});

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
