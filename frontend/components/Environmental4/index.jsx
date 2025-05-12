import React from "react";
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import NavItems3 from "../NavItems3";
import NavItems2 from "../NavItems2";
import Toggle from "../Toggle";
import Ouinon2 from "../Ouinon2";
import Ouinon from "../Ouinon";
import Frame11732 from "../Frame11732";
import "./Environmental4.css";
import "../../styleguide.css";
export let e_allData4 = [];
export let yes_Count4 = 0;

function Environmental4(props) {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [yesCount4, setYesCount4] = useState(0); // Initialize yesCount state
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [isLoading, setIsLoading] = useState(false); // Ajout de l'état isLoading
  const {
    x1200PxLogo_Icam__20082,
    inputType1,
    inputPlaceholder1,
    inputType2,
    inputPlaceholder2,
    inputType3,
    inputPlaceholder3,
    inputType4,
    inputPlaceholder4,
    inputType5,
    inputPlaceholder5,
    inputType6,
    inputPlaceholder6,
    inputType7,
    inputPlaceholder7,
    navItems3Props,
    toggle1Props,
    ouinon21Props,
    ouinon22Props,
    toggle2Props,
    ouinon23Props,
    ouinon24Props,
    toggle3Props,
    ouinon1Props,
    ouinon2Props,
    ouinon3Props,
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
        yes_Count4--;
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
      yes_Count4++;
    }
    // Si on passe de "Yes" à "No", on décrémente le score
    else if (option === "No" && previousOption === "Yes") {
      yes_Count4--;
    }
  }

  const history = useHistory();

  function saveData() {
    setIsLoading(true);
    setErrorMessage("");
    
    console.log("Début de sauvegarde des données Environmental4");
    
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
      "Do you try to reduce waste at the source?",
      "Do you import, export, or transport hazardous waste?",
      "Do you promote waste recycling?",
      "What percentage of your waste do you recycle out of your total waste?",
      "Do you promote the reuse of waste?",
      "Do you sell your recoverable waste?",
      "Do you have partners who collect your waste for reuse?"
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
        section: "environmental-4",
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
      localStorage.setItem('environmental4Score', yes_Count4);
      console.log(`Score environmental4 mis à jour: ${yes_Count4}`);
      
      setIsLoading(false);
      history.push("/environmental-5");
    })
    .catch(error => {
      console.error("Error saving data:", error);
      setErrorMessage("Error saving data. Please try again.");
      console.error("Détails de l'erreur:", error.message);
      setIsLoading(false);
      history.push("/environmental-5");
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
            Your score: {yes_Count4} / {totalQuestions} ({Math.round((yes_Count4 / totalQuestions) * 100) || 0}%)
          </p>
        </div>

        <div className="questions-container">
          <section className="question-card">
            <p className="question-text">Do you try to reduce waste at the source?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Do you try to reduce waste at the source?", "Yes")} 
                className={`btn-option ${selectedOptions["Do you try to reduce waste at the source?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Do you try to reduce waste at the source?", "No")} 
                className={`btn-option ${selectedOptions["Do you try to reduce waste at the source?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
            </div>
          </section>

          <section className="question-card">
            <p className="question-text">Do you import, export, or transport hazardous waste?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Do you import, export, or transport hazardous waste?", "Yes")} 
                className={`btn-option ${selectedOptions["Do you import, export, or transport hazardous waste?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Do you import, export, or transport hazardous waste?", "No")} 
                className={`btn-option ${selectedOptions["Do you import, export, or transport hazardous waste?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
            </div>
          </section>

          <section className="question-card">
            <p className="question-text">Do you promote waste recycling?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Do you promote waste recycling?", "Yes")} 
                className={`btn-option ${selectedOptions["Do you promote waste recycling?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Do you promote waste recycling?", "No")} 
                className={`btn-option ${selectedOptions["Do you promote waste recycling?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
            </div>
          </section>

          <section className="question-card">
            <p className="question-text">What percentage of your waste do you recycle out of your total waste?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("What percentage of your waste do you recycle out of your total waste?", "Yes")} 
                className={`btn-option ${selectedOptions["What percentage of your waste do you recycle out of your total waste?"] === "Yes" ? "enabled" : ""}`}
              >
                More than 50%
              </button>
              <button 
                onClick={() => clicked("What percentage of your waste do you recycle out of your total waste?", "No")} 
                className={`btn-option ${selectedOptions["What percentage of your waste do you recycle out of your total waste?"] === "No" ? "enabled" : ""}`}
              >
                Less than 50%
              </button>
            </div>
          </section>

          <section className="question-card">
            <p className="question-text">Do you promote the reuse of waste?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Do you promote the reuse of waste?", "Yes")} 
                className={`btn-option ${selectedOptions["Do you promote the reuse of waste?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Do you promote the reuse of waste?", "No")} 
                className={`btn-option ${selectedOptions["Do you promote the reuse of waste?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
            </div>
          </section>

          <section className="question-card">
            <p className="question-text">Do you sell your recoverable waste?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Do you sell your recoverable waste?", "Yes")} 
                className={`btn-option ${selectedOptions["Do you sell your recoverable waste?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Do you sell your recoverable waste?", "No")} 
                className={`btn-option ${selectedOptions["Do you sell your recoverable waste?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
            </div>
          </section>

          <section className="question-card">
            <p className="question-text">Do you have partners who collect your waste for reuse?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Do you have partners who collect your waste for reuse?", "Yes")} 
                className={`btn-option ${selectedOptions["Do you have partners who collect your waste for reuse?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Do you have partners who collect your waste for reuse?", "No")} 
                className={`btn-option ${selectedOptions["Do you have partners who collect your waste for reuse?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
            </div>
          </section>
        </div>

        <div className="form-actions">
          <Link to="/environmental-3" className="btn-secondary">
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

export default Environmental4;
