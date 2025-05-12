import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./styles.css";

const CaseDetails = () => {
  const { id } = useParams();
  const [caseData, setCaseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCaseDetails = async () => {
      try {
        setLoading(true);
        // Dans votre système, le token est en fait le nom d'utilisateur
        const username = localStorage.getItem("username");
        
        if (!username) {
          throw new Error("Non authentifié - Nom d'utilisateur manquant");
        }
        
        const apiUrl = `${window.env?.API_URL || ''}/api/case-details/${id}`;
        console.log("Nom d'utilisateur utilisé:", username);
        console.log("URL API:", apiUrl);
        
        const response = await fetch(apiUrl, {
          headers: {
            "Authorization": `Bearer ${username}`,
            "Content-Type": "application/json"
          }
        });

        console.log("Statut de la réponse:", response.status);
        
        if (!response.ok) {
          const errorData = await response.json();
          console.log("Données d'erreur:", errorData);
          throw new Error(errorData.message || "Erreur lors du chargement des détails du cas");
        }

        const data = await response.json();
        console.log("Données reçues:", data);
        
        if (data.found) {
          setCaseData(data.case);
        } else {
          throw new Error("Cas non trouvé");
        }
      } catch (err) {
        console.error("Erreur lors du chargement des détails:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCaseDetails();
    }
  }, [id]);

  const formatDate = (timestamp) => {
    if (!timestamp) return "Date inconnue";
    const date = new Date(timestamp);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="case-details-container loading">
        <div className="loader"></div>
        <p>Chargement des détails...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="case-details-container error">
        <h2>Erreur</h2>
        <p>{error}</p>
        <Link to="/existing-case" className="back-button">Retour à la liste des cas</Link>
      </div>
    );
  }

  if (!caseData) {
    return (
      <div className="case-details-container error">
        <h2>Cas non trouvé</h2>
        <p>Les détails de ce cas ne sont pas disponibles.</p>
        <Link to="/existing-case" className="back-button">Retour à la liste des cas</Link>
      </div>
    );
  }

  return (
    <div className="case-details-container">
      <div className="case-details-header">
        <h1>Détails du cas</h1>
        <Link to="/existing-case" className="back-button">Retour à la liste des cas</Link>
      </div>
      
      <div className="case-details-card">
        <h2>{caseData.company_name || "Entreprise sans nom"}</h2>
        
        <div className="case-info-section">
          <h3>Informations générales</h3>
          <div className="info-grid">
            <div className="info-item">
              <label>Date de création:</label>
              <span>{formatDate(caseData.timestamp || caseData.date_created)}</span>
            </div>
            <div className="info-item">
              <label>Secteur d'activité:</label>
              <span>{caseData.activity_sector || "Non spécifié"}</span>
            </div>
            <div className="info-item">
              <label>Taille de l'entreprise:</label>
              <span>{caseData.company_size || "Non spécifié"} employés</span>
            </div>
          </div>
        </div>
        
        {caseData.scores && (
          <div className="case-scores-section">
            <h3>Scores d'évaluation</h3>
            <div className="scores-grid">
              {Object.entries(caseData.scores).map(([category, score]) => {
                if (category !== "_id" && typeof score === 'object' && score.Total !== undefined) {
                  return (
                    <div className="score-item" key={category}>
                      <label>{category}:</label>
                      <span>{score.Total}/100</span>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        )}
        
        <div className="case-actions">
          <Link to={`/analysis?caseId=${id}`} className="action-button">
            Voir l'analyse complète
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CaseDetails; 