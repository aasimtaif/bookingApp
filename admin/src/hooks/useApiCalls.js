import { useState } from "react";
import API from "../util/API";


export const useApiCalls = () => {
    const [err, setErr] = useState(false);
    const deleteData = async (url) => {
        try {
            await API.delete(url)
        } catch (error) {
            setErr(err)
        }
    }
    const postData = async (url, info) => {

        try {
            const response = await API.post(url, info)

            return response
        } catch (error) {
            setErr(err)
        }
    }
    const updateData = async (url, info) => {
        try {
            await API.put(url, info)
        } catch (error) {
            setErr(err)
        }
    }

    return { deleteData, postData, updateData, err, }
}
