import React, { useState, useEffect } from 'react';
import './Login.css';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import logoIcam from '../../static/img/1200px-logo-icam---2008-1-43@2x.png';
import { useAuth } from '../../context/AuthContext';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const history = useHistory();
  const { login, isAuthenticated } = useAuth();

  // Rediriger si déjà authentifié
  useEffect(() => {
    console.log("Login - Vérification de l'état d'authentification:", isAuthenticated);
    if (isAuthenticated) {
      console.log("Déjà authentifié, redirection vers /home");
      history.push('/home');
    }
  }, [isAuthenticated, history]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (!window.env || !window.env.API_URL) {
        throw new Error('API URL is not defined');
      }

      console.log("Tentative de connexion avec:", { username });
      
      const response = await axios.post(
        `${window.env.API_URL}/login`,
        { username, password },
        {
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
          },
        }
      );

      console.log('Réponse du serveur:', response.data);
      
      // Récupérer le statut d'administrateur
      const isAdmin = response.data.is_admin || false;
      
      // Mettre à jour localStorage directement avant d'appeler login()
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('isAdmin', isAdmin.toString());
      // Stocker le nom d'utilisateur pour l'authentification
      localStorage.setItem('username', username);
      
      // Appel à login pour mettre à jour le contexte
      login(isAdmin);
      console.log("Connexion réussie, état d'authentification mis à jour");
      
      // Redirection vers /home ou /admin pour les administrateurs
      setTimeout(() => {
        if (isAdmin) {
          window.location.href = '/admin';
        } else {
          window.location.href = '/home';
        }
        console.log(`Redirection vers ${isAdmin ? '/admin' : '/home'}`);
      }, 100);
      
    } catch (error) {
      console.error('Erreur de connexion:', error);

      if (error.response) {
        setError(
          `Error ${error.response.status}: ${
            error.response.data.detail || 'Invalid username or password'
          }`
        );
      } else if (error.request) {
        setError(
          'Server not responding. Check your connection or if the server is running.'
        );
      } else {
        setError(error.message || 'An error occurred during login');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToRegister = () => {
    history.push('/inscription');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-left">
          <div className="login-logo-container">
            <img
              src={logoIcam}
              alt="ICAM Logo"
              className="login-logo"
            />
          </div>
          <h2 className="login-welcome">
            Welcome to the Supply Chain Platform
          </h2>
          <p className="login-description">
            Log in to access your personal space and manage your projects.
          </p>
        </div>
        <div className="login-right">
          <div className="login-form-container">
            <h1 className="login-title">Login</h1>
            {error && <div className="login-error">{error}</div>}
            <form onSubmit={handleLogin} className="login-form">
              <div className="login-input-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="Enter your username"
                />
              </div>
              <div className="login-input-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                />
              </div>
              <button type="submit" className="login-button" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </form>
            <div className="login-footer">
              <p>Don't have an account?</p>
              <button
                type="button"
                onClick={navigateToRegister}
                className="register-link"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;