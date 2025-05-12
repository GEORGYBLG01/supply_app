import React from 'react';
import './AdminAdvanced.css'; // Utiliser le nouveau fichier CSS

// Composant simple pour afficher un graphique à barres
const BarChart = ({ data, title }) => {
  // Vérifier si les données sont disponibles
  if (!data || data.length === 0) {
    return (
      <div className="bar-chart-container">
        <h4>{title}</h4>
        <div className="empty-chart-message">Aucune donnée disponible</div>
      </div>
    );
  }
  
  // Trouver la valeur maximale pour dimensionner correctement les barres
  const maxValue = Math.max(...data.map(item => item.count));
  
  return (
    <div className="bar-chart-container">
      <h4>{title}</h4>
      <div className="bar-chart">
        {data.map((item, index) => (
          <div key={index} className="bar-chart-item">
            <div className="bar-chart-label">{item.date}</div>
            <div className="bar-chart-bar-container">
              <div 
                className="bar-chart-bar" 
                style={{ 
                  width: `${(item.count / maxValue) * 100}%`,
                  minWidth: item.count > 0 ? '2%' : '0'
                }}
              ></div>
              <span className="bar-chart-value">{item.count}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Composant pour afficher un graphique circulaire simple
const PieChart = ({ data, title }) => {
  // Vérifier si les données sont disponibles et valides
  if (!data || data.length === 0 || data.every(item => item.value === 0)) {
    return (
      <div className="pie-chart-container">
        <h4>{title}</h4>
        <div className="empty-chart-message">Aucune donnée disponible</div>
      </div>
    );
  }
  
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let startAngle = 0;
  
  return (
    <div className="pie-chart-container">
      <h4>{title}</h4>
      <div className="pie-chart-wrapper">
        <div className="pie-chart">
          {data.map((item, index) => {
            const angle = (item.value / total) * 360;
            const styles = {
              '--start-angle': `${startAngle}deg`,
              '--end-angle': `${startAngle + angle}deg`,
              '--color': item.color
            };
            startAngle += angle;
            return (
              <div key={index} className="pie-slice" style={styles}></div>
            );
          })}
        </div>
        <div className="pie-chart-legend">
          {data.map((item, index) => (
            <div key={index} className="legend-item">
              <div className="legend-color" style={{ backgroundColor: item.color }}></div>
              <div className="legend-label">{item.label}</div>
              <div className="legend-value">{item.value} ({Math.round((item.value / total) * 100)}%)</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

function AdvancedUserStats({ stats }) {
  // Vérifier si les statistiques sont disponibles
  if (!stats) {
    return <div className="advanced-stats-container">Chargement des statistiques...</div>;
  }
  
  // Données pour le graphique circulaire des statuts utilisateur
  const userStatusData = [
    { label: 'Actifs', value: stats.active_users || 0, color: '#4CAF50' },
    { label: 'Inactifs', value: stats.inactive_users || 0, color: '#F44336' },
  ];
  
  // Données pour le graphique circulaire des rôles utilisateur
  const userRolesData = [
    { label: 'Admins', value: stats.admin_users || 0, color: '#2196F3' },
    { label: 'Utilisateurs', value: (stats.total_users || 0) - (stats.admin_users || 0), color: '#FF9800' },
  ];
  
  // Vérifier si les données de top_users sont disponibles
  const hasTopUsers = stats.top_users && stats.top_users.length > 0;
  
  return (
    <div className="advanced-stats-container">
      <h2>Statistiques des Utilisateurs</h2>
      
      <div className="stats-overview">
        <div className="stats-card">
          <h3>Total des utilisateurs</h3>
          <p className="stats-value">{stats.total_users || 0}</p>
        </div>
        <div className="stats-card">
          <h3>Utilisateurs actifs</h3>
          <p className="stats-value">{stats.active_users || 0}</p>
        </div>
        <div className="stats-card">
          <h3>Utilisateurs inactifs</h3>
          <p className="stats-value">{stats.inactive_users || 0}</p>
        </div>
        <div className="stats-card">
          <h3>Administrateurs</h3>
          <p className="stats-value">{stats.admin_users || 0}</p>
        </div>
      </div>
      
      <div className="charts-container">
        <div className="chart-row">
          <div className="chart-column">
            <PieChart 
              data={userStatusData} 
              title="Répartition par statut" 
            />
          </div>
          <div className="chart-column">
            <PieChart 
              data={userRolesData} 
              title="Répartition par rôle" 
            />
          </div>
        </div>
        
        <div className="chart-row full-width">
          <BarChart 
            data={stats.users_by_month || []} 
            title="Nouveaux utilisateurs par mois" 
          />
        </div>
      </div>
      
      <div className="top-users-section">
        <h3>Utilisateurs les plus actifs</h3>
        {hasTopUsers ? (
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Rang</th>
                  <th>Nom d'utilisateur</th>
                  <th>Nombre de connexions</th>
                </tr>
              </thead>
              <tbody>
                {stats.top_users.map((user, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{user.username}</td>
                    <td>{user.login_count || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-chart-message">Aucun utilisateur actif trouvé</div>
        )}
      </div>
    </div>
  );
}

export default AdvancedUserStats; 