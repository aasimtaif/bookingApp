import React from 'react'
import moment from 'moment';
import "./booking.scss"
function Booking({ data }) {
    console.log(data)
    return (
        <div className="booking-container">
            <h3>
                Bookings
            </h3>
            {data?.map((booking) => (
                <div className="bookings" key={booking.id}>
                    <h4>{booking.hotel}<span>{booking.type}</span></h4>
                    <p>
                        <span>
                            Check In Date
                        </span>
                        {moment(booking.checkIn).format('MMMM Do YYYY')}
                    </p>
                    <p>
                        <span>
                            Check out Date
                        </span>
                        {moment(booking.checkOut).format('MMMM Do YYYY')}

                    </p>
                    <p>
                        <span>
                            Room Title
                        </span>
                        {booking.room}
                    </p>
                    <p>
                        <span>
                            Room Description
                        </span>
                        {booking.desc}
                    </p>
                    <p>
                        <span>
                            Hotel address
                        </span>
                        {booking.address}
                    </p>
                    <p>
                        <span>
                            Hotel city
                        </span>
                        {booking.city}
                    </p>
                    <p>
                        <span>
                            Room number
                        </span>
                        {booking.RoomNumber}
                    </p>
                    <p>
                        <span>
                            Room Price
                        </span>
                        ${booking.total}
                    </p>

                </div>
            ))}
        </div>
    )
}

export default Booking