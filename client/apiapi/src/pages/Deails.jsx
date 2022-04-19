import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import products from "../services/auth.post"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CustomButton from "./Button";
import { uploadFile } from 'react-s3';
import InputUnstyled from '@mui/base/InputUnstyled';
import LinearProgress from '@mui/material/LinearProgress';
window.Buffer = window.Buffer || require("buffer").Buffer;
// require('dotenv').config()


const S3_BUCKET = process.env.REACT_APP_BUCKET_NAME;
const REGION = process.env.REACT_APP_REGION_NAME;
const ACCESS_KEY = process.env.REACT_APP_AccessKeyId;
const SECRET_ACCESS_KEY = process.env.REACT_APP_SecretAccessKey;
console.log(S3_BUCKET, "S3");
console.log(REGION, "=-=-=-=-=-=-")
const config = {
    bucketName: S3_BUCKET,
    region: REGION,
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
}



const Deails = () => {
    const [data, setdata] = useState([]);
    const [render, setRender] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const navigate = useNavigate()
    const usersss = JSON.parse(localStorage.getItem('users'));


    useEffect(() => {
        products().then((res) => {
            setdata(res.data)

        })
            .catch((err) => {

            })



    }, [render])
    // console.log(data, "DATA")
    const AddPAGE = () => {
        navigate("/add")
        console.log("first")

    }

    const DELBTN = (id) => {
        console.log(id, "ID DID ID ")
        let config = {
            method: 'delete',
            url: `http://localhost:3002/public/sample/${id}`,
            headers: {
                'headertoken': usersss.token,
                'Content-Type': 'application/json'
            },
        };
        setRender(!render)
        return axios(config)
    }
    const EDTBTN = (id) => {
        navigate(`/edit/${id}`)

    }


    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const handleUpload = async (file) => {
        uploadFile(file, config)
            .then(data => console.log(data))
            .catch(err => console.error(err))
    }



    return (
        <Container>
            <Typography variant="h3"> Details</Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell >ID</TableCell>
                            <TableCell > TITLE </TableCell>
                            <TableCell > DESCRIPTION </TableCell>
                            <TableCell > DELETE </TableCell>
                            <TableCell > EDIT </TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>{data.map((post, index) => (<TableRow key={index}>
                        <TableCell> {post.id} </TableCell>
                        <TableCell>{post.title}</TableCell>
                        <TableCell>{post.description}</TableCell>
                        <TableCell>
                            <Button onClick={() => DELBTN(post.id)} variant="outlined" color="error"> Delete</Button>
                        </TableCell>
                        <TableCell>
                            <Button onClick={() => EDTBTN(post.id)} variant="outlined" color="secondary">Edit</Button>
                        </TableCell>

                    </TableRow>))}

                    </TableBody>
                </Table>

            </TableContainer>
            <CustomButton button={AddPAGE} name="add button" />
            <div style={{ padding: "10px" }}>
                <div>React S3 File Upload</div>
                <InputUnstyled type="file" style={{ border: '1px solid black', marginRight: "10px", padding: "10px" }} onChange={handleFileInput} />

                <Button onClick={() => handleUpload(selectedFile)} variant="contained" sx={{ bgcolor: 'secondary.main', marginTop: '10px' }}> Upload to S3</Button>
            </div>
        </Container>
    )
}

export default Deails