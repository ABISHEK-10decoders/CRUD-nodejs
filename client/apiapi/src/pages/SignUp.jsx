import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import auth from "../services/auth.sevices"

const SignUp = () => {
    const navigate = useNavigate()


    const [user, setUser] = useState([{ name: " ", email: "", password: "" }]);



    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);


    const handle = (e) => {
        e.preventDefault();

        // setData({ ...data, [e.target.name]: e.target.value });}
        // setName(e.target.value);
        setUser({ ...user, [e.target.name]: e.target.value })
        setSubmitted(false);
        console.log("User", user)
    };


    // const handleEmail = (e) => {
    //     setEmail(e.target.value);
    //     setSubmitted(false);
    // };


    // const handlePassword = (e) => {
    //     setPassword(e.target.value);
    //     setSubmitted(false);
    // };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (user.email === '' || user.password === '') {
            setError(true);
        } else {
            setSubmitted(true);
            setError(false);
        }
        e.preventDefault();
        console.log("working")
        try {
            await auth.SignUp(user.email, user.password)
                .then((response) => {
                    console.log(response)
                    navigate("/login");
                    window.location.reload();


                })

        }
        catch (error) {
            console.log(error, "errorrrrr adikiidhuuuuu")
        }
        // navigate("/login");


    };


    const successMessage = () => {
        return (
            <div
                className="success"
                style={{
                    display: submitted ? '' : 'none',
                }}>
                <h1>User {user.email} successfully registered!!</h1>
            </div>
        );
    };


    const errorMessage = () => {
        return (
            <div
                className="error"
                style={{
                    display: error ? '' : 'none',
                }}>
                <h1>Please enter all the fields</h1>
            </div>
        );
    };

    return (
        <div className="form">
            <div>
                <h1>User Registration</h1>
            </div>


            <div className="messages">
                {errorMessage()}
                {successMessage()}
            </div>

            <form>
                {/* Labels and inputs for form data */}
                {/* <label className="label">Name</label>
                <input onChange={handle} className="input"
                    value={user.name} type="text" /> */}

                <label className="label">Email</label>
                <input onChange={handle}
                    value={user.email} type="email" />

                <label className="label">Password</label>
                <input onChange={handle}
                    value={user.password} type="password" />

                <button onClick={handleSubmit} className="btn" type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
}
export default SignUp;
