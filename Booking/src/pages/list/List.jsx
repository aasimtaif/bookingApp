import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";
import { SearchContext } from "../../context/SearchContext";
import { fi } from "date-fns/locale";
const List = () => {
  const { city, dates: bookingDates, dispatch, options } = useContext(SearchContext);
  const [destination, setDestination] = useState(city);
  const location = useLocation();

  console.log(location.state)
  const [dates, setDates] = useState([{
    startDate: new Date(bookingDates.startDate),
    endDate: new Date(bookingDates.endDate),
    key: 'selection'
  }]);
  const [openDate, setOpenDate] = useState(false);
  const { data, loading, error } = useFetch(
    `/hotels?${location.state?.conditionfield}=${location.state?.fieldValue}`
  );

  const handleClick = () => {
    dispatch({ type: "NEW_SEARCH", payload: { city: destination, dates: dates[0], options } });
  };
  if (!dates) {
    return <h1>loading</h1>
  }
  console.log(dates)
  return (
    <div>
      <Navbar />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input placeholder={destination} type="text" onChange={(e) => { setDestination(e.target.value.toLowerCase()) }} />
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${new Date(dates[0].startDate).toLocaleDateString('en-GB')} to ${new Date(dates[0].endDate).toLocaleDateString('en-GB')

                }`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                />
              )}
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          <div className="listResult">
            {loading ? (
              "loading"
            ) : (
              <>
                {data.length === 0 && <h3>No Result found</h3>}
                {data.map((item) => (
                  <SearchItem item={item} key={item.id} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
