import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavItems3 from "../NavItems3";
import NavItems2 from "../NavItems2";
import "./MeasuringForm.css";

function MeasuringForm(props) {
  const {
    ellipse116,
    x1200PxLogo_Icam__20081,
    criteriaMeasurementForm,
    environnementCriteria1,
    environnementCriteria2,
    x4LeadTimeCriteria,
    x2SocialCriteria,
    x5CostCriteria,
    x3ModernizationCriteria,
    x6QualityCriteria,
    navItems3Props,
  } = props;

  // État pour suivre le statut de complétion de chaque section
  const [completionStatus, setCompletionStatus] = useState({
    environmental: false,
    social: false,
    modernization: false,
    leadTime: false,
    cost: false,
    quality: false,
    clientConsommateur: false
  });

  // Simuler la récupération des statuts depuis une API ou localStorage
  useEffect(() => {
    // Dans un cas réel, vous récupéreriez ces données depuis une API ou localStorage
    // Pour l'exemple, nous allons simuler des données aléatoires
    const fetchStatusData = () => {
      // Exemple de données de statut (à remplacer par la vraie logique)
      const storedStatus = localStorage.getItem('criteriaCompletionStatus');
      
      if (storedStatus) {
        setCompletionStatus(JSON.parse(storedStatus));
      }
    };
    
    fetchStatusData();
  }, []);

  // Sauvegarder le statut dans localStorage quand il change
  useEffect(() => {
    localStorage.setItem('criteriaCompletionStatus', JSON.stringify(completionStatus));
  }, [completionStatus]);

  // Définir les critères avec leurs liens et identifiants de statut
  const criteria = [
    { name: environnementCriteria1 || "Environment Criteria", path: "/environmental-1", icon: "🌿", statusKey: "environmental" },
    { name: x2SocialCriteria || "Social Criteria", path: "/social-1", icon: "👥", statusKey: "social" },
    { name: x3ModernizationCriteria || "Modernization Criteria", path: "/modernization-1", icon: "🔄", statusKey: "modernization" },
    { name: x4LeadTimeCriteria || "Lead Time Criteria", path: "/lead-time-1", icon: "⏱️", statusKey: "leadTime" },
    { name: x5CostCriteria || "Cost Criteria", path: "/cost-1", icon: "💰", statusKey: "cost" },
    { name: x6QualityCriteria || "Quality Criteria", path: "/quality-1", icon: "✅", statusKey: "quality" },
    { name: "Client Consommateur", path: "/client-consommateur-1", icon: "👨‍👩‍👧‍👦", statusKey: "clientConsommateur" },
  ];

  // Fonction pour gérer la soumission du formulaire
  const submitForm = () => {
    // Vérifiez si des critères ont été évalués
    const allCompleted = Object.values(completionStatus).every(status => status === true);
    
    if (allCompleted) {
      alert("Formulaire soumis avec succès !");
      // Redirection vers le premier modèle d'analyse
      window.location.href = "/functional-view-1";
    } else {
      alert("Veuillez compléter toutes les sections avant de soumettre le formulaire.");
    }
  };

  // Fonction pour mettre à jour le statut d'une section (à utiliser lorsqu'une section est complétée)
  const updateSectionStatus = (statusKey, isCompleted) => {
    setCompletionStatus(prevStatus => ({
      ...prevStatus,
      [statusKey]: isCompleted
    }));
  };

  return (
    <div className="measuring-form-container">
      <div className="measuring-form-header">
        <Link to="/home">
          <img
            className="logo-icam"
            src={x1200PxLogo_Icam__20081}
            alt="ICAM Logo"
          />
        </Link>
        <div className="nav-container">
          <NavItems3
            className={navItems3Props.className}
            frame1172Props={navItems3Props.frame1172Props}
            frame1162Props={navItems3Props.frame1162Props}
            frame1132Props={navItems3Props.frame1132Props}
          />
          <NavItems2 />
        </div>
      </div>

      <div className="measuring-form-content">
        <h1 className="measuring-form-title">
          {criteriaMeasurementForm || "CRITERIA MEASUREMENT FORM"}
        </h1>
        
        <p className="measuring-form-description">
          Veuillez sélectionner un critère à évaluer parmi les options ci-dessous.
        </p>

        <div className="criteria-grid">
          {criteria.map((criterion, index) => (
            <Link to={criterion.path} key={index} className={`criterion-card ${completionStatus[criterion.statusKey] ? 'completed' : 'incomplete'}`}>
              <div className="criterion-icon">{criterion.icon}</div>
              <h3 className="criterion-name">{criterion.name}</h3>
              <div className="status-indicator">
                <span className="status-dot"></span>
                <span className="status-text">
                  {completionStatus[criterion.statusKey] ? "Complété" : "À compléter"}
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="form-actions">
          <Link to="/acquisition" className="btn-secondary">Retour aux informations de l'entreprise</Link>
          <button onClick={submitForm} className="btn-primary">Soumettre et passer aux modèles d'analyse</button>
        </div>
      </div>
    </div>
  );
}

export default MeasuringForm;
