import React, { useState } from 'react';
import axios from 'axios';
import './UserDetails.css';

function UserDetails({ user, onClose, onUserUpdated }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isAdmin, setIsAdmin] = useState(user.is_admin);

  const handleToggleAdmin = async () => {
    setIsLoading(true);
    setError('');
    try {
      await axios.put(
        `${window.env.API_URL}/admin/user/${user.username}/admin-status`,
        { is_admin: !isAdmin },
        {
          headers: {
            'Authorization': 'Bearer admin',
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
          }
        }
      );
      
      setIsAdmin(!isAdmin);
      if (onUserUpdated) {
        onUserUpdated();
      }
    } catch (error) {
      console.error('Erreur lors de la modification du statut admin:', error);
      setError('Erreur lors de la modification du statut admin. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="user-details-container">
      <div className="user-details-header">
        <h2>Détails de l'utilisateur</h2>
        <button className="user-details-close-btn" onClick={onClose}>×</button>
      </div>
      
      {error && <div className="user-details-error">{error}</div>}
      
      <div className="user-details-content">
        <div className="user-details-field">
          <span className="user-details-label">Nom d'utilisateur:</span>
          <span className="user-details-value">{user.username}</span>
        </div>
        
        <div className="user-details-field">
          <span className="user-details-label">Statut Admin:</span>
          <span className="user-details-value">
            {isAdmin ? 'Administrateur' : 'Utilisateur standard'}
          </span>
        </div>
        
        <button 
          className={`user-details-btn ${isAdmin ? 'user-details-btn-warning' : 'user-details-btn-primary'}`}
          onClick={handleToggleAdmin}
          disabled={isLoading}
        >
          {isLoading ? 'Chargement...' : (isAdmin ? 'Révoquer les droits admin' : 'Accorder les droits admin')}
        </button>
      </div>
    </div>
  );
}

export default UserDetails; 