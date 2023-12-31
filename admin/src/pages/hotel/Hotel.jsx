import React from 'react'
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import {useFetch }from "../../hooks/useFetch";
import Box from '@mui/material/Box';
import Room from '../../components/room/Room';
import Grid from '@mui/material/Grid';
import { useParams } from 'react-router-dom';
import "./hotel.scss";




function Hotel() {
    const { productId } = useParams()
    const { data, loading, error } = useFetch(`hotels/find/${productId}`);
    if (loading) {
        return <div>Loading...</div>
    }
    console.log(data.name)
    return (
        <div className="single">
            <Sidebar />
            <div className="singleContainer">
                <Navbar />
                <div className='container'>
                    <div className="top">
                        <Box sx={{ flexGrow: 1 }}>
                            <Grid container spacing={1}>
                                {data?.photos?.map((photo) => {
                                    return (
                                        <Grid item xs={12 / (data?.photos?.length + 1)}>
                                            <div className='images'>
                                                <img src={photo} />
                                            </div>
                                        </Grid>
                                    )
                                })}
                            </Grid>
                        </Box>
                    </div>
                    <div className='details'>
                        <h1>{data.name}<span>{data.type}</span></h1>
                        <h3>{data.title}</h3>
                        <p>{data.desc}</p>
                        <p>City - {data.city}</p>
                        <p>{data.address}</p>
                        <p>{data.distance}</p>
                        <p>Price -{data.cheapestPrice} $</p>
                    </div>
                    <div className="room">
                        <Room hotelId={productId} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hotel