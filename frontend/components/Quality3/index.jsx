import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import NavItems3 from "../NavItems3";
import NavItems2 from "../NavItems2";
import "./Quality3.css";
import "../../styleguide.css";
import { q_allData1 } from "../Quality1";
import { q_allData2 } from "../Quality2";
export let q_allData3 = [];
export let q_yesCount3 = 0;

function Quality3(props) {
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
        q_yesCount3--;
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
      q_yesCount3++;
    }
    // Si on passe de "Yes" à "No", on décrémente le score
    else if (option === "No" && previousOption === "Yes") {
      q_yesCount3--;
    }
  }

  const history = useHistory();

  function saveData() {
    setIsLoading(true);
    setErrorMessage("");
    
    console.log("Début de sauvegarde des données Quality3");
    
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
      "Do you communicate the importance of having an effective quality management system?",
      "Do you have objectives in the form of KPIs concerning quality?",
      "Do you monitor the achievement of quality objectives?",
      "Do you have a quality management process established?",
      "Are the members of your organisation informed about the necessary quality improvements?",
      "Is there quality assurance planning?",
      "Is there a documented quality procedure in your company?"
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
        section: "quality-3",
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
    q_allData3 = [...data];
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
      localStorage.setItem('quality3Score', q_yesCount3);
      console.log(`Score quality3 mis à jour: ${q_yesCount3}`);
      
      // Redirection vers la page suivante
      setIsLoading(false);
      history.push("/Quality-4");
    })
    .catch(error => {
      console.error("Error saving data:", error);
      setErrorMessage("Error saving data. Please try again.");
      console.error("Détails de l'erreur:", error.message);
      
      // Redirection malgré l'erreur
      setIsLoading(false);
      history.push("/Quality-4");
    });
  }

  function calculateProgressPercentage() {
    const totalQuestions = document.getElementsByTagName("section").length;
    if (totalQuestions === 0) return 0;
    return Math.round((q_yesCount3 / totalQuestions) * 100);
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
            Your score: {q_yesCount3} / {totalQuestions} ({calculateProgressPercentage()}%)
          </p>
        </div>

        <div className="questions-container">
          <section className="question-card">
            <p className="question-text">Do you communicate the importance of having an effective quality management system?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Do you communicate the importance of having an effective quality management system?", "Yes")} 
                className={`btn-option ${selectedOptions["Do you communicate the importance of having an effective quality management system?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Do you communicate the importance of having an effective quality management system?", "No")} 
                className={`btn-option ${selectedOptions["Do you communicate the importance of having an effective quality management system?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
              </div>
            </section>

          <section className="question-card">
            <p className="question-text">Do you have objectives in the form of KPIs concerning quality?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Do you have objectives in the form of KPIs concerning quality?", "Yes")} 
                className={`btn-option ${selectedOptions["Do you have objectives in the form of KPIs concerning quality?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Do you have objectives in the form of KPIs concerning quality?", "No")} 
                className={`btn-option ${selectedOptions["Do you have objectives in the form of KPIs concerning quality?"] === "No" ? "enabled" : ""}`}
                disabled={selectedOptions["Do you have objectives in the form of KPIs concerning quality?"] === "Yes"}
              >
                No
              </button>
              </div>
            </section>

          <section className="question-card">
            <p className="question-text">Do you monitor the achievement of quality objectives?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Do you monitor the achievement of quality objectives?", "Yes")} 
                className={`btn-option ${selectedOptions["Do you monitor the achievement of quality objectives?"] === "Yes" ? "enabled" : ""}`}
                disabled={selectedOptions["Do you monitor the achievement of quality objectives?"] === "No"}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Do you monitor the achievement of quality objectives?", "No")} 
                className={`btn-option ${selectedOptions["Do you monitor the achievement of quality objectives?"] === "No" ? "enabled" : ""}`}
                disabled={selectedOptions["Do you monitor the achievement of quality objectives?"] === "Yes"}
              >
                No
              </button>
              </div>
            </section>

          <section className="question-card">
            <p className="question-text">Do you have a quality management process established?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Do you have a quality management process established?", "Yes")} 
                className={`btn-option ${selectedOptions["Do you have a quality management process established?"] === "Yes" ? "enabled" : ""}`}
                disabled={selectedOptions["Do you have a quality management process established?"] === "No"}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Do you have a quality management process established?", "No")} 
                className={`btn-option ${selectedOptions["Do you have a quality management process established?"] === "No" ? "enabled" : ""}`}
                disabled={selectedOptions["Do you have a quality management process established?"] === "Yes"}
              >
                No
              </button>
              </div>
            </section>

          <section className="question-card">
            <p className="question-text">Are you improving these processes?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Are you improving these processes?", "Yes")} 
                className={`btn-option ${selectedOptions["Are you improving these processes?"] === "Yes" ? "enabled" : ""}`}
                disabled={selectedOptions["Are you improving these processes?"] === "No"}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Are you improving these processes?", "No")} 
                className={`btn-option ${selectedOptions["Are you improving these processes?"] === "No" ? "enabled" : ""}`}
                disabled={selectedOptions["Are you improving these processes?"] === "Yes"}
              >
                No
              </button>
              </div>
            </section>

          <section className="question-card">
            <p className="question-text">Do you conduct internal or external audits to ensure performance and effectiveness of the QMS (including internal audits and third-party audits)?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Do you conduct internal or external audits to ensure performance and effectiveness of the QMS (including internal audits and third-party audits)?", "Yes")} 
                className={`btn-option ${selectedOptions["Do you conduct internal or external audits to ensure performance and effectiveness of the QMS (including internal audits and third-party audits)?"] === "Yes" ? "enabled" : ""}`}
                disabled={selectedOptions["Do you conduct internal or external audits to ensure performance and effectiveness of the QMS (including internal audits and third-party audits)?"] === "No"}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Do you conduct internal or external audits to ensure performance and effectiveness of the QMS (including internal audits and third-party audits)?", "No")} 
                className={`btn-option ${selectedOptions["Do you conduct internal or external audits to ensure performance and effectiveness of the QMS (including internal audits and third-party audits)?"] === "No" ? "enabled" : ""}`}
                disabled={selectedOptions["Do you conduct internal or external audits to ensure performance and effectiveness of the QMS (including internal audits and third-party audits)?"] === "Yes"}
              >
                No
              </button>
              </div>
            </section>
        </div>

        <div className="form-actions">
          <Link to="/quality-2" className="btn-secondary">
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

export default Quality3;
