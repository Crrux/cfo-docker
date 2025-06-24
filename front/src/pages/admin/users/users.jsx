import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import api from "../../../services/api";

const Users = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // État pour le formulaire d'ajout d'utilisateur
    const [newUser, setNewUser] = useState({
        username: "",
        password: "",
    });

    // État pour la gestion des permissions
    const [selectedUser, setSelectedUser] = useState(null);
    const [showPermissionsForm, setShowPermissionsForm] = useState(false);
    const [permissionsData, setPermissionsData] = useState({
        canManageUsers: false
    });

    // État pour la confirmation de suppression
    const [userToDelete, setUserToDelete] = useState(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    const [formError, setFormError] = useState("");
    const [formSuccess, setFormSuccess] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Récupérer la liste des administrateurs
    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await api.get("/admin/users");
            setUsers(response.data);
        } catch (err) {
            if (err.response && err.response.status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                navigate("/admin/login");
                return;
            }
            console.error("Erreur lors de la récupération des utilisateurs:", err);
            setError("Impossible de charger la liste des utilisateurs");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        document.title = "Gestion des Utilisateurs | CrossFit Obernai";
    }, []);

    const handleLogout = async () => {
        await logout();
        navigate("/admin/login");
    };

    // Gérer les changements dans le formulaire
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser({ ...newUser, [name]: value });
    };

    // Gérer les changements dans le formulaire de permissions
    const handlePermissionsChange = (e) => {
        const { name, checked } = e.target;
        setPermissionsData({ ...permissionsData, [name]: checked });
    };

    // Soumettre le formulaire pour ajouter un nouvel administrateur
    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError("");
        setFormSuccess("");

        // Validation de base
        if (!newUser.username || !newUser.password) {
            setFormError("Le nom d'utilisateur et le mot de passe sont requis");
            return;
        }

        if (newUser.password.length < 8) {
            setFormError("Le mot de passe doit contenir au moins 8 caractères");
            return;
        }

        try {
            setIsSubmitting(true);
            const response = await api.post("/admin/users", newUser);

            // Mise à jour de la liste des utilisateurs
            fetchUsers();

            // Réinitialiser le formulaire
            setNewUser({
                username: "",
                password: "",
            });

            setFormSuccess("Utilisateur ajouté avec succès");

            // Effacer le message de succès après 5 secondes
            setTimeout(() => {
                setFormSuccess("");
            }, 5000);

        } catch (err) {
            console.error("Erreur lors de l'ajout d'un utilisateur:", err);
            setFormError(err.response?.data?.message || "Erreur lors de la création de l'utilisateur");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Ouvrir le formulaire de gestion des permissions
    const handleOpenPermissions = (admin) => {
        setSelectedUser(admin);
        setPermissionsData({
            canManageUsers: admin.canManageUsers
        });
        setShowPermissionsForm(true);
    };

    // Soumettre les modifications de permissions
    const handleSubmitPermissions = async (e) => {
        e.preventDefault();
        setFormError("");

        try {
            setIsSubmitting(true);
            await api.patch(`/admin/users/${selectedUser.id}/permissions`, permissionsData);

            // Mise à jour de la liste des utilisateurs
            fetchUsers();

            setFormSuccess("Permissions mises à jour avec succès");
            setShowPermissionsForm(false);

            // Effacer le message de succès après 5 secondes
            setTimeout(() => {
                setFormSuccess("");
            }, 5000);

        } catch (err) {
            console.error("Erreur lors de la mise à jour des permissions:", err);
            setFormError(err.response?.data?.message || "Erreur lors de la mise à jour des permissions");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Activer/désactiver un utilisateur
    const handleToggleActive = async (id) => {
        try {
            await api.patch(`/admin/users/${id}/toggle-active`);
            fetchUsers();
        } catch (err) {
            console.error("Erreur lors de la modification du statut:", err);
            setError(err.response?.data?.message || "Erreur lors de la modification du statut de l'utilisateur");
        }
    };

    // Confirmer la suppression d'un utilisateur
    const handleConfirmDelete = (admin) => {
        setUserToDelete(admin);
        setShowDeleteConfirmation(true);
    };

    // Supprimer un utilisateur
    const handleDelete = async () => {
        try {
            await api.delete(`/admin/users/${userToDelete.id}`);

            // Mise à jour de la liste des utilisateurs
            fetchUsers();

            setShowDeleteConfirmation(false);
            setUserToDelete(null);

            setFormSuccess("Utilisateur supprimé avec succès");

            // Effacer le message de succès après 5 secondes
            setTimeout(() => {
                setFormSuccess("");
            }, 5000);

        } catch (err) {
            console.error("Erreur lors de la suppression:", err);
            setError(err.response?.data?.message || "Erreur lors de la suppression de l'utilisateur");
            setShowDeleteConfirmation(false);
        }
    };

    // Vérifie si l'utilisateur actuel est un super admin
    const isSuperAdmin = user?.superAdmin === true;

    // Vérifie si l'utilisateur actuel peut gérer les utilisateurs
    const canManageUsers = user?.superAdmin === true || user?.canManageUsers === true;

    return (
        <div className="admin-users">
            <div className="admin-header">
                <h1>Gestion des Utilisateurs</h1>
                <div>
                    <Link to="/admin/dashboard" className="back-button">
                        Retour au Dashboard
                    </Link>
                </div>
            </div>

            {formSuccess && (
                <div className="success-message" style={{ padding: "0.75rem", marginBottom: "1rem", backgroundColor: "#d4edda", borderRadius: "4px" }}>
                    {formSuccess}
                </div>
            )}

            <div className="users-container">
                <h2>Liste des administrateurs</h2>

                {loading ? (
                    <p>Chargement des utilisateurs...</p>
                ) : error ? (
                    <p className="error-message">{error}</p>
                ) : (
                    <table className="users-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nom d'utilisateur</th>
                                <th>Date de création</th>
                                <th>Statut</th>
                                <th>Peut gérer les utilisateurs</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length === 0 ? (
                                <tr>
                                    <td colSpan="7">Aucun administrateur trouvé</td>
                                </tr>
                            ) : (
                                users.map((admin) => (
                                    <tr key={admin.id}>
                                        <td>{admin.id}</td>
                                        <td>{admin.username}</td>
                                        <td>{new Date(admin.createdAt).toLocaleDateString('fr-FR')}</td>
                                        <td>{admin.isActive ? "Actif" : "Inactif"}</td>
                                        <td>{admin.canManageUsers ? "Oui" : "Non"}</td>
                                        <td className="user-actions">
                                            {/* Bouton pour activer/désactiver */}
                                            {canManageUsers && admin.id !== user.id && (
                                                <button
                                                    className={admin.isActive ? "deactivate-btn" : "activate-btn"}
                                                    onClick={() => handleToggleActive(admin.id)}
                                                    disabled={admin.superAdmin && !isSuperAdmin}
                                                >
                                                    {admin.isActive ? "Désactiver" : "Activer"}
                                                </button>
                                            )}

                                            {/* Bouton pour gérer les permissions */}
                                            {isSuperAdmin && !admin.superAdmin && (
                                                <button
                                                    className="permissions-btn"
                                                    onClick={() => handleOpenPermissions(admin)}
                                                >
                                                    Permissions
                                                </button>
                                            )}

                                            {/* Bouton pour supprimer */}
                                            {isSuperAdmin && admin.id !== user.id && !admin.superAdmin && (
                                                <button
                                                    className="delete-btn"
                                                    onClick={() => handleConfirmDelete(admin)}
                                                >
                                                    Supprimer
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                )}
            </div>

            {canManageUsers && (
                <div className="add-user-section">
                    <h3>Ajouter un nouvel administrateur</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="username">Nom d'utilisateur:</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={newUser.username}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Mot de passe:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={newUser.password}
                                onChange={handleInputChange}
                                minLength="8"
                                required
                            />
                        </div>

                        {formError && <p className="error-message">{formError}</p>}

                        <button
                            type="submit"
                            className="submit-button"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Ajout en cours..." : "Ajouter l'utilisateur"}
                        </button>
                    </form>
                </div>
            )}

            {/* Modal de gestion des permissions */}
            {showPermissionsForm && selectedUser && (
                <div className="modal-backdrop">
                    <div className="modal">
                        <div className="modal-header">
                            <h3>Gérer les permissions de {selectedUser.username}</h3>
                            <button
                                className="close-button"
                                onClick={() => setShowPermissionsForm(false)}
                            >
                                ×
                            </button>
                        </div>

                        <form onSubmit={handleSubmitPermissions}>
                            <div className="form-group">
                                <div className="checkbox-group">
                                    <input
                                        type="checkbox"
                                        id="canManageUsers"
                                        name="canManageUsers"
                                        checked={permissionsData.canManageUsers}
                                        onChange={handlePermissionsChange}
                                    />
                                    <label htmlFor="canManageUsers">Peut gérer les utilisateurs</label>
                                </div>
                            </div>

                            {formError && <p className="error-message">{formError}</p>}

                            <button
                                type="submit"
                                className="submit-button"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Enregistrement..." : "Enregistrer les modifications"}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal de confirmation de suppression */}
            {showDeleteConfirmation && userToDelete && (
                <div className="modal-backdrop">
                    <div className="modal">
                        <div className="modal-header">
                            <h3>Confirmer la suppression</h3>
                            <button
                                className="close-button"
                                onClick={() => {
                                    setShowDeleteConfirmation(false);
                                    setUserToDelete(null);
                                }}
                            >
                                ×
                            </button>
                        </div>

                        <div className="modal-body">
                            <p>Êtes-vous sûr de vouloir supprimer l'utilisateur <strong>{userToDelete.username}</strong> ?</p>
                            <p>Cette action est irréversible.</p>
                        </div>

                        <div className="modal-actions">
                            <button
                                className="cancel-button"
                                onClick={() => {
                                    setShowDeleteConfirmation(false);
                                    setUserToDelete(null);
                                }}
                            >
                                Annuler
                            </button>
                            <button
                                className="confirm-button"
                                onClick={handleDelete}
                            >
                                Confirmer la suppression
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Users;
