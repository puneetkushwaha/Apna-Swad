import axios from 'axios';

// Ensure baseURL ends with /api even if not specified in the .env
const getBaseURL = () => {
    // Priority: 1. Environment Variable, 2. Hardcoded Production Fallback, 3. Localhost
    let url = import.meta.env.VITE_API_URL || 'https://apna-swad-backend.onrender.com';
    
    // Ensure it's a valid string and not a placeholder
    if (typeof url !== 'string' || url.includes('localhost') && import.meta.env.PROD) {
      url = 'https://apna-swad-backend.onrender.com';
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

// Extend the api object with custom methods
api.getPromoSettings = () => api.get('/admin/promo-settings');
api.updatePromoSettings = (settings) => api.put('/admin/promo-settings', settings);
api.generateBulkCoupons = (data) => api.post('/admin/coupons/bulk', data);
api.calculateCheckout = (data) => api.post('/orders/calculate-checkout', data);
api.sendBulkEmail = (data) => api.post('/admin/bulk-email', data);

// Request interceptor for the Authorization header
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('adminToken') || localStorage.getItem('token');
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
