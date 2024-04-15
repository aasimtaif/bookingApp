import React from 'react'
import { useApiCalls } from '../../hooks/useApiCalls';
import moment from 'moment';
import './room.scss'
function Room({ data }) {
  // const { data, loading, error, reFetch } = useFetch(`hotels/room/${hotelId}`);
  const { deleteData } = useApiCalls()
  console.log(data)

  const handleDelete = async (id) => {
    try {
      deleteData(`/rooms/${id}`)
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className="container">
      {data?.map((info) => (
        <div className="roomdetails" key={info.id}>
          <div className="top">
            <h2>{info.title} </h2>
            <p>{info.desc}</p>
            <p>maxPeople - {info.maxPeople}</p>
          </div>
          <div className="bottom">
            <h3>
              Rooms
            </h3>
            {info?.roomNumber?.map((room, index) => (
              <div className="roomList" key={index}>
                <p>Room number {room?.number}</p>
                {room.unAvailableDates?.length !== 0 ?
                  <div>
                    <p>Un-Available At </p>
                    &nbsp;
                    &nbsp;

                    {room?.unAvailableDates?.map((date, index) => (
                      <>
                      <p key={index}>{moment(date).format("MMM Do YY")}</p>
                      <p>&nbsp;</p>
                      </>
                    ))}
                  </div> : "available"
                }
              </div>
            ))}
          </div>
          <div className="action">
            <button onClick={() => handleDelete(info.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Room