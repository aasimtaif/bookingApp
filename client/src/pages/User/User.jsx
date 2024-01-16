import React, { useState, useEffect } from 'react'
import Navbar from "../../components/navbar/Navbar";
import useFetch from '../../hooks/useFetch';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import Modal from '../../components/UpdateModal/Model';
import './user.css'
function User() {
    const { id } = useParams();
    const { data: { bookings, ...user }, loading, error, reFetch } = useFetch(`users/find/${id}`)
    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
        reFetch(`users/find/${id}`)
    }, [ showModal]);
    return (
        <div>
            <Navbar />
            <div className="container" style={showModal ? { opacity: 0.1 } : { opacity: 1 }}>
                <div className="userDetails">
                    <div className="left">
                        <img src={user.img} alt='profile' />
                    </div>
                    <div className="right">
                        <p>User Name:<span>{user.userName}</span></p>
                        <p>Phone:<span>{user.phone}</span></p>
                        <p>Email:<span>{user.email}</span></p>
                        <p>City:<span>{user.city}</span></p>
                        <p>Country:<span>{user.country}</span></p>
                        <button className="update-button" onClick={() => { setShowModal(!showModal) }}>Update Profile</button>
                    </div>
                </div>
                <div className="bookings">
                    <h3>
                        Booking History
                    </h3>
                    <div className="bookingList">
                        {bookings?.map((booking) => (
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

            {showModal &&
                <div className='modal'>
                    <div className="modalcontainer">
                        <Modal user={user} setShowModal={setShowModal} />
                        {/* <button className="closeButton">X</button> */}
                    </div>
                </div>
            }
        </div>
    )
}

export default User