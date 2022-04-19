import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const Add = () => {
    const [user, setUser] = useState({ id: "", title: "", description: "" });
    const usersss = JSON.parse(localStorage.getItem('users'));
    const navigate = useNavigate()
    const handle = async (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    };


    const handleSubmit = (e) => {
        let data = JSON.stringify({
            "id": user.id,
            "title": user.title,
            "description": user.description,
        });

        let config = {
            method: 'post',
            url: 'http://localhost:3002/public/sample',
            // headers: {
            //     'headertoken': usersss.token,
            //     'Content-Type': 'application/json'
            // },
            data: data
        };
        navigate("/deails")
        return axios(config)
    }

    return (
        <div>
            <form>

                <label className="label">id</label>
                <input onChange={handle} className="input"
                    name="id"
                    value={user.id} type="text" />

                <label className="label">title</label>
                <input onChange={handle}
                    name="title"
                    value={user.title} type="text" />

                <label className="label">description</label>
                <input onChange={handle}
                    name="description"
                    value={user.description} type="text" />

                <button onClick={handleSubmit} className="btn" type="submit">
                    Submit
                </button>
            </form>


        </div>
    )
}

export default Add