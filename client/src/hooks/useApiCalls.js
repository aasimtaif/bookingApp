import { useState } from "react";
import API from "../util/API";


export const useApiCalls = () => {
    const [err, setErr] = useState(false);

    const deleteData = async (url) => {
        try {
            API.delete(url)
        } catch (error) {
            setErr(err)
        }
    }
    const postData = (url, info) => {
        console.log(url, info)
        try {
            const response = API.post(url, info)
            return response
        } catch (error) {
            setErr(err)
        }
    }
    const updateData = (url, info) => {
        try {
            const response = API.put(url, info)
            return response
        } catch (error) {
            setErr(err)

        }
    }

    return { deleteData, postData, updateData, err }
}
