import axios from 'axios';
import { Baseurl } from './api/Baseurl';
import getCookie from './getCookie';

// Create an instance of axios
const axiosInstance = axios.create({
  baseURL: Baseurl,
  withCredentials: true,
});

// Request interceptor for API calls
axiosInstance.interceptors.request.use(
  async (config) => {
    let accessToken = getCookie('accessToken');
    
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// Response interceptor for API calls
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = getCookie('refreshToken');
      
      try {
        const { data } = await axios.get(`${Baseurl}/refresh`, {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
          withCredentials: true,
        });

        const newAccessToken = data?.token;
        
        if (newAccessToken) {
          document.cookie = `accessToken=${newAccessToken}; Secure; SameSite=None`;
          axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        }

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('Error refreshing token:', refreshError);
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;
