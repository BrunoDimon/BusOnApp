import axios from 'axios';

//const API_URL = "http://192.168.16.101:3000/api"; //Bruno casa
//const API_URL = "http://172.17.0.1:3000/api"; //Douglas
const API_URL = "http://172.17.0.1:3000/api"; //Douglas SATC

// pegar IPV4 no cmd ipconfig toda vez que trocar de internet 

export const api = axios.create({
    baseURL: API_URL,
    paramsSerializer: {
        indexes: null
    }
})
