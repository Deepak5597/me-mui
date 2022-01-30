import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

    let [user, setUser] = useState(() => {
        const localData = localStorage.getItem("user");
        return localData ? JSON.parse(localData) : {};
    });

    let [isLoggedIn, setIsLoggedIn] = useState(false);

    const logout = () => {
        setUser({});
        setIsLoggedIn(false);
        localStorage.removeItem("user");
        localStorage.removeItem("isLoggedIn");
    }
    const login = (user) => {
        setUser(user);
        setIsLoggedIn(true);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("isLoggedIn", String(true));
    }
    return (
        <AuthContext.Provider value={{ user, isLoggedIn, logout, login }}>
            {children}
        </AuthContext.Provider>
    )
}