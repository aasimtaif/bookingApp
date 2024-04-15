
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useApiCalls } from "../../hooks/useApiCalls";
import "./login.scss";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: 'admin@gmail.com',
    password: '123456',
  });
  const { postData, err } = useApiCalls()

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
console.log(err)
  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await postData("/auth/login", credentials);
      console.log(res)
      localStorage.setItem("token", res.data.token);
      if (res.data.isAdmin) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });

        navigate("/");
      } else {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: { message: "You are not allowed!" },
        });
      }
    } catch {
      dispatch({ type: "LOGIN_FAILURE", payload: err });
    }
  };

  return (
    <div className="login">
      
      <h4><span>*</span>The Email and password are provider intentionally for project examination
      <br/>
      <span>*</span>
      Please Dont delete All  records </h4>
      <div className="lContainer">

        <input
          type="text"
          placeholder="email"
          id="email"
          onChange={handleChange}
          className="lInput"
          defaultValue={credentials.email}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
          defaultValue={credentials.password}
        />
        <button disabled={loading} onClick={handleClick} className="lButton">
          Login
        </button>
        {err && <span>{err}</span>}
      </div>
    </div>
  );
};

export default Login;
