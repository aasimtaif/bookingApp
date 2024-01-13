import React from 'react'
import './roomPage.scss'
import Room from '../../components/room/Room'
import { useFetch } from '../../hooks/useFetch'
import { useParams } from 'react-router-dom'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
function RoomPage() {
    const { productId } = useParams()
    const { data: { hotel, ...otherDetails }, loading, error } = useFetch(`/rooms/find/${productId}`)
    if (loading || !hotel) return <div>Loading...</div>
    // console.log(productId, hotel, otherDetails)
    return (
        <div className="single">
            <Sidebar />
            <div className="singleContainer">
                <Navbar />
                <div className="singleRoomPage">
                    <div className='container'>
                        <div className="top">
                            <Box sx={{ flexGrow: 1 }}>
                                <Grid container spacing={1}>
                                    {hotel?.photos?.map((photo, index) => {
                                        return (
                                            <Grid key={index} item xs={20 / (hotel?.photos?.length + 1)}>
                                                <div className='images'>
                                                    <img src={photo} />
                                                </div>
                                            </Grid>
                                        )
                                    })}
                                </Grid>
                            </Box>
                        </div>
                        <div className="hotelDetails">
                            <h1>{hotel.name}<span>{hotel.type}</span></h1>
                            <h3>{hotel.title}</h3>
                            <p>{hotel.desc}</p>
                            <p>City - {hotel.city}</p>
                            <p>{hotel.address}</p>
                            <p>{hotel.distance}</p>
                            <p>Price -{hotel.cheapestPrice} $</p>
                        </div>
                    </div>
                    <div className="bottom">
                        <Room data={[{ ...otherDetails }]} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RoomPage