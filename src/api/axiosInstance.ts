import axios from "axios";

// Create an Axios instance with default options
const axiosInstance = axios.create({
  withCredentials: true,
});

export default axiosInstance;
