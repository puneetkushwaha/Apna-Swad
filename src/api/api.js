import axios from 'axios';

// Ensure baseURL ends with /api even if not specified in the .env
const getBaseURL = () => {
    let url = import.meta.env.VITE_API_URL;
    
    // Fallback for development if VITE_API_URL is missing or is just a placeholder
    if (!url || url.includes('import.meta.env')) {
        url = 'http://localhost:5000/api';
    }

    // Ensure it ends with /api
    if (!url.endsWith('/api') && !url.endsWith('/api/')) {
        url = url.endsWith('/') ? `${url}api` : `${url}/api`;
    }

    return url;
};

const api = axios.create({
    baseURL: getBaseURL(),
});

// Request interceptor for the Authorization header
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
