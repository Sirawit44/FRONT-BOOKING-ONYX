import axios from "../config/axios";

const userAPI = {}

userAPI.uploadUserImage = (formData)=>axios.patch('/users', formData)
userAPI.getProfileUser = (profileUserId) => axios.get(`/users/${profileUserId}`)
export default userAPI;