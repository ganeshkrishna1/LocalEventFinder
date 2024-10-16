import { axiosInstance } from "./BaseUrl";

const user = JSON.parse(localStorage.getItem('user'));
console.log(user);

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
    const res = await axiosInstance.post('/events',eventData,{
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
      }
    });
    return res.data;
}