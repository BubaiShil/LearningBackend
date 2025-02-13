import axios from 'axios'

export  const axiosInstancee = axios.create({
    baseURL : "http://localhost:6000/api",
    withCredentials: true
})