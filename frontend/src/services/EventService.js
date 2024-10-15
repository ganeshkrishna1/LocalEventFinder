import { axiosInstance } from "./BaseUrl";

const user = JSON.parse(localStorage.getItem('user'));
let yourToken;
if(user){
  yourToken = user.token;
}

export const config = {
    headers: {
      Authorization: `Bearer ${yourToken}`
    }
  };

export const postEvent = async (eventData) =>{
  console.log(config,eventData)
    const res = await axiosInstance.post('/events',eventData,config);
    return res.data;
}