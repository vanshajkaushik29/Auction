import axios from "axios";

const api = axios.create({
  baseURL: "https://auction-s6i5.onrender.com/api",
});

export default api;