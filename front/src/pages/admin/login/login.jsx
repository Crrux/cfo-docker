import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Rediriger si déjà connecté
  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || '/admin/dashboard';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(username, password, rememberMe);

    if (result.success) {
      const from = location.state?.from?.pathname || '/admin/dashboard';
      navigate(from, { replace: true });
    } else {
      setError(result.error);
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Connexion Admin</h1>
        <p className="login-subtitle">Tableau de bord CrossFit Obernai</p>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Nom d&apos;utilisateur</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={loading}
              autoComplete="username"
              placeholder="Entrez votre nom d'utilisateur"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              autoComplete="current-password"
              placeholder="Entrez votre mot de passe"
              minLength={8}
            />
          </div>

          <div className="form-group checkbox-group">
            <label htmlFor="rememberMe" className="checkbox-label">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={loading}
              />
              <span>Se souvenir de moi</span>
            </label>
          </div>

          <button type="submit" disabled={loading} className="login-btn">
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <div className="login-info">
          <p>
            <strong>⚠️ Première connexion ?</strong>
          </p>
          <p>
            Identifiant par défaut : <code>admin</code>
          </p>
          <p>
            Mot de passe par défaut : <code>admin123</code>
          </p>
          <p className="warning-text">
            Pensez à changer votre mot de passe dès la première connexion !
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

