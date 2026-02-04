import api from '../config/apiConfig';

// Signup
export const signup = async (userData) => {
    const response = await api.post('/users/signup', userData);
    return response.data;
};

// Login
export const login = async (credentials) => {
    const response = await api.post('/users/login', credentials);
    if (response.data.status === 'success') {
        // Store token and user data
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data));
    }
    return response.data;
};

// Logout
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

// Get current user from localStorage
export const getCurrentUser = () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
};

// Check if user is authenticated
export const isAuthenticated = () => {
    return !!localStorage.getItem('token');
};

// Check if user is admin
export const isAdmin = () => {
    const user = getCurrentUser();
    return user?.role === 'ADMIN';
};
