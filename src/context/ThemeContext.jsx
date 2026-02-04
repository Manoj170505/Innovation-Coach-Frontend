import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
};

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        // Check localStorage first
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            console.log('Loaded theme from localStorage:', savedTheme);
            return savedTheme;
        }

        // Check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
            console.log('Using system preference: light');
            return 'light';
        }

        console.log('Using default theme: dark');
        return 'dark'; // Default to dark
    });

    useEffect(() => {
        // Update document class and localStorage when theme changes
        console.log('Applying theme:', theme);
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(theme);
        localStorage.setItem('theme', theme);
        console.log('Document classes:', document.documentElement.className);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => {
            const newTheme = prevTheme === 'dark' ? 'light' : 'dark';
            console.log('Toggling theme from', prevTheme, 'to', newTheme);
            return newTheme;
        });
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
