import axios from "axios";

const SignUp = async (name, email, password) => {

    return await axios.post("http://localhost:3002/auth/signup", { name, email, password })

        .then((response) => {
            if (response.data.token) {
                localStorage.setItem("users", JSON.stringify(response.data));
            }
            return response.data

        })
};

const Login = async (name, email, password) => {
    try {
        console.log("working")
        return await axios.post("http://localhost:3002/auth/login", { name, email, password })
            .then((response) => {
                console.log("data data", response.data)
                if (response.data.token && response.data.refreshToken) {
                    localStorage.setItem("users", JSON.stringify(response.data.token));
                    localStorage.setItem("refresh", JSON.stringify(response.data.refreshToken))

                }
                return response.data;
            })
            .catch(err => {
                if (err.response.status === 401) {
                    return "data"
                }
            })
    } catch (e) {
        console.log("working1")
        console.log(e.response.error, 'error')
        return "data error"

    }
}

const Logout = () => {
    localStorage.removeItem("users");
}
const GetCurrentUser = () => {
    return JSON.parse(localStorage.getItem("users"))
};
const auth = {
    SignUp, Login, Logout, GetCurrentUser
}
export default auth;