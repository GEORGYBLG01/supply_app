import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import NavItems3 from "../NavItems3";
import NavItems2 from "../NavItems2";
import "./Quality2.css";
import "../../styleguide.css";
import { q_allData1 } from "../Quality1";
export let q_allData2 = [];
export let q_yesCount2 = 0;

function Quality2(props) {
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
        q_yesCount2--;
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
      q_yesCount2++;
    }
    // Si on passe de "Yes" à "No", on décrémente le score
    else if (option === "No" && previousOption === "Yes") {
      q_yesCount2--;
    }
  }

  const history = useHistory();

  function saveData() {
    setIsLoading(true);
    setErrorMessage("");
    
    console.log("Début de sauvegarde des données Quality2");
    
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
      "Do you have a customer satisfaction percentage?",
      "Is it below 30%?",
      "Is it between 30% and 50%?",
      "Is it between 50% and 80%?",
      "Is it above 80%?"
    ];

    // Créer un tableau de questions/réponses pour toutes les questions
    const data = allQuestions.map(question => {
      const answer = selectedOptions[question] || "No";
      return {
        question: question,
        answer: answer,
        category: "quality",
        enterpriseId: enterpriseId,
        userId: userId || "",
        section: "quality-2",
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
    q_allData2 = [...data];
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
      localStorage.setItem('quality2Score', q_yesCount2);
      console.log(`Score quality2 mis à jour: ${q_yesCount2}`);
      
      // Redirection vers la page suivante
      setIsLoading(false);
      history.push("/Quality-3");
    })
    .catch(error => {
      console.error("Error saving data:", error);
      setErrorMessage("Error saving data. Please try again.");
      console.error("Détails de l'erreur:", error.message);
      
      // Redirection malgré l'erreur
      setIsLoading(false);
      history.push("/Quality-3");
    });
  }

  function calculateProgressPercentage() {
    const totalQuestions = document.getElementsByTagName("section").length;
    if (totalQuestions === 0) return 0;
    return Math.round((q_yesCount2 / totalQuestions) * 100);
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
            Your score: {q_yesCount2} / {totalQuestions} ({calculateProgressPercentage()}%)
          </p>
        </div>

        <div className="questions-container">
          <section className="question-card">
            <p className="question-text">Do you have a customer satisfaction percentage?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Do you have a customer satisfaction percentage?", "Yes")} 
                className={`btn-option ${selectedOptions["Do you have a customer satisfaction percentage?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Do you have a customer satisfaction percentage?", "No")} 
                className={`btn-option ${selectedOptions["Do you have a customer satisfaction percentage?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
            </div>
          </section>

          <section className="question-card">
            <p className="question-text">Is it below 30%?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Is it below 30%?", "Yes")} 
                className={`btn-option ${selectedOptions["Is it below 30%?"] === "Yes" ? "enabled" : ""}`}
                disabled={selectedOptions["Is it below 30%?"] === "No"}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Is it below 30%?", "No")} 
                className={`btn-option ${selectedOptions["Is it below 30%?"] === "No" ? "enabled" : ""}`}
                disabled={selectedOptions["Is it below 30%?"] === "Yes"}
              >
                No
              </button>
            </div>
          </section>

          <section className="question-card">
            <p className="question-text">Is it between 30% and 60%?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Is it between 30% and 60%?", "Yes")} 
                className={`btn-option ${selectedOptions["Is it between 30% and 60%?"] === "Yes" ? "enabled" : ""}`}
                disabled={selectedOptions["Is it between 30% and 60%?"] === "No"}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Is it between 30% and 60%?", "No")} 
                className={`btn-option ${selectedOptions["Is it between 30% and 60%?"] === "No" ? "enabled" : ""}`}
                disabled={selectedOptions["Is it between 30% and 60%?"] === "Yes"}
              >
                No
              </button>
            </div>
          </section>

          <section className="question-card">
            <p className="question-text">Is it between 60% and 90%?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Is it between 60% and 90%?", "Yes")} 
                className={`btn-option ${selectedOptions["Is it between 60% and 90%?"] === "Yes" ? "enabled" : ""}`}
                disabled={selectedOptions["Is it between 60% and 90%?"] === "No"}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Is it between 60% and 90%?", "No")} 
                className={`btn-option ${selectedOptions["Is it between 60% and 90%?"] === "No" ? "enabled" : ""}`}
                disabled={selectedOptions["Is it between 60% and 90%?"] === "Yes"}
              >
                No
              </button>
            </div>
          </section>

          <section className="question-card">
            <p className="question-text">Is it higher than 90%?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Is it higher than 90%?", "Yes")} 
                className={`btn-option ${selectedOptions["Is it higher than 90%?"] === "Yes" ? "enabled" : ""}`}
                disabled={selectedOptions["Is it higher than 90%?"] === "No"}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Is it higher than 90%?", "No")} 
                className={`btn-option ${selectedOptions["Is it higher than 90%?"] === "No" ? "enabled" : ""}`}
                disabled={selectedOptions["Is it higher than 90%?"] === "Yes"}
              >
                No
              </button>
            </div>
          </section>

          <section className="question-card">
            <p className="question-text">Does the manager ensure that customer requirements are met?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Does the manager ensure that customer requirements are met?", "Yes")} 
                className={`btn-option ${selectedOptions["Does the manager ensure that customer requirements are met?"] === "Yes" ? "enabled" : ""}`}
                disabled={selectedOptions["Does the manager ensure that customer requirements are met?"] === "No"}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Does the manager ensure that customer requirements are met?", "No")} 
                className={`btn-option ${selectedOptions["Does the manager ensure that customer requirements are met?"] === "No" ? "enabled" : ""}`}
                disabled={selectedOptions["Does the manager ensure that customer requirements are met?"] === "Yes"}
              >
                No
              </button>
            </div>
          </section>

          <section className="question-card">
            <p className="question-text">Do you communicate to employees the points of attention where product and service compliance is at risk?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Do you communicate to employees the points of attention where product and service compliance is at risk?", "Yes")} 
                className={`btn-option ${selectedOptions["Do you communicate to employees the points of attention where product and service compliance is at risk?"] === "Yes" ? "enabled" : ""}`}
                disabled={selectedOptions["Do you communicate to employees the points of attention where product and service compliance is at risk?"] === "No"}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Do you communicate to employees the points of attention where product and service compliance is at risk?", "No")} 
                className={`btn-option ${selectedOptions["Do you communicate to employees the points of attention where product and service compliance is at risk?"] === "No" ? "enabled" : ""}`}
                disabled={selectedOptions["Do you communicate to employees the points of attention where product and service compliance is at risk?"] === "Yes"}
              >
                No
              </button>
            </div>
          </section>
        </div>

        <div className="form-actions">
          <Link to="/quality-1" className="btn-secondary">
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

export default Quality2;
