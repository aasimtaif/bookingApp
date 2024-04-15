import { prisma } from "../config/prisma.config.js";

export const getBookings = async (req, res, next) => {
    try {
        const bookings = await prisma.booking.findMany({
            select: {
                id: true,
                checkIn: true,
                checkOut: true,
                total: true,
                RoomNumber: {
                    select: {
                        number: true,
                        room: {
                            select: {
                                hotel: {
                                    select: {
                                        name: true,
                                    }
                                }
                            }
                        }
                    },
                },
                user: {
                    select: {
                        userName: true,
                    }
                }
            }
        });
        const bookingDetails = [...bookings]?.map(booking => {
            return {
                id: booking.id,
                checkIn: booking.checkIn.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).replace(',', '-'),
                checkOut: booking.checkOut.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).replace(',', '-'),
                total: booking.total,
                RoomNumber: booking.RoomNumber.number,
                hotel: booking.RoomNumber.room.hotel.name,
                user: booking.user.userName
            }
        })
        res.json(bookingDetails);
    } catch (err) {
        console.log(err)
        next(err);
    }
}

export const getBooking = async (req, res, next) => {
    try {
        const booking = await prisma.booking.findUnique({
            where: {
                id: req.params.id
            },
            select: {
                checkIn: true,
                checkOut: true,
                total: true,
                createdAt: true,
                RoomNumber: {
                    select: {
                        number: true,
                        room: {
                            select: {
                                title: true,
                                desc: true,
                                hotel: {
                                    select: {
                                        name: true,
                                        type: true,
                                        title: true,
                                        address: true,
                                        city: true,
                                    }
                                }
                            }
                        }
                    },
                },
                user: {
                    select: {
                        userName: true,
                        email: true,
                        phone: true,
                        city: true,
                        country: true,
                        img: true,
                        isAdmin: true,
                    }
                }
            }
        });
        const bookingDetails = {

            checkIn: booking.checkIn,
            checkOut: booking.checkOut,
            bookedAt: booking.createdAt,
            total: booking.total,
            RoomNumber: booking.RoomNumber.number,
            room: booking.RoomNumber.room.title,
            roomDesc: booking.RoomNumber.room.desc,
            hotel: booking.RoomNumber.room.hotel.name,
            type: booking.RoomNumber.room.hotel.type,
            title: booking.RoomNumber.room.hotel.title,
            address: booking.RoomNumber.room.hotel.address,
            city: booking.RoomNumber.room.hotel.city,
            user: { ...booking.user }
        }


        res.json(bookingDetails);
    } catch (err) {
        next(err);
    }
}