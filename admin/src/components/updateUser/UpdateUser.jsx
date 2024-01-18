import React, { useState } from 'react'
import { userInputs } from '../../formSource';
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import axios from 'axios';
import "./updateUser.scss"
import { useApiCalls } from '../../hooks/useApiCalls';

function UpdateUser({ data }) {
    const [file, setFile] = useState("");
    const [info, setInfo] = useState({});
    const { updateData } = useApiCalls()
    const handleChange = (e) => {
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };
console.log(info)
    const handleClick = async (e) => {
        e.preventDefault();
        // setIsLoading(true)
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "upload");
        try {
            const uploadRes = await axios.post(
                "https://api.cloudinary.com/v1_1/dndmxaxc8/image/upload",
                data
            );

            const { url } = uploadRes.data;

            const newUser = {
                ...info,
                img: url,
            };

            updateData("/auth/register", newUser);
            // setIsLoading(false)
            // setTimeout(() => {
            //     navigate("/users")
            // }, 1000);
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div className="bottom">
            <div className="left">
                <img
                    src={
                        file
                            ? URL.createObjectURL(file)
                            : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                    }
                    alt=""
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
                
                    <label>
                        <input type="checkbox"
                            defaultChecked={false}
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