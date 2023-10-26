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

const loginUser = payload => api.post(`/user/login`, payload); 
const refreshToken = () => api.get('/user/refresh');
const logoutUser = () => api.post('/user/logout');

const apis = {
    loginUser,
    refreshToken,
    logoutUser
}

export default apis