import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import auth from "../services/auth.sevices"
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Input } from '@mui/material';


const Login = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState({ name: "", email: "", password: "" });
    const handle = (e) => {


        setUser({ ...user, [e.target.name]: e.target.value })

    };

    const handleSubmit = async (e) => {
        console.log("submit")
        e.preventDefault();

        try {
            let resp = await auth.Login(user.name, user.email, user.password)
            console.log("=-=-=-=-=-data=-=-=-=-=", resp)
            if (resp !== undefined) {
                navigate("/deails");
                return resp;

            }


        }
        catch (error) {
            console.log("error man", error)

        }




    };



    return (
        <Box sx={{
            bgcolor: 'info.main',

            color: 'info.contrastText', p: 2, height: "96.5vh"
        }}  >
            <Box sx={{
                mx: 'auto',

                textAlign: 'center',
                width: "95%",
                height: "90%",
                p: 1,
                m: 1,
                color: 'info.contrastText',
                bgcolor: 'text.disabled'
            }} >
                <div>
                    <Typography variant="h4" t>User Login</Typography>
                </div>
                <form onSubmit={handleSubmit} >
                    <Box
                        sx={{
                            display: 'flex',
                            // alignItems: 'flex-start',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            p: 5,
                            ml: 28,
                            mt: 10,
                            // bgcolor: 'text.secondary',
                            borderRadius: 1,
                            width: '60%',

                        }}
                    >

                        <Typography variant="h5" sx={{ mt: 2 }}>Name</Typography>
                        <Input onChange={handle}
                            name="name"
                            value={user.name} type="text" sx={{ p: 2 }} />

                        <Typography variant="h5" sx={{ mt: 2 }}>Email</Typography>
                        <Input onChange={handle}
                            name="email"
                            value={user.email} type="email" sx={{ p: 2, }} />

                        <Typography variant="h5" sx={{ mt: 2 }}>Password</Typography>
                        <Input onChange={handle}
                            name="password"
                            value={user.password} type="password" sx={{ p: 2 }} />

                        <Button type="submit" variant="contained" style={{ marginTop: "20px" }}>
                            Submit
                        </Button>
                    </Box>
                </form>
            </Box>
        </Box >
    );
}
export default Login;
