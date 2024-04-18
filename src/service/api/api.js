import axios from 'axios';

//const API_URL = "http://192.168.190.45:3000/api"; //Bruno
const API_URL = "http://172.30.0.38:3000/api"; //Douglas

// pegar IPV4 no cmd ipconfig toda vez que trocar de internet 

export const api = axios.create({
    baseURL: API_URL,
    paramsSerializer: {
        indexes: null
    }
})
