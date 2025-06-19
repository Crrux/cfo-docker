import axios from "axios";

// Configurer l'URL de base selon l'environnement
// En utilisant le proxy Vite en développement et l'URL absolue en production
const baseURL = import.meta.env.MODE === "production"
    ? "https://crossfitobernai.com/api"
    : "/api"; // Utilisera le proxy configuré dans vite.config.js

// Créer une instance d'axios
const api = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Intercepteur de requête pour ajouter le token JWT
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Intercepteur de réponse pour gérer les erreurs
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Si erreur 401 (non authentifié), déconnecter l'utilisateur
        if (error.response && error.response.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        }
        return Promise.reject(error);
    }
);

export default api;
