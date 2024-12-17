import axios from 'axios';
export const api = axios.create({
    baseURL: 'https://palcode.onrender.com'
})
export const googleAuth =  (code) =>{
   return  api.get(`auth/google?code=${code}`);
}