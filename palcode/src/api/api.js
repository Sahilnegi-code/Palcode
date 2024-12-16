import axios from 'axios';
export const api = axios.create({
    baseURL: 'http://localhost:8080'
})
export const googleAuth =  (code) =>{
    console.log(code);
   return  api.get(`auth/google?code=${code}`);
}