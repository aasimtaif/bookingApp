import "./single.scss";
import { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useFetch } from "../../hooks/useFetch";
import { useApiCalls } from "../../hooks/useApiCalls";
import { DNA } from 'react-loader-spinner'
import Booking from "../../components/Booking/Booking";
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
          <div className="left">
            <div className="editButton" onClick={() => { setOpenEdit(!openEdit) }}>Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src={data.img}
                alt=""
                className="itemImg"
              />
              <div className="details">
                <div className="nameDetail">
                  <h1 className="itemTitle">{data.username}</h1>
                  {data.isAdmin && <span><p>admin</p></span>}
                </div>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{data.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">{data.phone}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">City:</span>
                  <span className="itemValue">
                    {data.city}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Country:</span>
                  <span className="itemValue">{data.country}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="booking-section">
            <Booking data={data.bookings} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Single;
