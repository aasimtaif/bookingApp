import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        This page is Under construction
        <br />
        Use Side bar to Navigate to other page Like Users, Hotels, Rooms, Bookings
      </div>
    </div>
  );
};

export default Home;
