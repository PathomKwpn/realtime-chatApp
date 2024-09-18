import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRoutes from "./routes/AuthRoutes.js";
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
const databaseURL = process.env.DATABASE;

const server = app.listen(port, () => {
  console.log(`Server is running on port: http://localhost:${port}`);
});

app.use(
  cors({
    origin: [process.env.ORIGIN],
    method: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credential: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

mongoose
  .connect(databaseURL)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });
