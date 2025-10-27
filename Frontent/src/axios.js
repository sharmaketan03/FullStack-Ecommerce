import axios from "axios";

const baseURL = import.meta.env.DEV
  ? import.meta.env.VITE_BACKEND_urllocal      
  : import.meta.env.VITE_BACKEND_URL;           

export const instance = axios.create({
  baseURL,
  withCredentials: true, 
});
