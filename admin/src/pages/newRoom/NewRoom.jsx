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
  const { data, loading, error } = useFetch("/hotels");
  const [info, setInfo] = useState({});
  const [hotelId, setHotelId] = useState(undefined);
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const { postData } = useApiCalls()

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const navigate = useNavigate()
  const handleClick = async (e) => {
    e.preventDefault();
    if (!hotelId) {
      alert("Please select a hotel")
      return
    }
    // setIsLoading(true)
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
  console.log(data)

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
            <form onSubmit={handleClick}>
              {roomInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                    required
                  />
                </div>
              ))}
              <div className="formInput">
                <label>Rooms</label>
                <textarea
                  onChange={(e) => setRooms(e.target.value)}
                  placeholder="give comma between room numbers."
                  required
                />
              </div>
              <div className="formInput">
                <label>Choose a hotel</label>
                <select
                  id="hotelId"
                  onChange={(e) => setHotelId(e.target.value)}
                  required
                >
                  <option value="">Select a hotel</option>
                  {loading
                    ? "loading"
                    : data &&
                    data.map((hotel) => (
                      <option key={hotel.id} value={hotel.id}>{hotel.name}--{hotel.city}</option>
                    ))}
                </select>
              </div>
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;
