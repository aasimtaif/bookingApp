import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import { prisma } from "../config/prisma.config.js";

export const createHotel = async (req, res, next) => {
  try {
    const hotel = await prisma.hotel.create({
      data: {
        ...req.body
      }
    });
    res.status(200).json({ message: "Hotel has been created.", hotel });
  } catch (err) {
    next(err);
  }
};
export const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    next(err);
  }
};
export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};
export const getHotels = async (req, res, next) => {
  const { ...conditions } = req.query;
  try {
    const hotel = await prisma.hotel.findMany({
      where: {
        ...conditions
      },
      include: {
        rooms: true,
      },
    });
    res.json(hotel);
  } catch (err) {
    next(err);
  }
};
export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  // console.log(cities)
  try {
    const list = await Promise.all(
      cities.map((city) => {
        console.log(city)
        return prisma.hotel.count({
          where: {
            city,
          },
        });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel", type: "Hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment", type: "Appartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort", type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa", type: "Villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin", type: "Cabin" });

    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};

export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list)
  } catch (err) {
    next(err);
  }
};
