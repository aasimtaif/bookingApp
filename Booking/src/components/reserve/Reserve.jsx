import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import "./reserve.css";

import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useApiCalls } from "../../hooks/useApiCalls";
const Reserve = ({ setOpen, data, total }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { dates, dispatch } = useContext(SearchContext);
  const { user } = useContext(AuthContext);
  const { updateData } = useApiCalls()


  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);

    }

    return dates;
  };

  const alldates = getDatesInRange(dates.startDate, dates.endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unAvailableDates?.some((date) =>
      alldates.includes(new Date(date).getTime())
    );

    return !isFound;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };

  const navigate = useNavigate();

  const handleClick = async () => {
    // console.log(selectedRooms.length)
    console.log(new Date(alldates[0]).toISOString())
    try {
      const res = await updateData(`/rooms/availability`, {
        roomIds: selectedRooms,
        dates: alldates.map((date) => new Date(date).toISOString()),
        userId: user.id,
        total: total * selectedRooms.length
      });
      setTimeout(() => {
        dispatch({ type: "RESET_SEARCH" })
        setOpen(false);
        navigate("/");
      }, 1000)


    } catch (err) {
      console.log(err)
    }
  };

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms:</span>
        {data?.map((item) => (
          <div className="rItem" key={item.id}>
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
                Max people: <b>{item.maxPeople}</b>
              </div>
              <div className="rPrice">{item.price}</div>
            </div>
            <div className="rSelectRooms">
              {item.roomNumber?.map((roomNumber, index) => (
                <div className="room" key={roomNumber.id}>
                  <label>{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    value={roomNumber.id}
                    onChange={handleSelect}
                    disabled={!isAvailable(roomNumber)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button onClick={handleClick} className="rButton">
          Reserve Now!
        </button>
      </div>
    </div>
  );
};

export default Reserve;
