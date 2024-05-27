import React, { useState } from 'react'
import { userInputs } from '../../formSource';
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./updateUser.scss"
import { useApiCalls } from '../../hooks/useApiCalls';

function UpdateUser({ data }) {
    const [file, setFile] = useState("");
    const [info, setInfo] = useState();
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const { updateData } = useApiCalls()
    const handleChange = (e) => {
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };
    console.log(info)
    const handleClick = async (e) => {
        e.preventDefault();
        setIsLoading(true)

        try {
            const newUser = {
                ...info,
            };
            if (file) {
                const data = new FormData();
                data.append("file", file);
                data.append("upload_preset", "upload");
                const uploadRes = await axios.post(
                    "https://api.cloudinary.com/v1_1/dndmxaxc8/image/upload",
                    data
                );

                const { url } = uploadRes.data;
                newUser.img = url;
            }

            console.log(newUser)

            updateData("/users/" + data.id, newUser);
            setIsLoading(false)
            setTimeout(() => {
                navigate("/users")
            }, 1000);
        } catch (err) {
            console.log(err);
        }
    };
    console.log(info)
    return (
        <div className="bottom">
            <div className="left">
                <img
                    src={
                        file
                            ? URL.createObjectURL(file)
                            : data.img ? data.img : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                    }
                    alt=""
                />
            </div>
            <div className="right">
                <form onSubmit={handleClick}>
                    {userInputs.map((input) => {
                        if (input.id === "password") return null;
                        return (
                            <div className="formInput" key={input.id}>
                                <label>{input.label}</label>
                                <input
                                    onChange={handleChange}
                                    type={input.type}
                                    defaultValue={data[input.id]}
                                    placeholder={input.placeholder}
                                    id={input.id}
                                    required
                                />
                            </div>
                        )
                    })}
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

                    <label>
                        <input type="checkbox"
                            defaultChecked={data?.isAdmin}
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

export default UpdateUser