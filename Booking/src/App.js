import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import Register from "./pages/Register/Register";
import User from "./pages/User/User";
import { useEffect, useState } from "react";
import Timer from "./components/Timer/Timer";
import axios from "axios";
function App() {
  const [isLoading , setIsLoading] = useState(true)
  useEffect(() => {
    axios.get("https://https-booking-app-server.onrender.com/health").then((res) => {
      setIsLoading(false)
    }).catch((err) => {
      setIsLoading(false)
    })
  }, []);
  if(isLoading) return (<Timer/>)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<List />} />
        <Route path="/hotels/:id" element={<Hotel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user/:id" element={<User/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
