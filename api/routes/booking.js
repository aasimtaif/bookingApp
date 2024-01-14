import express from "express";
import { getBookings, getBooking } from "../controllers/booking.js";

const router = express.Router();

router.get("/", getBookings);
router.get("/:id", getBooking)
export default router