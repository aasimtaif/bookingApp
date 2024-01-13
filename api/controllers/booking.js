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
        next(err);
    }
} 