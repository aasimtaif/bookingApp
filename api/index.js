import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import bookingRouter from "./routes/booking.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import fetch from "node-fetch"
import { prisma } from "./config/prisma.config.js";


const app = express();
dotenv.config()



const connect = async () => {
  try {
    await prisma.$connect();
    console.log("Connected to mongodb database.");
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
app.use("/api/bookings", bookingRouter);

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

setInterval(() => {
  fetch('https://https-booking-app-server.onrender.com') // Replace with your actual Render app URL where your Express server is hosted
    .then(() => console.log('Ping successful'))
    .catch((err) => console.error('Ping failed:', err));
}, 7 * 60 * 1000); 

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});
app.get("/", (req, res) => {
  res.send("Welcome to the backend of the hotel booking app.");
})
app.listen(6800, () => {
  connect();
  console.log("Connected to backend.at port 6800");
});
