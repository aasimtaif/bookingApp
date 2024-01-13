import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { prisma } from "./config/prisma.config.js";


const app = express();
dotenv.config()



const connect = async () => {
  try {
    await prisma.$connect();
    console.log("Connected to database.");
  } catch (error) {
    console.log("Error connecting to database.");
  }
};



//middlewares
app.use(cors({ credentials: 'true' }))
app.use(cookieParser())
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});
app.get("/", (req, res) => {
  res.send("Welcome to the backend of the hotel booking app.");
})
app.listen(6800, () => {
  connect();
  console.log("Connected to backend.at port 6800");
});
