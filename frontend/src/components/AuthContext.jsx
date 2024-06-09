import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();
console.log(AuthContext)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    console.log(user)
    const login = (userData) => {
        console.log(userData)
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
