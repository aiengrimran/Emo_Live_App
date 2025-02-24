import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import envVar from '../config/envVar';
const axiosInstance = axios.create({
  baseURL: envVar.API_URL,
  timeout: 35000,
  // timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  async config => {
    // Add token to request headers
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Accept = 'application/json';
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      // console.log('Error Response:', error.response.data);
      return Promise.reject(error.response.data);
    } else if (error.request) {
      console.log('server not responding at the moment');
      return Promise.reject(error.request);
      // return Promise.reject(error.request);
      //   console.log('No Response:', error.request);
    } else {
      return Promise.reject(error.message);
      //   console.log('Error:', error.message);
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
