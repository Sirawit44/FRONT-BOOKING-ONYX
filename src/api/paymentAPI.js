import axios from '../config/axios.js'
const paymentAPI = {};

paymentAPI.createPayment = (formData) => axios.post('/payment', formData);


export default paymentAPI;

