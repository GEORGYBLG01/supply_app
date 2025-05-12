import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import './Admin.css';
import UserDetails from './UserDetails';
import AdvancedUserStats from './AdvancedUserStats';
import UserManagement from './UserManagement';

function Admin() {
  const [users, setUsers] = useState([]);
  const [statistics, setStatistics] = useState({
    user_count: 0,
    enterprise_count: 0
  });
  const [userStats, setUserStats] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { isAdmin, isAuthenticated, logout } = useAuth();
  const history = useHistory();

  useEffect(() => {
    // Rediriger si non authentifié ou non admin
    if (!isAuthenticated) {
      history.push('/login');
      return;
    }

    if (!isAdmin) {
      history.push('/home');
      return;
    }

    // Charger les données
    fetchData();
  }, [isAuthenticated, isAdmin, history]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Charger les utilisateurs
      const usersResponse = await axios.get(`${window.env.API_URL}/admin/users`, {
        headers: {
          'Authorization': 'Bearer admin',
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
        }
      });
      setUsers(usersResponse.data);

      // Charger les statistiques
      const statsResponse = await axios.get(`${window.env.API_URL}/admin/statistics`, {
        headers: {
          'Authorization': 'Bearer admin',
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
        }
      });
      setStatistics(statsResponse.data);

      // Charger les statistiques utilisateur avancées
      try {
        const userStatsResponse = await axios.get(`${window.env.API_URL}/api/users/statistics`, {
          headers: {
            'Authorization': 'Bearer admin',
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
          }
        });
        setUserStats(userStatsResponse.data);
      } catch (statsError) {
        console.error('Erreur lors du chargement des statistiques avancées:', statsError);
        // Ne pas définir d'erreur générale pour permettre l'affichage des autres données
      }
      
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
      setError('Erreur lors du chargement des données. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleAdmin = async (username, currentAdminStatus) => {
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
      
      // Mettre à jour la liste des utilisateurs
      fetchData();
    } catch (error) {
      console.error('Erreur lors de la modification du statut admin:', error);
      setError('Erreur lors de la modification du statut admin. Veuillez réessayer.');
    }
  };

  const handleLogout = () => {
    logout();
    history.push('/login');
  };

  if (isLoading) {
    return <div className="admin-loading">Chargement en cours...</div>;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="admin-dashboard">
            <div className="admin-stats-container">
              <div className="admin-stat-card">
                <h3>Utilisateurs</h3>
                <p className="admin-stat-value">{statistics.user_count}</p>
              </div>
              <div className="admin-stat-card">
                <h3>Entreprises</h3>
                <p className="admin-stat-value">{statistics.enterprise_count}</p>
              </div>
              {userStats && (
                <>
                  <div className="admin-stat-card">
                    <h3>Utilisateurs actifs</h3>
                    <p className="admin-stat-value">{userStats.active_users}</p>
                  </div>
                  <div className="admin-stat-card">
                    <h3>Utilisateurs inactifs</h3>
                    <p className="admin-stat-value">{userStats.inactive_users}</p>
                  </div>
                </>
              )}
            </div>
            
            {userStats && (
              <section className="admin-section">
                <h2>Utilisateurs les plus actifs</h2>
                <div className="admin-table-container">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Nom d'utilisateur</th>
                        <th>Nombre de connexions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userStats.top_users.map((user, index) => (
                        <tr key={index}>
                          <td>{user.username}</td>
                          <td>{user.login_count || 0}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}
          </div>
        );
      
      case 'userStats':
        return userStats ? <AdvancedUserStats stats={userStats} /> : <div>Chargement des statistiques...</div>;
      
      case 'userManagement':
        return <UserManagement users={users} onUserUpdated={fetchData} />;
      
      default:
        return <div>Sélectionnez un onglet</div>;
    }
  };

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>Panneau d'Administration</h1>
        <button className="admin-logout-btn" onClick={handleLogout}>
          Déconnexion
        </button>
      </header>

      {error && <div className="admin-error">{error}</div>}

      <div className="admin-tabs">
        <button 
          className={`admin-tab ${activeTab === 'dashboard' ? 'admin-tab-active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          Tableau de bord
        </button>
        <button 
          className={`admin-tab ${activeTab === 'userStats' ? 'admin-tab-active' : ''}`}
          onClick={() => setActiveTab('userStats')}
        >
          Statistiques utilisateurs
        </button>
        <button 
          className={`admin-tab ${activeTab === 'userManagement' ? 'admin-tab-active' : ''}`}
          onClick={() => setActiveTab('userManagement')}
        >
          Gestion des utilisateurs
        </button>
      </div>

      <div className="admin-content">
        {renderTabContent()}
      </div>
    </div>
  );
}

export default Admin; 