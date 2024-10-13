import { axiosInstance } from "./BaseUrl";

export const registerUser = async (user)=>{
    const res = await axiosInstance.post('/users/register',user);
    return res.data;
}

export const loginUser = async (userCredentials)=>{
    const res = await axiosInstance.post('/users/login',userCredentials);
    return res.data;
}