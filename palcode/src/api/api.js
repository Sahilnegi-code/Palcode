import axios from 'axios';
const api = axios.create({
    baseURL: 'http://localhost:8080/auth'
})

export const googleAuth =  (code) =>{
    console.log(code);
   return  api.get(`/google?code=${code}`);
}