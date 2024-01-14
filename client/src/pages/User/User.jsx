import React from 'react'
import Navbar from "../../components/navbar/Navbar";
import useFetch from '../../hooks/useFetch';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import './user.css'
function User() {
    const { id } = useParams();
    const { data, loading, error } = useFetch(`users/find/${id}`)
    return (
        <div>
            <Navbar />
            <div className="container">
                <div className="userDetails">
                    <div className="left">
                        <img src={data.img} alt='profile' />
                    </div>
                    <div className="right">
                        <p>User Name:<span>{data.userName}</span></p>
                        <p>Phone:<span>{data.phone}</span></p>
                        <p>Email:<span>{data.email}</span></p>
                        <p>City:<span>{data.city}</span></p>
                        <p>Country:<span>{data.country}</span></p>
                    </div>
                </div>
                <div className="bookings">
                    <h3>
                        Booking History
                    </h3>
                    <div className="bookingList">
                        {data.bookings?.map((booking) => (
                            <div className="booking" key={booking.id}>
                                <h4>{booking.hotel}</h4>
                                <p>
                                    Check In Date
                                    <span>
                                        {moment(booking.checkIn).format('MMMM Do YYYY')}
                                    </span>
                                </p>
                                <p>
                                    Check out Date
                                    <span>
                                        {moment(booking.checkOut).format('MMMM Do YYYY')}
                                    </span>

                                </p>
                                <p>
                                    Booked At
                                    <span>
                                        {moment(booking.bookedAt).format('MMMM Do YYYY')}
                                    </span>
                                </p>
                                <p>
                                    Room Title
                                    <span>
                                        {booking.room}
                                    </span>
                                </p>
                                <p>
                                    Room Description
                                    <span>
                                        {booking.desc}
                                    </span>
                                </p>
                                <p>
                                    Hotel address
                                    <span>
                                        {booking.address}
                                    </span>
                                </p>
                                <p>
                                    Hotel city
                                    <span>
                                        {booking.city}
                                    </span>
                                </p>
                                <p>
                                    Room number
                                    <span>
                                        {booking.RoomNumber}
                                    </span>
                                </p>
                                <p>
                                    Room Price
                                    <span>
                                        ${booking.total}
                                    </span>
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default User