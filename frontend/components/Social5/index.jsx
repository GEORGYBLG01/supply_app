import React from "react";
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import NavItems3 from "../NavItems3";
import NavItems2 from "../NavItems2";
import Toggle from "../Toggle";
import "./Social5.css";
import "../../styleguide.css";
import { s_allData1 } from "../Social1";
import { s_allData2 } from "../Social2";
import { s_allData3 } from "../Social3";
import { s_allData4 } from "../Social4";
export let s_allData5 = [];
export let yes_Count5 = 0;

function Social5(props) {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [yesCount5, setYesCount5] = useState(0); // Initialize yesCount state
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [isLoading, setIsLoading] = useState(false); // Déplacé ici depuis saveData
  
  const {
    x1200PxLogo_Icam__20081,
    navItems3Props,
    toggle1Props,
    toggle2Props,
    toggle3Props,
    toggle4Props,
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
        yes_Count5--;
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
      yes_Count5++;
    }
    // Si on passe de "Yes" à "No", on décrémente le score
    else if (option === "No" && previousOption === "Yes") {
      yes_Count5--;
    }
  }

  const history = useHistory();

  function saveData() {
    setErrorMessage("");
    setIsLoading(true);
    
    console.log("Début de sauvegarde des données Social5");
    
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
      "Do you provide employee training opportunities?",
      "Do you have a career development program for your employees?",
      "Do you track employee skills development?",
      "Do you have measures to promote employee well-being?",
      "Do you conduct regular employee satisfaction surveys?"
    ];

    // Créer un tableau de questions/réponses pour toutes les questions
    const data = allQuestions.map(question => {
      const answer = selectedOptions[question] || "No";
      return {
        question: question,
        answer: answer,
        category: "social",
        enterpriseId: enterpriseId,
        userId: userId || "",
        section: "social-5",
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
    s_allData5 = [...data];
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
      localStorage.setItem('social5Score', yes_Count5);
      console.log(`Score social5 mis à jour: ${yes_Count5}`);
      
      setIsLoading(false);
      history.push("/social-6");
    })
    .catch(error => {
      console.error("Error saving data:", error);
      setErrorMessage("Error saving data. Please try again.");
      console.error("Détails de l'erreur:", error.message);
      setIsLoading(false);
      history.push("/social-6");
    });
  }

  function calculateProgressPercentage() {
    const totalQuestions = document.getElementsByTagName("section").length;
    if (totalQuestions === 0) return 0;
    return Math.round((yes_Count5 / totalQuestions) * 100);
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
            Your score: {yes_Count5} / {totalQuestions} ({calculateProgressPercentage()}%)
          </p>
        </div>

        <div className="questions-container">
          <section className="question-card">
            <p className="question-text">Do you provide employee training opportunities?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Do you provide employee training opportunities?", "Yes")} 
                className={`btn-option ${selectedOptions["Do you provide employee training opportunities?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Do you provide employee training opportunities?", "No")} 
                className={`btn-option ${selectedOptions["Do you provide employee training opportunities?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
                  </div>
                </section>

          <section className="question-card">
            <p className="question-text">Do you have a career development program for your employees?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Do you have a career development program for your employees?", "Yes")} 
                className={`btn-option ${selectedOptions["Do you have a career development program for your employees?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Do you have a career development program for your employees?", "No")} 
                className={`btn-option ${selectedOptions["Do you have a career development program for your employees?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
                  </div>
                </section>

          <section className="question-card">
            <p className="question-text">Do you track employee skills development?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Do you track employee skills development?", "Yes")} 
                className={`btn-option ${selectedOptions["Do you track employee skills development?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Do you track employee skills development?", "No")} 
                className={`btn-option ${selectedOptions["Do you track employee skills development?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
              </div>
            </section>

          <section className="question-card">
            <p className="question-text">Do you have measures to promote employee well-being?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Do you have measures to promote employee well-being?", "Yes")} 
                className={`btn-option ${selectedOptions["Do you have measures to promote employee well-being?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Do you have measures to promote employee well-being?", "No")} 
                className={`btn-option ${selectedOptions["Do you have measures to promote employee well-being?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
              </div>
            </section>

          <section className="question-card">
            <p className="question-text">Do you conduct regular employee satisfaction surveys?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Do you conduct regular employee satisfaction surveys?", "Yes")} 
                className={`btn-option ${selectedOptions["Do you conduct regular employee satisfaction surveys?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Do you conduct regular employee satisfaction surveys?", "No")} 
                className={`btn-option ${selectedOptions["Do you conduct regular employee satisfaction surveys?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
              </div>
            </section>
        </div>

        <div className="form-actions">
          <Link to="/social-4" className="btn-secondary">
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

export default Social5;
