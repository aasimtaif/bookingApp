import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { DNA } from 'react-loader-spinner'
import { useApiCalls } from "../../hooks/useApiCalls";

import "./Register.css";

const Register = () => {
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
            const res = await postData("/auth/register", credentials);
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
            navigate(-1)
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
        }
    };
    console.log(credentials)


    return (
        <div className="login">
            {loading ?
                <DNA
                    visible={true}
                    height="300"
                    width="300"
                    ariaLabel="dna-loading"
                    wrapperStyle={{}}
                    wrapperClass="dna-wrapper"
                /> :
                <div className="lContainer">
                    <input
                        type="text"
                        placeholder="username"
                        id="username"
                        onChange={handleChange}
                        className="lInput"
                    />
                    <input
                        type="email"
                        placeholder="email"
                        id="email"
                        onChange={handleChange}
                        className="lInput"
                    />
                    <input
                        type="number"
                        placeholder="Phone number"
                        id="phone"
                        onChange={handleChange}
                        className="lInput"
                    /><input
                        type="password"
                        placeholder="password"
                        id="password"
                        onChange={handleChange}
                        className="lInput"
                    />
                    <button disabled={loading} onClick={handleClick} className="lButton">
                        Register
                    </button>
                    <span className="register-button">
                        Already have an account?
                        <Link to='/register' style={{ textDecoration: "none" }}>
                            <b>Login now.</b>
                        </Link>
                    </span>
                    {error && <span>{error.message}</span>}
                </div>
            }
        </div>
    );
};

export default Register;
