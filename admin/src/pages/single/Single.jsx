import "./single.scss";
import { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useFetch } from "../../hooks/useFetch";
import { DNA } from 'react-loader-spinner'
import Booking from "../../components/Booking/Booking"
import User from "../../components/user/User";
import UpdateUser from "../../components/updateUser/UpdateUser";
const Single = () => {
  const pathname = (window.location.pathname).split("/")
  const { data, loading, error } = useFetch(`users/find/${pathname[2]}`);
  const [openEdit, setOpenEdit] = useState(false);
  console.log(openEdit)
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
        {!openEdit ?
          <div className="top">
            <div className="user-container">
              <User data={data} />
              <div className="editButton" onClick={() => { setOpenEdit(!openEdit) }}>Edit</div>
            </div>
            {data.booking &&
              <div className="booking-container">
                <h3>Bookings</h3>
                {data?.bookings?.map((booking) => (
                  <Booking booking={booking} loading={loading} key={booking.id} />
                ))}
              </div>
            }
          </div>
          : <UpdateUser data={data} />
        }

      </div>
    </div>
  );
};

export default Single;
