import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5002/api",
  withCredentials: true,
});

export default API;