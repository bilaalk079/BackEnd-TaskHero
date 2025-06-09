import express from "express";
import dotenv from "dotenv";
import corsOption from "./config/corsOption.js";
import cors from "cors";
import { connectDB } from "./config/connectDB.js";
import { json } from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import router from "./routes/task.route.js";
import userRouter from "./routes/auth.route.js";

dotenv.config();
const app = express();
app.set('trust proxy', 1);

// middleware
app.use(cors(corsOption));
app.use(cookieParser());
app.use(json());

app.use("/api/tasks", router);
app.use("/api/auth", userRouter);
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server Started at http://localhost:${PORT}`);
});
