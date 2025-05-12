import React from "react";
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import NavItems3 from "../NavItems3";
import NavItems2 from "../NavItems2";
import Toggle from "../Toggle";
import Ouinon from "../Ouinon";
import Frame11732 from "../Frame11732";
import "./Environmental3.css";
import "../../styleguide.css";
export let e_allData3 = [];
export let yes_Count3 = 0;

function Environmental3(props) {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [yesCount3, setYesCount3] = useState(0); // Initialize yesCount state
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [isLoading, setIsLoading] = useState(false); // Ajout de l'état isLoading
  const {
    x1200PxLogo_Icam__20081,
    navItems3Props,
    toggle1Props,
    toggle2Props,
    toggle3Props,
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
        yes_Count3--;
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
      yes_Count3++;
    }
    // Si on passe de "Yes" à "No", on décrémente le score
    else if (option === "No" && previousOption === "Yes") {
      yes_Count3--;
    }
  }

  const history = useHistory();

  function saveData() {
    setIsLoading(true);
    setErrorMessage("");
    
    console.log("Début de sauvegarde des données Environmental3");
    
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
      "Do you control and limit your energy consumption?",
      "Do you measure your energy consumption?",
      "Have you taken measures to reduce your energy consumption?",
      "Do you have sites located in or near protected areas?",
      "Do you have sites located in Natura 2000 areas?",
      "Do you favor buying from local suppliers to reduce transportation?"
    ];

    // Créer un tableau de questions/réponses pour toutes les questions
    const data = allQuestions.map(question => {
      const answer = selectedOptions[question] || "No";
      return {
        question: question,
        answer: answer,
        category: "environmental",
        enterpriseId: enterpriseId,
        userId: userId || "",
        section: "environmental-3",
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
      localStorage.setItem('environmental3Score', yes_Count3);
      console.log(`Score environmental3 mis à jour: ${yes_Count3}`);
      
      setIsLoading(false);
      history.push("/environmental-4");
    })
    .catch(error => {
      console.error("Error saving data:", error);
      setErrorMessage("Error saving data. Please try again.");
      console.error("Détails de l'erreur:", error.message);
      setIsLoading(false);
      history.push("/environmental-4");
    });
  }

  return (
    <div className="environmental-container">
      <div className="environmental-header">
        <Link to="/home">
          <img
            className="logo-icam"
            src="../../assets/x1200PxLogo_Icam__20081.png"
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
              style={{width: `${(Object.keys(selectedOptions).length / totalQuestions) * 100}%`}}
            ></div>
          </div>
          <p className="progress-text">
            Your score: {yes_Count3} / {totalQuestions} ({Math.round((yes_Count3 / totalQuestions) * 100) || 0}%)
          </p>
        </div>

        <div className="questions-container">
          <section className="question-card">
            <p className="question-text">Do you control and limit your energy consumption?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Do you control and limit your energy consumption?", "Yes")} 
                className={`btn-option ${selectedOptions["Do you control and limit your energy consumption?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Do you control and limit your energy consumption?", "No")} 
                className={`btn-option ${selectedOptions["Do you control and limit your energy consumption?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
            </div>
          </section>

          <section className="question-card">
            <p className="question-text">Do you measure your energy consumption?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Do you measure your energy consumption?", "Yes")} 
                className={`btn-option ${selectedOptions["Do you measure your energy consumption?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Do you measure your energy consumption?", "No")} 
                className={`btn-option ${selectedOptions["Do you measure your energy consumption?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
            </div>
          </section>

          <section className="question-card">
            <p className="question-text">Have you taken measures to reduce your energy consumption?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Have you taken measures to reduce your energy consumption?", "Yes")} 
                className={`btn-option ${selectedOptions["Have you taken measures to reduce your energy consumption?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Have you taken measures to reduce your energy consumption?", "No")} 
                className={`btn-option ${selectedOptions["Have you taken measures to reduce your energy consumption?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
            </div>
          </section>

          <section className="question-card">
            <p className="question-text">Do you have sites located in or near protected areas?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Do you have sites located in or near protected areas?", "Yes")} 
                className={`btn-option ${selectedOptions["Do you have sites located in or near protected areas?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Do you have sites located in or near protected areas?", "No")} 
                className={`btn-option ${selectedOptions["Do you have sites located in or near protected areas?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
            </div>
          </section>

          <section className="question-card">
            <p className="question-text">Do you have sites located in Natura 2000 areas?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Do you have sites located in Natura 2000 areas?", "Yes")} 
                className={`btn-option ${selectedOptions["Do you have sites located in Natura 2000 areas?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Do you have sites located in Natura 2000 areas?", "No")} 
                className={`btn-option ${selectedOptions["Do you have sites located in Natura 2000 areas?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
            </div>
          </section>

          <section className="question-card">
            <p className="question-text">Do you favor buying from local suppliers to reduce transportation?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Do you favor buying from local suppliers to reduce transportation?", "Yes")} 
                className={`btn-option ${selectedOptions["Do you favor buying from local suppliers to reduce transportation?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Do you favor buying from local suppliers to reduce transportation?", "No")} 
                className={`btn-option ${selectedOptions["Do you favor buying from local suppliers to reduce transportation?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
            </div>
          </section>
        </div>

        <div className="form-actions">
          <Link to="/environmental-2" className="btn-secondary">
            Back
          </Link>
          <button onClick={saveData} className="btn-primary">
            Continue to Next Section
          </button>
        </div>
      </div>
    </div>
  );
}

export default Environmental3;
