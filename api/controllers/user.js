import { prisma } from "../config/prisma.config.js";

export const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { ...details } = req.body;

  try {
    const user = await prisma.user.update({
      where: {
        id: id
      },
      data: {
        ...details
      },
    });
    user.password = '';
    res.json(user);
  } catch (err) {
    next(err);
  }
}
export const deleteUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await prisma.$transaction([
      prisma.booking.deleteMany({
        where: {
          userId: id, // Delete all bookings associated with the user
        },
      }),
      prisma.user.delete({
        where: {
          id: id, // Delete the user
        },
      }),
    ]);
    res.json({ message: `user of ${id} id is deleted successfully`, result });
  } catch (err) {
    next(err);
  }
}
export const getUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id
      },
      select: {
        password: false,
        id: true,
        email: true,
        phone: true,
        city: true,
        country: true,
        img: true,
        isAdmin: true,
        Booking: {
          select: {
            checkIn: true,
            checkOut: true,
            total: true,
            RoomNumber: {
              select: {
                number: true,
                room: {
                  select: {
                    title: true,
                    hotel: {
                      select: {
                        name: true,
                        type: true,
                        city: true,
                        address: true,
                        title: true,
                        desc: true,
                        rating: true,
                        cheapestPrice: true,
                      }
                    }
                  }
                }
              }
            }
          }
        },
      },
    });
    const userDetails = {
      id: user.id,
      email: user.email,
      phone: user.phone,
      city: user.city,
      country: user.country,
      img: user.img,
      isAdmin: user.isAdmin,
      bookings: [...user.Booking]?.map(booking => {
        return {
          checkIn: booking.checkIn,
          checkOut: booking.checkOut,
          total: booking.total,
          room: booking.RoomNumber.room.title,
          roomDesc: booking.RoomNumber.room.desc,
          RoomNumber: booking.RoomNumber.number,
          hotel: booking.RoomNumber.room.hotel.name,
          type: booking.RoomNumber.room.hotel.type,
          city: booking.RoomNumber.room.hotel.city,
          address: booking.RoomNumber.room.hotel.address,
          title: booking.RoomNumber.room.hotel.title,
          desc: booking.RoomNumber.room.hotel.desc,
          rating: booking.RoomNumber.room.hotel.rating,
          cheapestPrice: booking.RoomNumber.room.hotel.cheapestPrice,
        }
      })
    }
    res.json(userDetails);
  } catch (err) {
    next(err);
  }
}
export const getUsers = async (req, res, next) => {
  try {
    const user = await prisma.user.findMany({
      select: {
        password: false,
        id: true,
        email: true,
        phone: true,
        city: true,
        country: true,
        img: true,
        isAdmin: true,
        Booking: {
          select: {
            checkIn: true,
            checkOut: true,
            total: true,
            RoomNumber: {
              select: {
                number: true,
                room: {
                  select: {
                    title: true,
                    hotel: {
                      select: {
                        name: true,
                        type: true,
                        city: true,
                        address: true,
                        title: true,
                        desc: true,
                        rating: true,
                        cheapestPrice: true,
                      }
                    }
                  }
                }
              }
            }
          }
        },
      },
    });
    const userDetails = [...user]?.map(user => {
      return {
        id: user.id,
        email: user.email,
        phone: user.phone,
        city: user.city,
        country: user.country,
        img: user.img,
        isAdmin: user.isAdmin,
        bookings: [...user.Booking]?.map(booking => {
          return {
            checkIn: booking.checkIn,
            checkOut: booking.checkOut,
            total: booking.total,
            room: booking.RoomNumber.room.title,
            roomDesc: booking.RoomNumber.room.desc,
            RoomNumber: booking.RoomNumber.number,
            hotel: booking.RoomNumber.room.hotel.name,
            type: booking.RoomNumber.room.hotel.type,
            city: booking.RoomNumber.room.hotel.city,
            address: booking.RoomNumber.room.hotel.address,
            title: booking.RoomNumber.room.hotel.title,
            desc: booking.RoomNumber.room.hotel.desc,
            rating: booking.RoomNumber.room.hotel.rating,
            cheapestPrice: booking.RoomNumber.room.hotel.cheapestPrice,
          }
        })
      }
    })
    res.json(userDetails);
  } catch (err) {
    next(err);
  }
}