import axios from 'axios';

//const API_URL = "http://192.168.16.101:3000/api"; //Bruno casa
const API_URL = "http://192.168.16.114:3000/api"; //Douglas
//const API_URL = "http://172.30.0.70:3000/api"; //Douglas 2
//const API_URL = "http://10.32.7.167:3000/api"; //Douglas SATC
//const API_URL = "http://192.168.0.16:3000/api"; //Douglas Casa Laura

// pegar IPV4 no cmd ipconfig toda vez que trocar de internet 

export const api = axios.create({
    baseURL: API_URL,
    paramsSerializer: {
        indexes: null
    },
})
