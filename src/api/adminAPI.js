import axios from '../config/axios.js'

const adminAPI={}

adminAPI.getAllCustomers = () => axios.get('/admin/allCustomer')
adminAPI.updatePayment = (id,data) => axios.patch(`/admin/payment/${id}`,data)


export default adminAPI;
