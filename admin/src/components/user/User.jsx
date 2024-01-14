import React from 'react'
import "./user.scss"
import { useApiCalls } from "../../hooks/useApiCalls";

function User({ data }) {
    return (
        <div className="left">
            <h1 className="title">Information</h1>
            <div className="item">
                <img
                    src={data?.img}
                    alt=""
                    className="itemImg"
                />
                <div className="details">
                    <div className="nameDetail">
                        <h1 className="itemTitle">{data.username}</h1>
                        {data.isAdmin && <span><p>admin</p></span>}
                        
                    </div>
                    <div className="detailItem">
                        <span className="itemKey">Email:</span>
                        <span className="itemValue">{data.email}</span>
                    </div>
                    <div className="detailItem">
                        <span className="itemKey">Phone:</span>
                        <span className="itemValue">{data.phone}</span>
                    </div>
                    <div className="detailItem">
                        <span className="itemKey">City:</span>
                        <span className="itemValue">
                            {data.city}
                        </span>
                    </div>
                    <div className="detailItem">
                        <span className="itemKey">Country:</span>
                        <span className="itemValue">{data.country}</span>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default User