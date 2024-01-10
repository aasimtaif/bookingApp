import "./newHotel.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { hotelInputs, roomInputs } from "../../formSource";
import { useFetch } from "../../hooks/useFetch";
import { useApiCalls } from "../../hooks/useApiCalls";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewHotel = () => {
  const [files, setFiles] = useState("");
  const [hotel, setHotel] = useState({});
  const [rooms, setRooms] = useState([]);
  const { postData, err } = useApiCalls()
  const navigate = useNavigate();


  const handleChange = (e) => {
    if (e.target.id === 'city' || e.target.id === 'type') {
      setHotel((prev) => ({ ...prev, [e.target.id]: e.target.value.toLowerCase() }));
    } else {
      setHotel((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    }
  };

  const handleRoomChange = (e) => {
    console.log(e.target.type)
    if (e.target.type === 'number') {
      setRooms({ ...rooms, [e.target.id]: parseInt(e.target.value) });
      return
    }
    setRooms({ ...rooms, [e.target.id]: e.target.value });
  }
  const handleClick = async (e) => {
    e.preventDefault();
    const roomNumbers = rooms?.roomNumbers?.split(",").map((room) => parseInt(room));
    console.log(typeof (roomNumbers[0]))
    rooms.roomNumbers = roomNumbers
    try {
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload");
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/dndmxaxc8/image/upload",
            data
          );

          const { url } = uploadRes.data;
          return url;
        })
      );

      const newhotel = {
        hotelDetails: {
          ...hotel,
          photos: list,
        },
        roomDetails: {
          ...rooms,

        },
      };
      newhotel.hotelDetails.cheapestPrice = parseInt(newhotel.hotelDetails.cheapestPrice)
      console.log(newhotel)
      await postData("/hotels", newhotel);
      navigate("/hotels");
    } catch (err) { console.log(err) }
  };
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Product</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                files
                  ? URL.createObjectURL(files[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={handleClick}>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                  required
                />
              </div>

              {hotelInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                    required
                  />
                </div>
              ))}
              {/* <div className="formInput"> */}
              <label>
                Featured
                <input type="checkbox"
                  defaultChecked={false}
                  onChange={() => setHotel({ ...hotel, featured: !hotel.featured })}
                />
              </label>
              {/* </div> */}

              {roomInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    onChange={handleRoomChange}
                    type={input.type}
                    placeholder={input.placeholder}
                    required
                  />
                </div>
              ))}
              <div className="formInput">
                <label>Rooms</label>
                <textarea
                  id="roomNumbers"
                  onChange={handleRoomChange}
                  placeholder="give comma between room numbers."
                />
              </div>

              <button type="submit" >Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewHotel;
