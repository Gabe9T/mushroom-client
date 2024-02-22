import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState("");
    const [userEmail, setUserEmail] = useState(""); // Add user email state

    const setToken = (token, email) => {
        setAccessToken(token);
        setUserEmail(email);
    };

    return (
        <AuthContext.Provider value={{ accessToken, setToken, userEmail }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};