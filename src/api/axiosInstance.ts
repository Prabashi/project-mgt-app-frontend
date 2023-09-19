import axios from "axios";
import { BACKEND_BASE_URL } from "../constants";

// Create an Axios instance with default options
const axiosInstance = axios.create({
  baseURL: BACKEND_BASE_URL,
  withCredentials: true,
});

export default axiosInstance;
