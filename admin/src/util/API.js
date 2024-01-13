import axios from "axios";

const API = axios.create({
    baseURL:
        'https://https-booking-app-server.onrender.com/api'
    // "http://localhost:6800/api"
    ,
});
API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
export default API