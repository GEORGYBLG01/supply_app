import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import NavItems3 from "../NavItems3";
import NavItems2 from "../NavItems2";
import "./Acquisition.css";
import { useEnterprise } from "../../context/EnterpriseContext";

// Exportation de la variable company_name pour être utilisée par d'autres composants
export let company_name = "";

// Liste des secteurs d'activités
const ACTIVITY_SECTORS = [
  "Agriculture, sylviculture et pêche",
  "Industries extractives",
  "Industrie manufacturière",
  "Production et distribution d'électricité, de gaz",
  "Production et distribution d'eau, assainissement",
  "Construction",
  "Commerce, réparation d'automobiles et de motocycles",
  "Transports et entreposage",
  "Hébergement et restauration",
  "Information et communication",
  "Activités financières et d'assurance",
  "Activités immobilières",
  "Activités spécialisées, scientifiques et techniques",
  "Activités de services administratifs et de soutien",
  "Administration publique",
  "Enseignement",
  "Santé humaine et action sociale",
  "Arts, spectacles et activités récréatives",
  "Autres activités de services",
  "Activités des ménages en tant qu'employeurs",
  "Activités extraterritoriales"
];

function Acquisition(props) {
  const {
    ellipse116,
    x1200PxLogo_Icam__20081,
    companyName,
    inputType1,
    inputPlaceholder1,
    companySize,
    inputType2,
    inputPlaceholder2,
    activitySector,
    inputType3,
    inputPlaceholder3,
    measuringForm,
    navItems3Props,
  } = props;

  const { 
    companyName: contextCompanyName, 
    setCompanyName, 
    companySize: contextCompanySize, 
    setCompanySize, 
    activitySector: contextActivitySector, 
    setActivitySector,
    saveEnterpriseData 
  } = useEnterprise();

  const [companyNameValue, setCompanyNameValue] = useState(contextCompanyName || "");
  const [companySizeValue, setCompanySizeValue] = useState(contextCompanySize || "");
  const [activitySectorValue, setActivitySectorValue] = useState(contextActivitySector || "");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const history = useHistory();

  function validateForm() {
    if (!companyNameValue.trim()) {
      setError("Le nom de l'entreprise est requis");
      return false;
    }
    
    if (!companySizeValue) {
      setError("La taille de l'entreprise est requise");
      return false;
    }
    
    if (!activitySectorValue.trim()) {
      setError("Le secteur d'activité est requis");
      return false;
    }
    
    return true;
  }

  async function updateDataFromInput() {
    // Réinitialiser les messages
    setError("");
    setSuccess("");
    
    // Valider le formulaire
    if (!validateForm()) {
      return;
    }
    
    // Mettre à jour le contexte directement au lieu des variables exportées
    setCompanyName(companyNameValue);
    setCompanySize(parseInt(companySizeValue));
    setActivitySector(activitySectorValue);

    // Mettre à jour la variable exportée
    company_name = companyNameValue;

    const data = {
      company_name: companyNameValue,
      company_size: parseInt(companySizeValue),
      activity_sector: activitySectorValue
    };

    setIsLoading(true);

    try {
      // Utiliser la fonction du contexte pour sauvegarder les données
      const result = await saveEnterpriseData(data);

      if (result.success) {
        setSuccess("Données enregistrées avec succès!");
        
        // Redirection après un court délai
        setTimeout(() => {
          history.push("/measuring-form");
        }, 1000);
      } else {
        throw new Error(result.error || "Erreur lors de la sauvegarde des données");
      }
    } catch (error) {
      console.error("Erreur d'enregistrement:", error);
      setError(error.message || "Erreur lors de la sauvegarde des données. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  }

  function navigateToHome() {
    history.push("/home");
  }

  function navigateToMeasuringForm() {
    history.push("/measuring-form");
  }

  return (
    <div className="acquisition-container">
      <div className="acquisition-header">
        <img
          onClick={navigateToHome}
          className="logo-icam"
          src={x1200PxLogo_Icam__20081}
          alt="ICAM Logo"
        />
        <div className="nav-container">
          <NavItems3
            frame1172Props={navItems3Props.frame1172Props}
            frame1162Props={navItems3Props.frame1162Props}
            frame1132Props={navItems3Props.frame1132Props}
          />
          <NavItems2 />
        </div>
      </div>

      <div className="acquisition-content">
        <h1 className="acquisition-title">Informations de l'entreprise</h1>
        
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <div className="acquisition-form">
          <div className="form-group">
            <label htmlFor="companyName">{companyName || "Nom de l'entreprise"}</label>
            <input
              id="companyName"
              className="form-input"
              name="companyName"
              placeholder={inputPlaceholder1 || "Entrez le nom de l'entreprise"}
              type="text"
              value={companyNameValue}
              onChange={(e) => setCompanyNameValue(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="companySize">{companySize || "Taille de l'entreprise"}</label>
            <input
              id="companySize"
              className="form-input"
              name="companySize"
              placeholder={inputPlaceholder2 || "Entrez le nombre d'employés"}
              type="number"
              value={companySizeValue}
              onChange={(e) => setCompanySizeValue(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="activitySector">{activitySector || "Secteur d'activité"}</label>
            <select
              id="activitySector"
              className="form-select"
              name="activitySector"
              value={activitySectorValue}
              onChange={(e) => setActivitySectorValue(e.target.value)}
              required
            >
              <option value="" disabled>Sélectionnez un secteur d'activité</option>
              {ACTIVITY_SECTORS.map((sector, index) => (
                <option key={index} value={sector}>
                  {sector}
                </option>
              ))}
            </select>
          </div>

          <div className="form-actions">
            <button 
              onClick={updateDataFromInput} 
              className="btn-primary"
              disabled={isLoading}
            >
              {isLoading ? "Enregistrement..." : "Enregistrer les données"}
            </button>

            <button 
              onClick={navigateToMeasuringForm} 
              className="btn-secondary"
            >
              {measuringForm || "Continuer au formulaire de mesure"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Acquisition;
