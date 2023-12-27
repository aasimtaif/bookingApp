import React from 'react'
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import useFetch from "../../hooks/useFetch";
import Box from '@mui/material/Box';

import Grid from '@mui/material/Grid';

import "./hotel.scss";




function Hotel() {
    const pathname = (window.location.pathname).split("/")
    const { data, loading, error } = useFetch(`http://localhost:8800/api/hotels/find/${pathname[2]}`);
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
                </div>
            </div>
        </div>
    )
}

export default Hotel