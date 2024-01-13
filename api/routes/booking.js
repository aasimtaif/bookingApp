import express from "express";
import { getBookings } from "../controllers/booking.js";

const router = express.Router();

router.get("/", getBookings);

export default router