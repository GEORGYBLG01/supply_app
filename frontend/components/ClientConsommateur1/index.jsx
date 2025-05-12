import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import NavItems3 from "../NavItems3";
import NavItems2 from "../NavItems2";
import "./ClientConsommateur1.css";
import "../../styleguide.css";
export let cc_allData1 = [];
export let cc_yesCount1 = 0;

function ClientConsommateur1(props) {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    x1200PxLogo_Icam__20081,
    navItems3Props,
  } = props;

  const history = useHistory();

  useEffect(() => {
    // Reset the count when component mounts to avoid residual values
    cc_yesCount1 = 0;
    
    // Calculate the total number of questions based on sections
    const sections = document.getElementsByTagName("section");
    setTotalQuestions(sections.length);
  }, []); // Run this effect only once when the component mounts

  function clicked(question, option) {
    // If the clicked option is the same as the already selected one, deselect it
    if (selectedOptions[question] === option) {
      setSelectedOptions((prevSelectedOptions) => {
        const newOptions = { ...prevSelectedOptions };
        delete newOptions[question];
        return newOptions;
      });
      // If we deselect a "Yes", decrement the score
      if (option === "Yes") {
        cc_yesCount1--;
      }
      return;
    }

    // Otherwise, update the selection
    const previousOption = selectedOptions[question];
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [question]: option,
    }));
    
    // If changing from "No" to "Yes", increment the score
    if (option === "Yes" && previousOption !== "Yes") {
      cc_yesCount1++;
    }
    // If changing from "Yes" to "No", decrement the score
    else if (option === "No" && previousOption === "Yes") {
      cc_yesCount1--;
    }
  }

  function saveData() {
    setIsLoading(true);
    setErrorMessage("");
    
    console.log("Début de sauvegarde des données ClientConsommateur1");
    
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
      "Do you transmit information about product progress to customers?",
      "Number of disputes and/or amicable settlements concerning the company (Do you have disputes and/or amicable settlements?)",
      "Are you audited by organizations such as data protection authorities?",
      "Do you have a communication plan with communities, NGOs and other external structures?",
      "Do you have a plan for improvement in client/consumer relations?",
      "Are your employees aware of best practices in terms of fair information, transparency, and fair contractual practices?",
      "Do your products have a description of the hazards?",
      "Do your products have safety warnings?",
      "Are your products tested before being put on the market?"
    ];

    // Créer un tableau de questions/réponses pour toutes les questions
    const data = allQuestions.map(question => {
      const answer = selectedOptions[question] || "No";
      return {
        question: question,
        answer: answer,
        category: "client-consommateur",
        enterpriseId: enterpriseId,
        userId: userId || "",
        section: "client-consommateur-1",
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
    cc_allData1 = [...data];
    console.log("Données à envoyer:", JSON.stringify(data, null, 2));
    
    // Sauvegarder le score pour ClientConsommateur2
    localStorage.setItem('clientConsommateur1Score', cc_yesCount1);
    console.log(`Score clientConsommateur1 enregistré: ${cc_yesCount1}`);
    
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
      
      setIsLoading(false);
      history.push("/client-consommateur-2");
    })
    .catch(error => {
      console.error("Error saving data:", error);
      setErrorMessage("Error saving data. Please try again.");
      console.error("Détails de l'erreur:", error.message);
      setIsLoading(false);
      history.push("/client-consommateur-2");
    });
  }

  function calculateProgressPercentage() {
    const totalQuestions = document.getElementsByTagName("section").length;
    if (totalQuestions === 0) return 0;
    return Math.round((cc_yesCount1 / totalQuestions) * 100);
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
            Your score: {cc_yesCount1} / {totalQuestions} ({calculateProgressPercentage()}%)
          </p>
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <div className="questions-container">
          <section className="question-card">
            <p className="question-text">Do you transmit information about product progress to customers?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Do you transmit information about product progress to customers?", "Yes")} 
                className={`btn-option ${selectedOptions["Do you transmit information about product progress to customers?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Do you transmit information about product progress to customers?", "No")} 
                className={`btn-option ${selectedOptions["Do you transmit information about product progress to customers?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
            </div>
          </section>

          <section className="question-card">
            <p className="question-text">Number of disputes and/or amicable settlements concerning the company (Do you have disputes and/or amicable settlements?)</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Number of disputes and/or amicable settlements concerning the company (Do you have disputes and/or amicable settlements?)", "Yes")} 
                className={`btn-option ${selectedOptions["Number of disputes and/or amicable settlements concerning the company (Do you have disputes and/or amicable settlements?)"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Number of disputes and/or amicable settlements concerning the company (Do you have disputes and/or amicable settlements?)", "No")} 
                className={`btn-option ${selectedOptions["Number of disputes and/or amicable settlements concerning the company (Do you have disputes and/or amicable settlements?)"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
            </div>
          </section>

          <section className="question-card">
            <p className="question-text">Are you audited by organizations such as data protection authorities?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Are you audited by organizations such as data protection authorities?", "Yes")} 
                className={`btn-option ${selectedOptions["Are you audited by organizations such as data protection authorities?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Are you audited by organizations such as data protection authorities?", "No")} 
                className={`btn-option ${selectedOptions["Are you audited by organizations such as data protection authorities?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
            </div>
          </section>

          <section className="question-card">
            <p className="question-text">Do you have safety notices?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Do you have safety notices?", "Yes")} 
                className={`btn-option ${selectedOptions["Do you have safety notices?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Do you have safety notices?", "No")} 
                className={`btn-option ${selectedOptions["Do you have safety notices?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
            </div>
          </section>

          <section className="question-card">
            <p className="question-text">Do you have a recall procedure?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Do you have a recall procedure?", "Yes")} 
                className={`btn-option ${selectedOptions["Do you have a recall procedure?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Do you have a recall procedure?", "No")} 
                className={`btn-option ${selectedOptions["Do you have a recall procedure?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
            </div>
          </section>
        </div>

        <div className="form-actions">
          <Link to="/quality-6" className="btn-secondary">
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

export default ClientConsommateur1;