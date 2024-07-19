import axios from '../config/axios.js'
const roomAPI = {};

roomAPI.statusRoom = ()=> axios.get('/room/statusAvailable')


export default roomAPI;

