import "./newRoom.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import { roomInputs } from "../../formSource";
import { useFetch } from "../../hooks/useFetch";
import { useApiCalls } from "../../hooks/useApiCalls";
import { useNavigate } from "react-router-dom";
import { ColorRing } from 'react-loader-spinner'


const NewRoom = () => {
  const [info, setInfo] = useState({});
  const [hotelId, setHotelId] = useState(undefined);
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const { postData } = useApiCalls()
  const { data, loading, error } = useFetch("/hotels");

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const navigate = useNavigate()
  const handleClick = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    const roomNumber = rooms?.split(",").map((room) => (parseInt(room)));
    info.maxPeople = parseInt(info.maxPeople)
    console.log(info.maxPeople)
    try {
      await postData(`/rooms/${hotelId}`, { ...info, roomNumber });
      setIsLoading(false)
      navigate("/rooms")
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) {
    return (
      <div className="loader">
        <ColorRing
          color="#00BFFF"
          height={300}
          width={300}
          timeout={3000}
        />
      </div>
    );
  }
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Room</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {roomInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                  />
                </div>
              ))}
              <div className="formInput">
                <label>Rooms</label>
                <textarea
                  onChange={(e) => setRooms(e.target.value)}
                  placeholder="give comma between room numbers."
                />
              </div>
              <div className="formInput">
                <label>Choose a hotel</label>
                <select
                  id="hotelId"
                  onChange={(e) => setHotelId(e.target.value)}
                >
                  {loading
                    ? "loading"
                    : data &&
                    data.map((hotel) => (
                      <option key={hotel.id} value={hotel.id}>{hotel.name}--{hotel.city}</option>
                    ))}
                </select>
              </div>
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;
