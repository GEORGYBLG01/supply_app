import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import NavItems2 from "../NavItems2";
import NavItems3 from "../NavItems3";
import "./Modernization3.css";
import "../../styleguide.css";
export let m_allData3 = [];
export let m_yesCount3 = 0;

function Modernization3(props) {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const {
    x1200PxLogo_Icam__20081,
    navItems2Props,
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
        m_yesCount3--;
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
      m_yesCount3++;
    }
    // Si on passe de "Yes" à "No", on décrémente le score
    else if (option === "No" && previousOption === "Yes") {
      m_yesCount3--;
    }
  }

  const history = useHistory();

  function saveData() {
    setIsLoading(true);
    setErrorMessage("");
    
    console.log("Début de sauvegarde des données Modernization3");
    
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
      "For the visualization of your data, do you use Power BI?",
      "For the visualization of your data, do you use AWS?",
      "For the visualization of your data, do you use GCP?",
      "For the visualization of your data, do you use Python?",
      "For the visualization of your data, do you use others?",
      "Do you have models for data visualization?"
    ];

    // Créer un tableau de questions/réponses pour toutes les questions
    const data = allQuestions.map(question => {
      const answer = selectedOptions[question] || "No";
      return {
        question: question,
        answer: answer,
        category: "modernization",
        enterpriseId: enterpriseId,
        userId: userId || "",
        section: "modernization-3",
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
    m_allData3 = [...data];
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
      localStorage.setItem('modernization3Score', m_yesCount3);
      console.log(`Score modernization3 mis à jour: ${m_yesCount3}`);
      
      setIsLoading(false);
      history.push("/modernization-4");
    })
    .catch(error => {
      console.error("Error saving data:", error);
      setErrorMessage("Error saving data. Please try again.");
      console.error("Détails de l'erreur:", error.message);
      setIsLoading(false);
      history.push("/modernization-4");
    });
  }

  function calculateProgressPercentage() {
    const totalQuestions = document.getElementsByTagName("section").length;
    if (totalQuestions === 0) return 0;
    return Math.round((m_yesCount3 / totalQuestions) * 100);
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
            Your score: {m_yesCount3} / {totalQuestions} ({calculateProgressPercentage()}%)
          </p>
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <div className="questions-container">
          <section className="question-card">
            <p className="question-text">For the visualization of your data, do you use Power BI?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("For the visualization of your data, do you use Power BI?", "Yes")} 
                className={`btn-option ${selectedOptions["For the visualization of your data, do you use Power BI?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("For the visualization of your data, do you use Power BI?", "No")} 
                className={`btn-option ${selectedOptions["For the visualization of your data, do you use Power BI?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
            </div>
          </section>

          <section className="question-card">
            <p className="question-text">For the visualization of your data, do you use AWS?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("For the visualization of your data, do you use AWS?", "Yes")} 
                className={`btn-option ${selectedOptions["For the visualization of your data, do you use AWS?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("For the visualization of your data, do you use AWS?", "No")} 
                className={`btn-option ${selectedOptions["For the visualization of your data, do you use AWS?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
            </div>
          </section>

          <section className="question-card">
            <p className="question-text">For the visualization of your data, do you use GCP?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("For the visualization of your data, do you use GCP?", "Yes")} 
                className={`btn-option ${selectedOptions["For the visualization of your data, do you use GCP?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("For the visualization of your data, do you use GCP?", "No")} 
                className={`btn-option ${selectedOptions["For the visualization of your data, do you use GCP?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
            </div>
          </section>

          <section className="question-card">
            <p className="question-text">For the visualization of your data, do you use Python?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("For the visualization of your data, do you use Python?", "Yes")} 
                className={`btn-option ${selectedOptions["For the visualization of your data, do you use Python?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("For the visualization of your data, do you use Python?", "No")} 
                className={`btn-option ${selectedOptions["For the visualization of your data, do you use Python?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
            </div>
          </section>

          <section className="question-card">
            <p className="question-text">For the visualization of your data, do you use others?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("For the visualization of your data, do you use others?", "Yes")} 
                className={`btn-option ${selectedOptions["For the visualization of your data, do you use others?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("For the visualization of your data, do you use others?", "No")} 
                className={`btn-option ${selectedOptions["For the visualization of your data, do you use others?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
            </div>
          </section>

          <section className="question-card">
            <p className="question-text">Do you have models for data visualization?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Do you have models for data visualization?", "Yes")} 
                className={`btn-option ${selectedOptions["Do you have models for data visualization?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Do you have models for data visualization?", "No")} 
                className={`btn-option ${selectedOptions["Do you have models for data visualization?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
            </div>
          </section>
        </div>

        <div className="form-actions">
          <Link to="/modernization-2" className="btn-secondary">
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

export default Modernization3;
