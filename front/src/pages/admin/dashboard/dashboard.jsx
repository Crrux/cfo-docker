import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import api from "../../../services/api";


const Dashboard = () => {
    const { user, logout } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [isCleanupLoading, setIsCleanupLoading] = useState(false);
    const [cleanupMessage, setCleanupMessage] = useState(null);
    const navigate = useNavigate();

    const handleLogout = async () => {
        setIsLoading(true);
        await logout();
        navigate("/admin/login");
    };

    const handleCleanup = async () => {
        try {
            setIsCleanupLoading(true);
            setCleanupMessage(null);
            const response = await api.post("/contact/cleanup");
            setCleanupMessage({
                type: "success",
                text: `Nettoyage réussi : ${response.data.message}`
            });
        } catch (error) {
            console.error("Erreur lors du nettoyage des données :", error);
            setCleanupMessage({
                type: "error",
                text: "Erreur lors du nettoyage des données. Veuillez réessayer."
            });
        } finally {
            setIsCleanupLoading(false);
            // Effacer le message après 5 secondes
            setTimeout(() => {
                setCleanupMessage(null);
            }, 5000);
        }
    };

    useEffect(() => {
        document.title = "Dashboard Admin | CrossFit Obernai";
    }, []);

    return (
        <div className="admin-dashboard">
            <div className="admin-header">
                <h1>Dashboard Admin</h1>
                <button
                    onClick={handleLogout}
                    className="logout-button"
                    disabled={isLoading}
                >
                    {isLoading ? "Déconnexion..." : "Se déconnecter"}
                </button>
            </div>

            <div className="admin-content">
                <div className="welcome-section">
                    <h2>Bienvenue, {user?.username || "Admin"} !</h2>
                    <p>Vous êtes connecté à l'interface d'administration de CrossFit Obernai.</p>
                </div>

                <div className="maintenance-section">
                    <h3>Maintenance du système</h3>
                    <div className="maintenance-actions">
                        <div className="action-card">
                            <h4>Nettoyage des données</h4>
                            <p>Lancez un nettoyage manuel des formulaires de contact obsolètes selon les règles de conservation.</p>
                            <button
                                className="cleanup-button"
                                onClick={handleCleanup}
                                disabled={isCleanupLoading}
                            >
                                {isCleanupLoading ? "Nettoyage en cours..." : "Lancer le nettoyage"}
                            </button>
                            {cleanupMessage && (
                                <div className={`cleanup-message ${cleanupMessage.type}`}>
                                    {cleanupMessage.text}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="dashboard-grid">
                    <div className="dashboard-card">
                        <h3>Statistiques</h3>
                        <p>Gérez vos statistiques et données ici.</p>
                    </div>

                    <Link to="/admin/users" className="dashboard-card">
                        <h3>Utilisateurs</h3>
                        <p>Gérez les comptes administrateurs.</p>
                    </Link>

                    <div className="dashboard-card">
                        <h3>Contenu</h3>
                        <p>Gérez le contenu du site Web.</p>
                    </div>

                    <Link to="/admin/contacts" className="dashboard-card">
                        <h3>Messages</h3>
                        <p>Gérez les messages reçus via le formulaire de contact.</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
