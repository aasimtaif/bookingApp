import React from 'react'
import { useFetch } from '../../hooks/useFetch'
import { useApiCalls } from '../../hooks/useApiCalls';
import moment from 'moment';
import './room.scss'
function Room({ hotelId }) {
  const { data, loading, error, reFetch } = useFetch(`hotels/room/${hotelId}`);
  const { deleteData } = useApiCalls()
  console.log(data)
  if (loading || error) {
    return <>laoding</>
  }
  const handleDelete = async (id) => {
    console.log(id, hotelId)
    try {
      deleteData(`/rooms/${id}/${hotelId}`)
      reFetch(`hotels/room/${hotelId}`)
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className="container">
      {data?.map((info) => (
        <div className="roomdetails" key={info?._id}>
          <div className="top">
            <h2>{info?.title}</h2>
            <p>{info?.desc}</p>
            <p>maxPeople - {info?.maxPeople}</p>
            <p>cheapest Price - {info?.price} $ </p>
          </div>
          <div className="bottom">
            <h3>
              Rooms
            </h3>
            {info?.roomNumbers.map((room, index) => (
              <div className="roomList" key={index}>
                <p>Room number {room?.number}</p>
                {room?.unavailableDates?.length !== 0
                  && <div>
                    <p>Unavailable Dates </p>
                    {room?.unavailableDates?.map((date, index) => (
                      <p key={index}>{moment(date).format("MMM Do YY")}</p>
                    ))}
                  </div>
                }
              </div>
            ))}
          </div>
          <div className="action">
            <button onClick={() => handleDelete(info._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Room