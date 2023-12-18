import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Home = () => {
  useEffect(() => {
    navigate("/users");
  }, []);
  const navigate = useNavigate();
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />

      </div>
    </div>
  );
};

export default Home;
