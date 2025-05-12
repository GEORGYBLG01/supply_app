import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import NavItems3 from "../NavItems3";
import NavItems2 from "../NavItems2";
import "./LeadTime1.css";
import "../../styleguide.css";
export let l_allData1 = [];
export let l_yesCount1 = 0;

function LeadTime1(props) {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const {
    x1200PxLogo_Icam__20081,
    navItems3Props,
  } = props;

  useEffect(() => {
    // Calculate the total number of questions based on sections
    const sections = document.getElementsByTagName("section");
    setTotalQuestions(sections.length);
  }, []); // Run this effect only once when the component mounts

  function clicked(question, option) {
    // Si l'option cliquée est la même que celle déjà sélectionnée, on la désélectionne
    if (selectedOptions[question] === option) {
      setSelectedOptions((prevSelectedOptions) => {
        const newOptions = { ...prevSelectedOptions };
        delete newOptions[question];
        return newOptions;
      });
      // Si on désélectionne un "Yes", on décrémente le score
      if (option === "Yes") {
        l_yesCount1--;
      }
      return;
    }

    // Sinon, on met à jour la sélection
    const previousOption = selectedOptions[question];
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [question]: option,
    }));
    
    // Si on passe de "No" à "Yes", on incrémente le score
    if (option === "Yes" && previousOption !== "Yes") {
      l_yesCount1++;
    }
    // Si on passe de "Yes" à "No", on décrémente le score
    else if (option === "No" && previousOption === "Yes") {
      l_yesCount1--;
    }
  }

  const history = useHistory();

  function saveData() {
    setIsLoading(true);
    setErrorMessage("");
    
    console.log("Début de sauvegarde des données LeadTime1");
    
    const enterpriseId = localStorage.getItem("enterpriseId");
    const userId = localStorage.getItem("userId");
    
    if (!enterpriseId) {
      console.error("ERREUR: ID d'entreprise manquant");
      setErrorMessage("ID d'entreprise manquant. Veuillez retourner à la sélection d'entreprise.");
      setIsLoading(false);
      return;
    }

    // Définir toutes les questions possibles
    const allQuestions = [
      "Do you have a delay rate?",
      "If so, how much is it?",
      "What are the causes of the delay?",
      "What is the average lead time in days?",
      "Are your lead times documented (process mapping)?",
      "Do you have systems to manage and monitor lead time?",
      "Is lead time a KPI for you?",
      "Do you have an on-time delivery rate?",
      "Do you have a standard lead time (Takt time)?"
    ];

    // Créer un tableau de questions/réponses pour toutes les questions
    const data = allQuestions.map(question => {
      const answer = selectedOptions[question] || "No";
      return {
        question: question,
        answer: answer,
        category: "leadTime",
        enterpriseId: enterpriseId,
        userId: userId || "",
        section: "leadtime-1",
        timestamp: new Date().toISOString()
      };
    });
    
    // Vérifier que les données sont correctement formatées
    const isValidData = data.every(item => 
      item.question && 
      item.answer && 
      item.category && 
      item.enterpriseId
    );

    if (!isValidData) {
      console.error("Données invalides:", data);
      setErrorMessage("Format de données invalide");
      setIsLoading(false);
      return;
    }
    
    // Sauvegarder les données pour une utilisation ultérieure
    l_allData1 = [...data];
    console.log("Données à envoyer:", JSON.stringify(data, null, 2));
    
    // Appel API pour sauvegarder les données
    fetch(window.env.API_URL + "/api/save-answers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token") ? `Bearer ${localStorage.getItem("token")}` : "",
      },
      body: JSON.stringify(data),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erreur de sauvegarde (${response.status})`);
      }
      return response.json();
    })
    .then(result => {
      console.log("Data saved successfully:", result);
      
      // Sauvegarder le score dans le localStorage
      localStorage.setItem('leadTime1Score', l_yesCount1);
      console.log(`Score leadTime1 mis à jour: ${l_yesCount1}`);
      
      setIsLoading(false);
      history.push("/lead-time-2");
    })
    .catch(error => {
      console.error("Error saving data:", error);
      setErrorMessage("Error saving data. Please try again.");
      console.error("Détails de l'erreur:", error.message);
      setIsLoading(false);
      history.push("/lead-time-2");
    });
  }

  function calculateProgressPercentage() {
    const totalQuestions = document.getElementsByTagName("section").length;
    if (totalQuestions === 0) return 0;
    return Math.round((l_yesCount1 / totalQuestions) * 100);
  }

  return (
    <div className="environmental-container">
      <div className="environmental-header">
        <Link to="/home">
          <img
            className="logo-icam"
            src={x1200PxLogo_Icam__20081 || "../../assets/x1200PxLogo_Icam__20081.png"}
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
        </div>
      </div>

      <div className="environmental-content">
        <h1 className="environmental-title">
          PLEASE ANSWER THE FOLLOWING QUESTIONS
        </h1>
        
        <div className="progress-container">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{width: `${calculateProgressPercentage()}%`}}
            ></div>
          </div>
          <p className="progress-text">
            Your score: {l_yesCount1} / {totalQuestions} ({calculateProgressPercentage()}%)
          </p>
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <div className="questions-container">
          <section className="question-card">
            <p className="question-text">Do you have a delay rate?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Do you have a delay rate?", "Yes")} 
                className={`btn-option ${selectedOptions["Do you have a delay rate?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Do you have a delay rate?", "No")} 
                className={`btn-option ${selectedOptions["Do you have a delay rate?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
            </div>
          </section>

          <section className="question-card">
            <p className="question-text">If so, how much is it?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("If so, how much is it?", "Yes")} 
                className={`btn-option ${selectedOptions["If so, how much is it?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("If so, how much is it?", "No")} 
                className={`btn-option ${selectedOptions["If so, how much is it?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
            </div>
          </section>

          <section className="question-card">
            <p className="question-text">Can your suppliers be flexible to your demand?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Can your suppliers be flexible to your demand?", "Yes")} 
                className={`btn-option ${selectedOptions["Can your suppliers be flexible to your demand?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Can your suppliers be flexible to your demand?", "No")} 
                className={`btn-option ${selectedOptions["Can your suppliers be flexible to your demand?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
            </div>
          </section>

          <section className="question-card">
            <p className="question-text">If not, can you change suppliers quickly if the supplier does not meet your expectations?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("If not, can you change suppliers quickly if the supplier does not meet your expectations?", "Yes")} 
                className={`btn-option ${selectedOptions["If not, can you change suppliers quickly if the supplier does not meet your expectations?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("If not, can you change suppliers quickly if the supplier does not meet your expectations?", "No")} 
                className={`btn-option ${selectedOptions["If not, can you change suppliers quickly if the supplier does not meet your expectations?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
            </div>
          </section>

          <section className="question-card">
            <p className="question-text">If no, can you change suppliers quickly if the supplier does not meet your expectations?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("If no, can you change suppliers quickly if the supplier does not meet your expectations?", "Yes")} 
                className={`btn-option ${selectedOptions["If no, can you change suppliers quickly if the supplier does not meet your expectations?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("If no, can you change suppliers quickly if the supplier does not meet your expectations?", "No")} 
                className={`btn-option ${selectedOptions["If no, can you change suppliers quickly if the supplier does not meet your expectations?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
            </div>
          </section>

          <section className="question-card">
            <p className="question-text">Do you have calculation methods for making purchase forecasts?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Do you have calculation methods for making purchase forecasts?", "Yes")} 
                className={`btn-option ${selectedOptions["Do you have calculation methods for making purchase forecasts?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Do you have calculation methods for making purchase forecasts?", "No")} 
                className={`btn-option ${selectedOptions["Do you have calculation methods for making purchase forecasts?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
            </div>
          </section>

          <section className="question-card">
            <p className="question-text">Do you have a safety stock?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Do you have a safety stock?", "Yes")} 
                className={`btn-option ${selectedOptions["Do you have a safety stock?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Do you have a safety stock?", "No")} 
                className={`btn-option ${selectedOptions["Do you have a safety stock?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
            </div>
          </section>

          <section className="question-card">
            <p className="question-text">Do you have buffer stocks?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Do you have buffer stocks?", "Yes")} 
                className={`btn-option ${selectedOptions["Do you have buffer stocks?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Do you have buffer stocks?", "No")} 
                className={`btn-option ${selectedOptions["Do you have buffer stocks?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
            </div>
          </section>
        </div>

        <div className="form-actions">
          <Link to="/home" className="btn-secondary">
            Back
          </Link>
          <button onClick={saveData} className="btn-primary">
            Next
          </button>
        </div>

        {isLoading && (
          <div className="loading-indicator">
            <div className="spinner"></div>
            <p>Saving data...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default LeadTime1;
