import { createContext, useState, useContext, useEffect } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        // Essayer de récupérer l'utilisateur du stockage local au chargement
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");

        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
        }

        setLoading(false);
    }, []);
    const login = async (username, password) => {
        try {
            setLoading(true);
            setError(null);

            const response = await api.post("/auth/login", {
                username,
                password,
            });

            const { access_token, user } = response.data;

            // Stocker les infos d'authentification
            localStorage.setItem("token", access_token);
            localStorage.setItem("user", JSON.stringify(user));

            setUser(user);
            return true;
        } catch (err) {
            setError(err.response?.data?.message || "Erreur d'authentification");
            return false;
        } finally {
            setLoading(false);
        }
    };
    const logout = async () => {
        try {
            await api.post("/auth/logout");
        } catch (err) {
            console.error("Erreur lors de la déconnexion:", err);
        } finally {
            // Nettoyer même si la requête échoue
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            setUser(null);
        }
    };

    const isAuthenticated = () => !!user;

    const value = {
        user,
        loading,
        error,
        login,
        logout,
        isAuthenticated,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
