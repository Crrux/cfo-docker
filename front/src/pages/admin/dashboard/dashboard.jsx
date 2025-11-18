import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { authService } from '../../../services/authService';

const Dashboard = () => {
  const { user, logout, changePassword } = useAuth();
  const navigate = useNavigate();

  // Password states
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  // Planning states
  const [showPlanningModal, setShowPlanningModal] = useState(false);
  const [planningMessage, setPlanningMessage] = useState({ type: '', text: '' });
  const [planningLoading, setPlanningLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [currentPlanningImage, setCurrentPlanningImage] = useState(null);
  const [planningHistory, setPlanningHistory] = useState([]);

  useEffect(() => {
    void loadCurrentPlanningImage();
  }, []);

  const loadCurrentPlanningImage = async () => {
    try {
      const data = await authService.getCurrentPlanningImage();
      setCurrentPlanningImage(data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Erreur lors du chargement de l\'image du planning:', error);
    }
  };

  const loadPlanningHistory = async () => {
    try {
      const data = await authService.getPlanningImageHistory();
      setPlanningHistory(data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Erreur lors du chargement de l\'historique:', error);
    }
  };

  const compressImage = (dataUrl, callback) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      // Redimensionner si l'image est trop grande (max 1920px de largeur)
      const maxWidth = 1920;
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      // Convertir en JPEG avec compression (qualité 0.8)
      const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.8);
      callback(compressedDataUrl);
    };
    img.src = dataUrl;
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Vérifier le type de fichier
    if (!file.type.startsWith('image/')) {
      setPlanningMessage({ type: 'error', text: 'Veuillez sélectionner une image' });
      return;
    }

    // Vérifier la taille (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setPlanningMessage({ type: 'error', text: 'L\'image doit faire moins de 10 Mo' });
      return;
    }

    setSelectedFile(file);

    // Créer l'aperçu avec compression
    const reader = new FileReader();
    reader.onloadend = () => {
      compressImage(reader.result, (compressedDataUrl) => {
        setPreviewUrl(compressedDataUrl);
      });
    };
    reader.readAsDataURL(file);
  };

  const handleUploadPlanning = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setPlanningMessage({ type: 'error', text: 'Veuillez sélectionner une image' });
      return;
    }

    setPlanningLoading(true);
    setPlanningMessage({ type: '', text: '' });

    try {
      const reader = new FileReader();
      reader.onloadend = () => {
        compressImage(reader.result, async (compressedDataUrl) => {
          try {
            // Utiliser l'image compressée
            await authService.updatePlanningImage(
              compressedDataUrl,
              selectedFile.name,
              'image/jpeg' // Format après compression
            );

            setPlanningMessage({ type: 'success', text: 'Image du planning mise à jour avec succès !' });
            setSelectedFile(null);
            setPreviewUrl(null);
            await loadCurrentPlanningImage();

            setTimeout(() => {
              setShowPlanningModal(false);
              setPlanningMessage({ type: '', text: '' });
            }, 2000);
          } catch (error) {
            setPlanningMessage({
              type: 'error',
              text: error.response?.data?.message || 'Erreur lors de la mise à jour'
            });
          } finally {
            setPlanningLoading(false);
          }
        });
      };
      reader.readAsDataURL(selectedFile);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Erreur:', error);
      setPlanningMessage({ type: 'error', text: 'Erreur lors de la lecture du fichier' });
      setPlanningLoading(false);
    }
  };

  const handleOpenPlanningModal = async () => {
    setShowPlanningModal(true);
    await loadPlanningHistory();
  };

  const handleRestorePlanning = async (id) => {
    if (!window.confirm('Voulez-vous vraiment restaurer cette image ?')) return;

    try {
      await authService.restorePlanningImage(id);
      setPlanningMessage({ type: 'success', text: 'Image restaurée avec succès !' });
      await loadCurrentPlanningImage();
      await loadPlanningHistory();
    } catch (error) {
      setPlanningMessage({
        type: 'error',
        text: error.response?.data?.message || 'Erreur lors de la restauration'
      });
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'Les mots de passe ne correspondent pas' });
      return;
    }

    if (newPassword.length < 8) {
      setMessage({ type: 'error', text: 'Le mot de passe doit contenir au moins 8 caractères' });
      return;
    }

    setLoading(true);

    const result = await changePassword(currentPassword, newPassword);

    if (result.success) {
      setMessage({ type: 'success', text: result.message });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => {
        setShowPasswordModal(false);
        setMessage({ type: '', text: '' });
      }, 2000);
    } else {
      setMessage({ type: 'error', text: result.error });
    }

    setLoading(false);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Tableau de bord Admin</h1>
        <button onClick={handleLogout} className="logout-btn">
          Déconnexion
        </button>
      </div>

      <div className="dashboard-content">


        <div className="admin-actions-card">
          <h2>Gestion du Planning</h2>
          {currentPlanningImage ? (
            <div className="current-planning-info">
              <p><strong>Image actuelle:</strong> {currentPlanningImage.fileName}</p>
              <p><strong>Dernière mise à jour:</strong> {new Date(currentPlanningImage.updatedAt).toLocaleDateString('fr-FR')}</p>
              <div className="planning-preview-small">
                <img
                  src={currentPlanningImage.imageData}
                  alt="Planning actuel"
                />
              </div>
            </div>
          ) : (
            <p>Aucune image de planning configurée</p>
          )}
          <button
            onClick={handleOpenPlanningModal}
            className="change-password-btn"
          >
            Mettre à jour le planning
          </button>
        </div>
          <div className="user-info-card">
              <h2>Informations du profil</h2>
              <div className="info-row">
                  <span className="info-label">Nom d&apos;utilisateur:</span>
                  <span className="info-value">{user?.username}</span>
              </div>
              <div className="info-row">
                  <span className="info-label">Email:</span>
                  <span className="info-value">{user?.email}</span>
              </div>
              <button
                  onClick={() => setShowPasswordModal(true)}
                  className="change-password-btn"
              >
                  Changer le mot de passe
              </button>
          </div>
      </div>



      {showPasswordModal && (
        <div className="modal-overlay" onClick={() => setShowPasswordModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Changer le mot de passe</h2>
              <button
                className="close-btn"
                onClick={() => setShowPasswordModal(false)}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleChangePassword}>
              <div className="form-group">
                <label htmlFor="currentPassword">Mot de passe actuel</label>
                <input
                  type="password"
                  id="currentPassword"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="newPassword">Nouveau mot de passe</label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  disabled={loading}
                  minLength={8}
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={loading}
                  minLength={8}
                />
              </div>

              {message.text && (
                <div className={`message ${message.type}`}>
                  {message.text}
                </div>
              )}

              <div className="modal-actions">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  disabled={loading}
                  className="cancel-btn"
                >
                  Annuler
                </button>
                <button type="submit" disabled={loading} className="submit-btn">
                  {loading ? 'Modification...' : 'Modifier'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showPlanningModal && (
        <div className="modal-overlay" onClick={() => setShowPlanningModal(false)}>
          <div className="modal-content planning-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Mettre à jour l&apos;image du planning</h2>
              <button
                className="close-btn"
                onClick={() => setShowPlanningModal(false)}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleUploadPlanning}>
              <div className="form-group">
                <label htmlFor="planningFile">Sélectionner une nouvelle image</label>
                <input
                  type="file"
                  id="planningFile"
                  accept="image/*"
                  onChange={handleFileSelect}
                  disabled={planningLoading}
                />
                <p className="help-text">Format accepté: JPG, PNG, WEBP (max 10 Mo)</p>
                <p className="help-text">L&apos;image sera automatiquement compressée et optimisée</p>
              </div>

              {previewUrl && (
                <div className="preview-container">
                  <h3>Aperçu</h3>
                  <img src={previewUrl} alt="Aperçu" className="preview-image" />
                </div>
              )}

              {planningMessage.text && (
                <div className={`message ${planningMessage.type}`}>
                  {planningMessage.text}
                </div>
              )}

              <div className="modal-actions">
                <button
                  type="button"
                  onClick={() => {
                    setShowPlanningModal(false);
                    setSelectedFile(null);
                    setPreviewUrl(null);
                    setPlanningMessage({ type: '', text: '' });
                  }}
                  disabled={planningLoading}
                  className="cancel-btn"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={planningLoading || !selectedFile}
                  className="submit-btn"
                >
                  {planningLoading ? 'Upload...' : 'Mettre à jour'}
                </button>
              </div>
            </form>

            {planningHistory.length > 0 && (
              <div className="planning-history">
                <h3>Historique des images</h3>
                <div className="history-list">
                  {planningHistory.map((item) => (
                    <div key={item.id} className={`history-item ${item.isActive ? 'active' : ''}`}>
                      <div className="history-info">
                        <p className="history-filename">{item.fileName}</p>
                        <p className="history-date">
                          {new Date(item.createdAt).toLocaleDateString('fr-FR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                      <div className="history-actions">
                        {item.isActive ? (
                          <span className="active-badge">Actuel</span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleRestorePlanning(item.id)}
                            className="restore-btn"
                          >
                            Restaurer
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;


