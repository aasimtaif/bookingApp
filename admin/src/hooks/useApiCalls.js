import { useEffect, useState } from "react";
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
            API.post(url, info)
        } catch (error) {
            setErr(err)
        }
    }
    const updateData = (url, info) => {
        try {
            API.put(url, info)
        } catch (error) {
            setErr(err)
        }
    }

    return { deleteData, postData, updateData, err }
}
