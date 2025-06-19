import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../services/api";
import { useAuth } from "../../../context/AuthContext";

const ContactsPage = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedContact, setSelectedContact] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        document.title = "Formulaires de Contact | Admin | CrossFit Obernai";
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            setLoading(true);
            const response = await api.get("/contact");
            setContacts(response.data);
            setError(null);
        } catch (err) {
            console.error("Erreur lors de la récupération des contacts:", err);
            setError("Impossible de charger les formulaires de contact. Veuillez réessayer plus tard.");
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    const handleViewDetails = (contact) => {
        setSelectedContact(contact);
    };

    const closeModal = () => {
        setSelectedContact(null);
    };

    return (
        <div className="contacts-admin">
            <div className="contacts-header">
                <h1>Formulaires de Contact</h1>
                <Link to="/admin/dashboard" className="back-button">
                    Retour au Dashboard
                </Link>
            </div>

            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}

            {loading ? (
                <div className="loading">
                    <div className="spinner"></div>
                </div>
            ) : (
                <table className="contacts-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Nom</th>
                            <th>Prénom</th>
                            <th>Email</th>
                            <th>Téléphone</th>
                            <th>Référence</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.length === 0 ? (
                            <tr>
                                <td colSpan="7" style={{ textAlign: "center" }}>
                                    Aucun formulaire de contact trouvé
                                </td>
                            </tr>
                        ) : (
                            contacts.map((contact) => (
                                <tr key={contact.id}>
                                    <td>{formatDate(contact.createdAt)}</td>
                                    <td>{contact.name}</td>
                                    <td>{contact.firstname}</td>
                                    <td>{contact.email}</td>
                                    <td>{contact.tel}</td>
                                    <td>{contact.reference}</td>
                                    <td>
                                        <span
                                            className="contact-details"
                                            onClick={() => handleViewDetails(contact)}
                                        >
                                            Voir détails
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            )}

            {selectedContact && (
                <div className="modal" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Détails du formulaire</h3>
                            <button className="close-button" onClick={closeModal}>
                                &times;
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="contact-info">
                                <h4>Informations de contact</h4>
                                <p><strong>Nom:</strong> {selectedContact.name}</p>
                                <p><strong>Prénom:</strong> {selectedContact.firstname}</p>
                                <p><strong>Email:</strong> {selectedContact.email}</p>
                                <p><strong>Téléphone:</strong> {selectedContact.tel}</p>
                                <p><strong>Date d'envoi:</strong> {formatDate(selectedContact.createdAt)}</p>
                                <p><strong>Mentions légales:</strong> {selectedContact.checkbox ? "Acceptées" : "Refusées"}</p>
                                <p><strong>Référence:</strong> {selectedContact.reference}</p>
                            </div>
                            <div className="contact-message">
                                <h4>Message</h4>
                                <p>{selectedContact.message}</p>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button onClick={closeModal}>Fermer</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContactsPage;
