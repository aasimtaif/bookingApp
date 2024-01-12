import { prisma } from "../config/prisma.config.js";

export const createHotel = async (req, res, next) => {
  const { hotelDetails, roomDetails: { roomNumbers, ...otherRoomDetails } } = req.body;
  try {
    const hotel = await prisma.hotel.create({
      data: {
        ...hotelDetails,
        rooms: {
          create: {
            ...otherRoomDetails,
            roomNumber: {
              create: roomNumbers.map((room) => ({
                number: room
              }))
            }
          }
        }
      }
    })

    res.status(200).json({ message: "Hotel has been created.", hotel });
  } catch (err) {
    console.log(err)
    next(err);
  }
};
export const updateHotel = async (req, res, next) => {
  const { id } = req.params;
  const { ...details } = req.body;
  try {
    const hotel = await prisma.hotel.update({
      where: {
        id
      },
      data: {
        ...details
      }
    });

    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};
export const deleteHotel = async (req, res, next) => {
  const { id } = req.params;
  try {
    // Fetch related room IDs
    const roomIds = await prisma.rooms.findMany({
      where: {
        hotelId:
          id

      },
      select: {
        id: true,
      },
    });

    // Extract room IDs from the result
    const roomIdsToDelete = roomIds.map((room) => room.id);
    console.log(roomIdsToDelete)
    // Use Prisma transaction to ensure atomicity
    await prisma.$transaction([
      // Delete bookings associated with room numbers associated with rooms in the hotel
      prisma.booking.deleteMany({
        where: {
          RoomNumber: {
            roomId: {
              in: roomIdsToDelete,
            },
          },
        },
      }),
      // Delete room numbers associated with rooms in the hotel
      prisma.roomNumber.deleteMany({
        where: {
          roomId: {
            in: roomIdsToDelete,
          },
        },
      }),
      // Delete rooms associated with the hotel
      prisma.rooms.deleteMany({
        where: {
          hotelId: id,
        },
      }),

      prisma.hotel.deleteMany({
        where: {
          id: id,
        },
      }),
    ]);


    res.status(200).json(`Hotel with ID ${id} and its associated data have been deleted.`);
  } catch (err) {
    next(err);
  }
};
export const getHotel = async (req, res, next) => {
  const { id } = req.params;
  try {
    const hotel = await prisma.hotel.findUnique({
      where: {
        id: id
      },
      include: {
        rooms: {
          select: {
            title: true,
            id: true,
            desc: true,
            maxPeople: true,
            roomNumber: {
              select: {
                id: true,
                number: true,
                unAvailableDates: true,
              }
            }
          }
        }
      },
    });

    res.status(200).json(hotel);
  } catch (err) {
    console.log(err)
    next(err);
  }
};
export const getHotels = async (req, res, next) => {
  const { ...conditions } = req.query;
  if (conditions.featured) conditions.featured = true

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
    console.log(err.message)
    next(err);
  }
};
export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  // console.log(cities)
  try {
    const list = await Promise.all(
      cities.map((city) => {
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
    const hotelCount = await prisma.hotel.count({
      where: {
        type: "hotel",
      },
    });
    const apartmentCount = await prisma.hotel.count({
      where: {
        type: "appartment",
      },
    });
    const resortCount = await prisma.hotel.count({
      where: {
        type: "resort",
      },
    });



    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },

    ]);
  } catch (err) {
    next(err);
  }
};

export const getHotelRooms = async (req, res, next) => {
  const { id } = req.params;

  try {
    const list = await prisma.rooms.findMany({
      where: {
        hotelId: id,
      },
      include: {
        roomNumber: {
          select: {
            number: true,
            unAvailableDates: true,
          }
        }
      }
    })
    res.status(200).json(list)
  } catch (err) {
    next(err);
  }
};
