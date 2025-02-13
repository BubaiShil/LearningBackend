import axios from 'axios'

export const axiosInstancee = axios.create({
    baseURL : "http://localhost:4000/api",
    withCredentials: true,
})