import axios from '../config/axios.js'
const branchAPI = {};

branchAPI.getBranch= () => axios.get('/branch/');
branchAPI.uploadMapImage = (formData)=>axios.patch('/branch', formData)



export default branchAPI;

