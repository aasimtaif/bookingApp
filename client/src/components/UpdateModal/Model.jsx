import React, { useState, useContext } from 'react'
import './model.css'
import axios from 'axios';
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useApiCalls } from '../../hooks/useApiCalls';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';

const inputs = [
    {
        id: "userName",
        label: "Username",
        type: "text",
        placeholder: "john_doe",
    },
    {
        id: "email",
        label: "Email",
        type: "email",
        placeholder: "john_doe@gmail.com",
    },
    {
        id: "phone",
        label: "Phone",
        type: "text",
        placeholder: "+1 234 567 89",
    },
    {
        id: "country",
        label: "Country",
        type: "text",
        placeholder: "USA",
    },
    {
        id: "city",
        label: "City",
        type: "text",
        placeholder: "USA",
    },
];



function Model({ user, setShowModal }) {
    const [file, setFile] = useState();
    const [info, setInfo] = useState();
    const { dispatch } = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(false)
    const { updateData, err } = useApiCalls()
    const handleChange = (e) => {
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };
    const navigate = useNavigate()
    const handleClick = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        try {
            const UploadImage = async () => {
                if (file) {
                    const data = new FormData();
                    data.append("file", file);
                    data.append("upload_preset", "upload");
                    const uploadRes = await axios.post(
                        "https://api.cloudinary.com/v1_1/dndmxaxc8/image/upload",
                        data
                    );
                    const { url } = uploadRes.data;
                    return url
                }
                return user.img
            }

            const newUser = {
                ...info,
                img: await UploadImage()
            };
            console.log(newUser);
            const res = await updateData(`/users/${user.id}`, newUser);
            // console.log(res.data)
            dispatch({ type: "UPDATE_USER", payload: res.data })
            setIsLoading(false)
            setTimeout(() => {
                setShowModal(false)
            }, 1000);
        } catch (err) {
            console.log(err);
        }
    };
    console.log(info)
    return (
        <div className="modal-container">
            <button className="close" onClick={() => setShowModal(false)}><p>X</p></button>
            <div className="left">
                <img
                    src={
                        file
                            ? URL.createObjectURL(file)
                            : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                    }
                    alt=""
                    className='profile-img'
                />
            </div>
            <div className="right">
                <form onSubmit={handleClick}>
                    <div className="formInput">
                        <label htmlFor="file">
                            Image: <DriveFolderUploadOutlinedIcon className="icon" />
                        </label>
                        <input
                            type="file"
                            id="file"
                            onChange={(e) => setFile(e.target.files[0])}
                            style={{ display: "none" }}
                        />
                    </div>

                    {inputs.map((input) => (
                        <div className="formInput" key={input.id}>
                            <label>{input.label}</label>
                            <input
                                onChange={handleChange}
                                type={input.type}
                                placeholder={input.placeholder}
                                id={input.id}
                                // value={info[input.id]}
                                defaultValue={user[input.id]}
                            />
                        </div>
                    ))}
                    <label>
                        <input type="checkbox"
                            defaultChecked={user.isAdmin}
                            onChange={() => setInfo({ ...info, isAdmin: !info.isAdmin })}
                        />
                        IsAdmin
                    </label>

                    <button type="submit">Send</button>
                </form>
            </div>
        </div>
    )
}

export default Model