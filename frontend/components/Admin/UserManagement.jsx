import React, { useState } from 'react';
import axios from 'axios';
import './AdminAdvanced.css'; // Utiliser le nouveau fichier CSS

function UserManagement({ users, onUserUpdated }) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [resetPasswordData, setResetPasswordData] = useState({
    username: '',
    new_password: '',
    confirm_password: ''
  });
  const [isResetting, setIsResetting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setResetPasswordData({
      username: user.username,
      new_password: '',
      confirm_password: ''
    });
    setIsResetting(false);
    setError('');
    setSuccess('');
  };

  const handleToggleActive = async (username, currentStatus) => {
    setIsLoading(true);
    setError('');
    setSuccess('');
    
    try {
      await axios.post(
        `${window.env.API_URL}/api/users/toggle-status`,
        { username, active: !currentStatus },
        {
          headers: {
            'Authorization': 'Bearer admin',
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
          }
        }
      );
      
      setSuccess(`Le statut de l'utilisateur ${username} a été mis à jour avec succès.`);
      if (onUserUpdated) {
        onUserUpdated();
      }
      
      // Si c'est l'utilisateur actuellement sélectionné, mettre à jour son statut
      if (selectedUser && selectedUser.username === username) {
        setSelectedUser({
          ...selectedUser,
          is_active: !currentStatus
        });
      }
      
    } catch (error) {
      console.error('Erreur lors de la modification du statut:', error);
      setError('Erreur lors de la modification du statut. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleAdmin = async (username, currentAdminStatus) => {
    setIsLoading(true);
    setError('');
    setSuccess('');
    
    try {
      await axios.put(
        `${window.env.API_URL}/admin/user/${username}/admin-status`, 
        { is_admin: !currentAdminStatus },
        {
          headers: {
            'Authorization': 'Bearer admin',
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
          }
        }
      );
      
      setSuccess(`Le statut administrateur de ${username} a été mis à jour avec succès.`);
      if (onUserUpdated) {
        onUserUpdated();
      }
      
      // Si c'est l'utilisateur actuellement sélectionné, mettre à jour son statut
      if (selectedUser && selectedUser.username === username) {
        setSelectedUser({
          ...selectedUser,
          is_admin: !currentAdminStatus
        });
      }
      
    } catch (error) {
      console.error('Erreur lors de la modification du statut admin:', error);
      setError('Erreur lors de la modification du statut admin. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    
    if (resetPasswordData.new_password !== resetPasswordData.confirm_password) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }
    
    if (resetPasswordData.new_password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères.');
      return;
    }
    
    setIsLoading(true);
    setError('');
    setSuccess('');
    
    try {
      await axios.post(
        `${window.env.API_URL}/api/users/reset-password`,
        {
          username: resetPasswordData.username,
          new_password: resetPasswordData.new_password
        },
        {
          headers: {
            'Authorization': 'Bearer admin',
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
          }
        }
      );
      
      setSuccess(`Le mot de passe de l'utilisateur ${resetPasswordData.username} a été réinitialisé avec succès.`);
      setResetPasswordData({
        ...resetPasswordData,
        new_password: '',
        confirm_password: ''
      });
      setIsResetting(false);
      
    } catch (error) {
      console.error('Erreur lors de la réinitialisation du mot de passe:', error);
      setError('Erreur lors de la réinitialisation du mot de passe. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserDetails = async (username) => {
    setIsLoading(true);
    setError('');
    
    try {
      const response = await axios.get(
        `${window.env.API_URL}/api/users/${username}`,
        {
          headers: {
            'Authorization': 'Bearer admin',
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
          }
        }
      );
      
      setSelectedUser(response.data);
      setResetPasswordData({
        username: response.data.username,
        new_password: '',
        confirm_password: ''
      });
      
    } catch (error) {
      console.error('Erreur lors du chargement des détails utilisateur:', error);
      setError('Erreur lors du chargement des détails utilisateur. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="user-management-container">
      <h2>Gestion des Utilisateurs</h2>
      
      {error && <div className="admin-error">{error}</div>}
      {success && <div className="admin-success">{success}</div>}
      
      <div className="user-management-layout">
        <div className="user-list-container">
          <h3>Liste des Utilisateurs</h3>
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Nom d'utilisateur</th>
                  <th>Administrateur</th>
                  <th>Statut</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index} className={selectedUser && selectedUser.username === user.username ? 'selected-row' : ''}>
                    <td>{user.username}</td>
                    <td>{user.is_admin ? 'Oui' : 'Non'}</td>
                    <td>{user.is_active !== false ? 'Actif' : 'Inactif'}</td>
                    <td>
                      <button 
                        className="admin-btn admin-btn-primary"
                        onClick={() => fetchUserDetails(user.username)}
                      >
                        Détails
                      </button>
                      <button 
                        className={`admin-btn ${user.is_admin ? 'admin-btn-warning' : 'admin-btn-success'}`}
                        onClick={() => handleToggleAdmin(user.username, user.is_admin)}
                        disabled={isLoading}
                      >
                        {user.is_admin ? 'Révoquer admin' : 'Faire admin'}
                      </button>
                      <button 
                        className={`admin-btn ${user.is_active !== false ? 'admin-btn-warning' : 'admin-btn-success'}`}
                        onClick={() => handleToggleActive(user.username, user.is_active !== false)}
                        disabled={isLoading}
                      >
                        {user.is_active !== false ? 'Désactiver' : 'Activer'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {selectedUser && (
          <div className="user-details-panel">
            <h3>Détails de l'Utilisateur</h3>
            
            <div className="user-details-content">
              <div className="user-details-field">
                <span className="user-details-label">Nom d'utilisateur:</span>
                <span className="user-details-value">{selectedUser.username}</span>
              </div>
              
              <div className="user-details-field">
                <span className="user-details-label">Statut:</span>
                <span className="user-details-value">
                  {selectedUser.is_active !== false ? 'Actif' : 'Inactif'}
                </span>
              </div>
              
              <div className="user-details-field">
                <span className="user-details-label">Rôle:</span>
                <span className="user-details-value">
                  {selectedUser.is_admin ? 'Administrateur' : 'Utilisateur standard'}
                </span>
              </div>
              
              <div className="user-details-field">
                <span className="user-details-label">Dernière connexion:</span>
                <span className="user-details-value">
                  {selectedUser.last_login_formatted || 'Jamais connecté'}
                </span>
              </div>
              
              <div className="user-details-field">
                <span className="user-details-label">Nombre de connexions:</span>
                <span className="user-details-value">
                  {selectedUser.login_count || 0}
                </span>
              </div>
              
              <div className="user-details-field">
                <span className="user-details-label">Créé le:</span>
                <span className="user-details-value">
                  {selectedUser.created_at_formatted || 'Non disponible'}
                </span>
              </div>
              
              <div className="user-details-actions">
                <button 
                  className="admin-btn admin-btn-primary"
                  onClick={() => setIsResetting(!isResetting)}
                >
                  {isResetting ? 'Annuler' : 'Réinitialiser le mot de passe'}
                </button>
              </div>
              
              {isResetting && (
                <form onSubmit={handleResetPassword} className="reset-password-form">
                  <h4>Réinitialisation du mot de passe</h4>
                  
                  <div className="form-group">
                    <label htmlFor="new_password">Nouveau mot de passe:</label>
                    <input 
                      type="password" 
                      id="new_password"
                      value={resetPasswordData.new_password}
                      onChange={(e) => setResetPasswordData({...resetPasswordData, new_password: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="confirm_password">Confirmer le mot de passe:</label>
                    <input 
                      type="password" 
                      id="confirm_password"
                      value={resetPasswordData.confirm_password}
                      onChange={(e) => setResetPasswordData({...resetPasswordData, confirm_password: e.target.value})}
                      required
                    />
                  </div>
                  
                  <button 
                    type="submit" 
                    className="admin-btn admin-btn-success"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Chargement...' : 'Confirmer la réinitialisation'}
                  </button>
                </form>
              )}
              
              {selectedUser.login_history && selectedUser.login_history.length > 0 && (
                <div className="login-history">
                  <h4>Historique des connexions</h4>
                  <ul>
                    {selectedUser.login_history_formatted?.map((date, index) => (
                      <li key={index}>{date}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserManagement; 