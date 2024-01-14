import "./navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
const Navbar = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">lamabooking</span>
        </Link>
        {user ?
          <Link to={`/user/${user.id}`} style={{ color: "inherit", textDecoration: "none" }}>
            <div className="user">
              <img className="profile-icon" src={user?.img} alt="" />
              <p>
                {user.userName}
              </p>
            </div>
          </Link> : (
            <div className="navItems">
              <button className="navButton">Register</button>
              <button className="navButton">Login</button>
            </div>
          )}
      </div>
    </div>
  );
};

export default Navbar;
