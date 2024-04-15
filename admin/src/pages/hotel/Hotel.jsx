import React, { useState } from 'react'
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useFetch } from "../../hooks/useFetch";
import Box from '@mui/material/Box';
import Room from '../../components/room/Room';
import Grid from '@mui/material/Grid';
import { useParams } from 'react-router-dom';
import { ProgressBar } from 'react-loader-spinner'
import "./hotel.scss";
import { hotelInputs } from '../../formSource';
import { useApiCalls } from '../../hooks/useApiCalls';



function Hotel() {
    const { productId } = useParams()
    const [info, setInfo] = useState();
    const { data, loading, error, reFetch } = useFetch(`hotels/find/${productId}`);
    const [openEdit, setOpenEdit] = useState(false);
    const { updateData } = useApiCalls()
    const handleChange = (e) => {
        if (e.target.type === 'number') {
            setInfo({ ...info, [e.target.id]: parseInt(e.target.value) });
            return
        } else {

            setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            updateData(`/hotels/${productId}`, info)
            setTimeout(() => {
                setOpenEdit(false)
                reFetch()
            }, 1000)
        } catch (err) {
            console.log(err)
        }

    }
    console.log(data.rooms)
    if (loading) {
        return (
            <div className="loader">
                <ProgressBar
                    color="#00BFFF"
                    height={200}
                    width={200}
                    timeout={3000}
                />
            </div>
        );
    }
    console.log(typeof (info?.cheapestPrice))
    return (
        <div className="single">
            <Sidebar />
            <div className="singleContainer">
                <Navbar />
                <div className='container'>
                    <div className="top">
                        <Box sx={{ flexGrow: 1 }}>
                            <Grid container spacing={1}>
                                {data?.photos?.map((photo, index) => {
                                    return (
                                        <Grid key={index} item xs={20 / (data?.photos?.length + 1)}>
                                            <div className='images'>
                                                <img src={photo} />
                                            </div>
                                        </Grid>
                                    )
                                })}
                            </Grid>
                        </Box>
                    </div>
                    {openEdit ?
                        <form onSubmit={handleSubmit}>
                            <div>
                                {hotelInputs.map((input) => (
                                    <label>{input.label}
                                        <input
                                            onChange={handleChange}
                                            type={input.type}
                                            defaultValue={data[input.id]}
                                            placeholder={input.placeholder}
                                            id={input.id}

                                        />
                                    </label>
                                ))}
                            </div>
                            <div className='buttons'>
                                <button className='submit' >Submit</button>
                                <button className='discard' onClick={() => { setOpenEdit(false) }}>Discard</button>
                            </div>
                        </form>
                        :
                        <div className='details'>
                            <div className="editButton" onClick={() => { setOpenEdit(!openEdit) }}>Edit</div>
                            <h1>{data.name}<span>{data.type}</span></h1>
                            <h3>{data.title}</h3>
                            <p>{data.desc}</p>
                            <p>City - {data.city}</p>
                            <p>{data.address}</p>
                            <p>{data.distance}</p>
                            <p>Price -{data.cheapestPrice} $</p>
                        </div>
                    }
                    <div className="room">
                        <Room data={data.rooms} />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Hotel