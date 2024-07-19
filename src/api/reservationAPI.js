import axios from '../config/axios.js'
const reservationAPI = {};

reservationAPI.createReservation= (data,file) => axios.post('/reservation',{data,file});
reservationAPI.getAllReservation= () => axios.get('/reservation')
reservationAPI.cancelReservation = (id) => axios.patch(`reservation/cancel/${id}`)


export default reservationAPI;

