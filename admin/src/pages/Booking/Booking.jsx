import React from 'react'
import BookingComponent from '../../components/Booking/Booking'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import User from '../../components/user/User'
import { useFetch } from '../../hooks/useFetch'
import { useParams } from 'react-router-dom'
import { ProgressBar } from 'react-loader-spinner'

import "./booking.scss"
function Booking() {
    const { productId } = useParams()
    const { data: { user, ...bookingDetails }, loading, error } = useFetch(`bookings/find/${productId}`);
    if (loading) {
        return (
            <div className="loader">
                <ProgressBar
                    color="#00BFFF"
                    height={200}
                    width={200}
                    timeout={3000}
                />
            </div>)
    }
    return (
        <div className="home">
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <div className="detailsSection">
                    <div className="bookingSection">
                        <h3>Booking Details</h3>
                        <BookingComponent booking={bookingDetails} />
                    </div>
                    {user &&
                        <div className="userSection">
                            <h3>User Details</h3>
                            <User data={user} />
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Booking