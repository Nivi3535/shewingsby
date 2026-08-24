import axios from "axios";

//creating a axios insa=tance so i can just use like api.
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, //tellin to use cokie or jwttoken
});

export default api;
