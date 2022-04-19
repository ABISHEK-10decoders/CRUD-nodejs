import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import products from "../services/auth.post"



const Edit = () => {
    const { id } = useParams()
    const [data, setdata] = useState({});
    const navigate = useNavigate()


    const GetBtID = () => {
        var config = {
            method: 'get',
            url: `http://localhost:3002/public/sample/${id}`,

        }
        return axios(config);

    }
    useEffect(() => {
        GetBtID().then((response) => {
            console.log(response)
            setdata(response.data)
        })
    }, [])

    const handle = (e) => {
        setdata({ ...data, [e.target.name]: e.target.value })

    }
    const handleSubmit = (e) => {
        let datas = JSON.stringify({
            "id": data.id,
            "title": data.title,
            "description": data.description,
        });

        let config = {
            method: 'put',
            url: `http://localhost:3002/public/sample/${id}`,
            // headers: {
            //     'headertoken': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjFAZ21haWwuY29tIiwiaWF0IjoxNjQ5MzEzNjg3LCJleHAiOjE2NDkzMTU2ODd9._6w1januLU4eAyz5GhOR7sngQyHt5SIVwDpAThr57So',
            //     'Content-Type': 'application/json'
            // },
            data: datas
        };
        navigate("/deails")
        return axios(config);
    }

    return (
        <div>
            <form>

                <label className="label">id</label>
                <input onChange={handle} className="input"
                    name="id"
                    value={data.id} type="text" />

                <label className="label">title</label>
                <input onChange={handle}
                    name="title"
                    value={data.title} type="text" />

                <label className="label">description</label>
                <input onChange={handle}
                    name="description"
                    value={data.description} type="text" />

                <button onClick={handleSubmit} className="btn" type="submit">
                    Submit
                </button>
            </form>


        </div>
    )
}

export default Edit