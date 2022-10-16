import axios from "axios";

export const BASE_URL = `http://${window.location.hostname}:5001`;

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});
