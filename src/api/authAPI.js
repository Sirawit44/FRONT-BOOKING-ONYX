import axios from '../config/axios.js'
const authAPI = {};

authAPI.register = (body)=> axios.post('/auth/register', body);
authAPI.login = (body)=> axios.post('/auth/login', body)
authAPI.getAuthUser =()=> axios.get('/auth/me')

export default authAPI;

