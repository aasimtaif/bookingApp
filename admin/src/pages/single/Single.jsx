import "./single.scss";
import { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useFetch } from "../../hooks/useFetch";
import { DNA } from 'react-loader-spinner'
import Booking from "../../components/Booking/Booking"
import User from "../../components/user/User";
const Single = () => {
  const pathname = (window.location.pathname).split("/")
  const { data, loading, error } = useFetch(`users/find/${pathname[2]}`);
  const [openEdit, setOpenEdit] = useState(false);

  if (loading) {
    return (
      <div className="loader">
        <DNA
          visible={true}
          height="80"
          width="80"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
      </div>
    )
  }
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="user-container">
            <div className="editButton" onClick={() => { setOpenEdit(!openEdit) }}>Edit</div>
            <User data={data} />
          </div>
          <div className="booking-container">
            <h3>Bookings</h3>
            {data?.bookings?.map((booking) => (
              <Booking booking={booking} loading={loading} key={booking.id} />
            ))}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Single;
