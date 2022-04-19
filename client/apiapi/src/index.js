import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';


axios.interceptors.request.use((request, response) => {
  console.log(request, 'axios - interceptors - request - request !!!!!')
  console.log(response, 'axios - interceptors - request - response !!!!!')

  // const user = JSON.parse(localStorage.getItem('users'));
  const token = JSON.parse(localStorage.getItem('users'));
  request.headers = { ...request.headers, "headertoken": token, "Content-Type": "application/json" }
  // if (statusCode == 401) {

  // }

  return request


})


// Add a response interceptor
axios.interceptors.response.use(function (response) {
  console.log(response, "RESPONSE 200 ??????");
  if (response.status === 401) {
    console.log(response, "RESPONSE RESPONSE 401 ??????");
    const refreshToken = JSON.parse(localStorage.getItem('refresh'));
    var data = JSON.stringify({
      "refreshToken": refreshToken
    });

    var config = {
      method: 'post',
      url: 'http://localhost:3002/auth/refresh',
      headers: {
        'headertoken': data,
        'Content-Type': 'application/json'
      },

    };

    return axios(config)


  }
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});
// axios.interceptors.response.use((req, res) => {
//   console.log('response', res)
//   return res;
// })

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
