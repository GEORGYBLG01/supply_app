import React from "react";
import "./Frame11322.css";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Frame11322(props) {
  const { className } = props;
  const { logout } = useAuth();
  const history = useHistory();
  
  const handleLogout = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Empêcher toute propagation d'événement
    
    console.log("Bouton de déconnexion cliqué");
    
    // Forcer la suppression de l'état d'authentification dans localStorage
    localStorage.removeItem('isAuthenticated');
    localStorage.setItem('isAuthenticated', 'false');
    
    // Appeler explicitement la fonction logout du contexte d'authentification
    logout();
    
    console.log("État d'authentification mis à jour, redirection vers la page de connexion");
    
    // Rediriger vers la page de connexion avec rechargement complet
    window.location.href = '/';
  };

  return (
    <div 
      className={`frame-113-2 ${className || ""}`}
      onClick={handleLogout}
    >
      <div className="logout valign-text-middle inter-medium-rum-swizzle-18px">Logout</div>
    </div>
  );
}

export default Frame11322;