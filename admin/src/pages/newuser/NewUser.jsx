import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";
import { useApiCalls } from "../../hooks/useApiCalls";
import { useNavigate } from "react-router-dom";
import { ColorRing } from 'react-loader-spinner'

const NewUser = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  const { postData, err } = useApiCalls()
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  console.log(info)

  const handleClick = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    const newUser = {
      ...info
    }
    try {
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
      postData("/auth/register", newUser);
      setIsLoading(false)
      setTimeout(() => {
        navigate("/users")
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  };
  if (isLoading) {
    return (
      <div className="loader">
        <ColorRing
          color="#00BFFF"
          height={300}
          width={300}
          timeout={3000}
        />
      </div>
    );
  }

  console.log(info);
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
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
      </div>
    </div>
  );
};

export default NewUser;