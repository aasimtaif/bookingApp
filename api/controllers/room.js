
import { prisma } from "../config/prisma.config.js";

export const createRoom = async (req, res, next) => {
  try {
    const { hotelId: hotel } = req.params;
    const { roomNumber, ...otherDetails } = req.body;
    const room = await prisma.rooms.create({
      data: {
        ...otherDetails,
        hotel: { connect: { id: hotel } },
        roomNumber: {
          create: roomNumber.map((room) => ({
            number: room
          }))
        }
      }
    });
    res.status(200).json(room);
  } catch (err) {
    console.log(err)
    next(err);
  }
};

export const updateRoom = async (req, res, next) => {
  const { id } = req.params;
  const { ...details } = req.body;
  try {
    const room = await prisma.rooms.update({
      where: {
        id
      },
      data: {
        ...details
      }
    });
    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};
export const updateRoomAvailability = async (req, res) => {
  const { roomIds, dates, userId, total } = req.body;
  try {

    const bookingPromises = roomIds.map(roomId => {
      return prisma.booking.create({
        data: {
          checkIn: dates[0],
          checkOut: dates[dates.length - 1],
          total,
          RoomNumber: {
            connect: {
              id: roomId
            }
          },
          user: {
            connect: {
              id: userId
            }
          },
        }
      });
    });

    const updatedRoomNumbers = await prisma.$transaction([
      ...bookingPromises,

      prisma.roomNumber.updateMany({
        where: {
          id: { in: roomIds }
        },
        data: {
          unAvailableDates: {
            push: dates
          }
        }
      })
    ]);
    res.status(200).json({ updatedRoomNumbers });
  } catch (err) {
    console.log(err)
    next(err);
  }
};
export const deleteRoom = async (req, res, next) => {
  const { id } = req.params;
  try {
    const room = await prisma.$transaction([
      // Delete bookings associated with the room number
      prisma.booking.deleteMany({
        where: {
          RoomNumber: {
            roomId: id,
          },
        },
      }),
      // Delete room numbers associated with the room
      prisma.roomNumber.deleteMany({
        where: {
          roomId: id,
        },
      }),
      // Delete the room itself
      prisma.rooms.delete({
        where: {
          id: id,
        },
      }),
    ]);
    res.status(200).json({ message: `Room with ${id} has been deleted.`, room });
  } catch (err) {
    next(err);
  }
};
export const getRoom = async (req, res, next) => {
  const { id } = req.params;
  try {
    const room = await prisma.rooms.findUnique({
      where: {
        id: id
      },
      include: {
        hotel: {
          select: {
            name: true,
            type: true,
            city: true,
            address: true,
            title: true,
            cheapestPrice: true,
            desc: true,
            photos: true,
            featured: true,
          }
        },
        roomNumber: {
          select: {
            number: true,
            unAvailableDates: true,
          }
        }
      }
    });
    res.status(200).json(room);
  } catch (err) {
    console.log(err)
    next(err);
  }
};
export const getRooms = async (req, res, next) => {
  try {
    const rooms = await prisma.rooms.findMany({
      include: {
        hotel: {
          select: {
            name: true,
            type: true,
            city: true,
            address: true,
            title: true,
            cheapestPrice: true,
            desc: true,
            photos: true,
            featured: true,
          }
        },
        roomNumber: {
          select: {
            number: true,
          }
        }
      }
    });
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};
