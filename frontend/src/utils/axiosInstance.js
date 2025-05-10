import axios from 'axios'
import { BASE_URL } from './ApiPaths'


const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    },
});

// Request Interceptor 
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('token');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`
        }

        return config;

    },
    (err) => {
        return Promise.reject(err)
    }
);


// Response Interceptors 
axiosInstance.interceptors.response.use(
    (response) => {
        return response
    },
    (err) => {
        // Handle Common Errors Globally 
        if (err.response) {
            if(err.response.status === 401) {
                // Redirect to login page 
                window.location.href = '/login'
            } else if (err.response.status === 500) {
                console.error('Server error. Please try again later.');
                
            }

        }
        else if (err.code === 'ECONNABORATED') {
            console.error('Request timeout. Please try again.');
            
        }
        return Promise.reject(err)
    }
)

export default axiosInstance