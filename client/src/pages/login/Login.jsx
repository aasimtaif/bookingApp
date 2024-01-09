import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useApiCalls } from "../../hooks/useApiCalls";
import "./login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });
  const { postData, err } = useApiCalls()
  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await postData("/auth/login", credentials);
      localStorage.setItem("token", res.data.token);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate(-1)
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };


  return (
    <div className="login">
      <div className="lContainer">
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <button disabled={loading} onClick={handleClick} className="lButton">
          Login
        </button>
        <span className="register-button">
          New to Lamabooking?
          <Link to='/register' style={{ textDecoration: "none" }}>
            <b>Sign up now.</b>
          </Link>
        </span>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

export default Login;
