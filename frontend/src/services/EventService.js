import { axiosInstance } from "./BaseUrl";

const yourToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MGJlYTFjNmIwOWIwMTQ1NjlhYzkyNSIsImlhdCI6MTcyODgzNDM0MiwiZXhwIjoxNzMxNDI2MzQyfQ.cgQNlGxC4eiIZx7RlW1PIS8KXhs6Qby0GSA_eY4twqo'

const config = {
    headers: {
      Authorization: `Bearer ${yourToken}`
    }
  };

export const postEvent = async (eventData) =>{
    const res = await axiosInstance.post('/events/',eventData,config);
    return res.data;
}

export const getEventById = async (eventId) =>{
    const res = await axiosInstance.get('');
}