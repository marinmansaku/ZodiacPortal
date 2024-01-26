import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001/api',
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
})

export const axiosPrivate = axios.create({
    baseURL: 'http://localhost:3001/api',
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});

export const axiosUpload = axios.create({
    baseURL: 'http://localhost:3001/api',
    withCredentials: true
});


const loginUser = payload => api.post(`/user/login`, payload); 
const refreshToken = () => api.get('/user/refresh');
const logoutUser = () => api.post('/user/logout');

const addAlloy = payload => api.post(`/alloy/add`, payload); 
const getAlloys = () => api.get(`/alloy/getAll`); 

const getJSON = payload => axiosUpload.post('/alloy/getJson', payload);

const apis = {
    loginUser,
    refreshToken,
    logoutUser,
    addAlloy,
    getAlloys,
    getJSON
}

export default apis