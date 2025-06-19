import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";


const Dashboard = () => {
    const { user, logout } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        setIsLoading(true);
        await logout();
        navigate("/admin/login");
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

                <div className="dashboard-grid">
                    <div className="dashboard-card">
                        <h3>Statistiques</h3>
                        <p>Gérez vos statistiques et données ici.</p>
                    </div>

                    <div className="dashboard-card">
                        <h3>Utilisateurs</h3>
                        <p>Gérez les comptes administrateurs.</p>
                    </div>

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
