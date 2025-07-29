import React, { createContext, useContext, useState } from "react";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        try {
            const storedUser = localStorage.getItem('user');
            const token = localStorage.getItem('token');
            if (storedUser && token) {
                return JSON.parse(storedUser);
            }
            return null;
        } catch (error) {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            return null;
        }
    });

    const isAuthenticated = !!user;

    const login = (userData) => {
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', userData.token);
        setUser(userData);
    };

    const logout = async () => {
    try {
        const token = localStorage.getItem('token');
        if (token) {
            const API_URL = import.meta.env.VITE_API_BASE_URL || '/api/';
            await fetch(`${API_URL}users/logout/`, {
                method: 'POST',
                headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json',
                },
            });
        }
    } catch (error) {   
        console.error("Logout API error", error);
    } finally {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
    }
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);