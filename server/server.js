import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

// DATABASE CONNECT
connectDB();

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Job Portal Backend Running 🚀");
});

// API ROUTES
app.use("/api/auth", authRoutes);

// 404 HANDLER
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// SERVER
const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});