import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

import { fileURLToPath } from "url";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import candidateRoutes from "./routes/candidateRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import recruiterRoutes from "./routes/recruiterRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import savedJobRoutes from "./routes/savedJobRoutes.js";

dotenv.config();

const app = express();

// ======================
// FIX __dirname
// ======================

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

// ======================
// DATABASE CONNECT
// ======================

connectDB();

// ======================
// MIDDLEWARES
// ======================

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());

// ======================
// STATIC FOLDER
// ======================

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

// ======================
// TEST ROUTE
// ======================

app.get("/", (req, res) => {
  res.send("Job Portal Backend Running 🚀");
});

// ======================
// ROUTES
// ======================

app.use("/api/auth", authRoutes);
app.use("/api/candidate", candidateRoutes);
app.use("/api/jobs", jobRoutes );
app.use("/api/application", applicationRoutes);
app.use("/api/recruiter", recruiterRoutes);
app.use("/api/notifications",notificationRoutes);
app.use("/api/user",userRoutes);
app.use("/api/companies",companyRoutes);
app.use("/api/saved", savedJobRoutes);

// ======================
// 404 HANDLER
// ======================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// ======================
// SERVER
// ======================

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});