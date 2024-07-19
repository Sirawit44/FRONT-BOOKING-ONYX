import axios from '../config/axios.js'
const roomTypeAPI = {};

roomTypeAPI.getRoomType= () => axios.get('/roomType');
roomTypeAPI.getRoomTypeById = (id) => axios.get(`/roomType/${id}` )


export default roomTypeAPI;

