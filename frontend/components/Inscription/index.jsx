import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./Inscription.css";
import logoIcam from '../../static/img/1200px-logo-icam---2008-1-43@2x.png';
import { useAuth } from "../../context/AuthContext";

function Inscription() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const history = useHistory();
  const { login } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must contain at least 6 characters");
      return;
    }

    setIsLoading(true);

    try {
      // Check if API_URL is defined
      if (!window.env || !window.env.API_URL) {
        throw new Error("API URL is not defined");
      }

      console.log("Tentative d'inscription avec:", { username });
      
      // Send data to server
      const response = await axios.post(
        window.env.API_URL + "/register", 
        {
          username: username,
          password: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
          },
        }
      );
      
      console.log('Réponse du serveur:', response.data);
      
      // Mettre à jour localStorage directement avant d'appeler login()
      localStorage.setItem('isAuthenticated', 'true');
      
      // Mettre à jour l'état d'authentification après inscription réussie
      login();
      console.log("Inscription réussie, état d'authentification mis à jour");
      
      // Rediriger vers la page d'accueil avec rechargement complet
      setTimeout(() => {
        window.location.href = "/home";
        console.log("Redirection vers /home");
      }, 100);
      
    } catch (error) {
      console.error('Erreur d\'inscription:', error);
      
      if (error.response && error.response.status === 400) {
        setError("This username already exists");
      } else if (error.response) {
        setError(`Error ${error.response.status}: ${error.response.data.detail || 'Registration error'}`);
      } else if (error.request) {
        setError("Server not responding. Check your connection or if the server is running.");
      } else {
        setError(error.message || "Registration error. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToLogin = () => {
    history.push("/");
  };

  return (
    <div className="inscription-container">
      <div className="inscription-card">
        <div className="inscription-left">
          <div className="inscription-form-container">
            <h1 className="inscription-title">Create an Account</h1>
            {error && <div className="inscription-error">{error}</div>}
            <form onSubmit={handleRegister} className="inscription-form">
              <div className="inscription-input-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="Choose a username"
                />
              </div>
              <div className="inscription-input-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Create a password"
                />
              </div>
              <div className="inscription-input-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Confirm your password"
                />
              </div>
              <button
                type="submit"
                className="inscription-button"
                disabled={isLoading}
              >
                {isLoading ? "Registering..." : "Register"}
              </button>
            </form>
            <div className="inscription-footer">
              <p>Already have an account?</p>
              <button
                type="button"
                onClick={navigateToLogin}
                className="login-link"
              >
                Login
              </button>
            </div>
          </div>
        </div>
        <div className="inscription-right">
          <div className="inscription-logo-container">
            <img
              src={logoIcam}
              alt="ICAM Logo"
              className="inscription-logo"
            />
          </div>
          <h2 className="inscription-welcome">Join the Supply Chain Platform</h2>
          <p className="inscription-description">
            Create your account to access all our services and manage your supply chain projects.
          </p>
          <div className="inscription-features">
            <div className="inscription-feature">
              <div className="inscription-feature-icon">✓</div>
              <div className="inscription-feature-text">Access to all analysis tools</div>
            </div>
            <div className="inscription-feature">
              <div className="inscription-feature-icon">✓</div>
              <div className="inscription-feature-text">Real-time project tracking</div>
            </div>
            <div className="inscription-feature">
              <div className="inscription-feature-icon">✓</div>
              <div className="inscription-feature-text">Collaboration with your team</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inscription;