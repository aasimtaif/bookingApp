import express from "express";
import {
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoom,
  updateRoomAvailability,
} from "../controllers/room.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();
//CREATE
router.post("/:hotelId",createRoom);

//UPDATE
router.put("/availability", updateRoomAvailability);
router.put("/:id", verifyAdmin, updateRoom);
//DELETE
router.delete("/:id", verifyAdmin, deleteRoom);
//GET

router.get("/find/:id", getRoom);
//GET ALL

router.get("/", getRooms);

export default router;
