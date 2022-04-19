import axios from 'axios';
// import authHeader from './auth.header';
// const user = JSON.parse(localStorage.getItem('users'));


const products = () => {
    var config = {
        method: 'get',
        url: 'http://localhost:3002/public/sample',

    }
    return axios(config)

}

export default products;