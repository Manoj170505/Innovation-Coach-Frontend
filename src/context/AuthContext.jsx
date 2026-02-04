import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser, isAuthenticated, logout as logoutService } from '../services/authService';

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is logged in on mount
        const initAuth = () => {
            if (isAuthenticated()) {
                const userData = getCurrentUser();
                setUser(userData);
            }
            setLoading(false);
        };

        initAuth();
    }, []);

    const login = (userData) => {
        setUser(userData);
    };

    const logout = () => {
        logoutService();
        setUser(null);
    };

    const isAdmin = () => {
        return user?.role === 'ADMIN';
    };

    const value = {
        user,
        login,
        logout,
        isAuthenticated: !!user,
        isAdmin,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
