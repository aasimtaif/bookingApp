import React, { useState } from 'react'
import './update.scss'
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { userColumns as inputs } from '../../datatablesource';

function Update({ openEdit, setOpenEdit, data }) {
    const [file, setFile] = useState("");
    const [info, setInfo] = useState({});
const handleChange = (e) => {}
const handleClick = (e) => {}

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

                    {inputs.map((input) => (
                        <div className="formInput" key={input.id}>
                            <label>{input.label}</label>
                            <input
                                onChange={handleChange}
                                type={input.type}
                                placeholder={input.placeholder}
                                id={input.id}
                                required
                            />
                        </div>
                    ))}
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

export default Update