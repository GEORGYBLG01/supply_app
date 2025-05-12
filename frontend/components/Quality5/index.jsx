import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import NavItems3 from "../NavItems3";
import NavItems2 from "../NavItems2";
import "./Quality5.css";
import "../../styleguide.css";
import { q_allData1 } from "../Quality1";
import { q_allData2 } from "../Quality2";
import { q_allData3 } from "../Quality3";
import { q_allData4 } from "../Quality4";
export let q_allData5 = [];
export let q_yesCount5 = 0;

function Quality5(props) {
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
        q_yesCount5--;
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
      q_yesCount5++;
    }
    // Si on passe de "Yes" à "No", on décrémente le score
    else if (option === "No" && previousOption === "Yes") {
      q_yesCount5--;
    }
  }

  const history = useHistory();

  function saveData() {
    setIsLoading(true);
    setErrorMessage("");
    
    console.log("Début de sauvegarde des données Quality5");
    
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
      "Do you carry out internal audits at planned intervals to determine whether the QMS complies with the organisation's requirements?",
      "Is the planning and execution of the audit programme organised on a process-by-process basis?",
      "Does the organization plan, establish, implement and maintain an audit programme(s)?",
      "Does the organization use the results of previous audits to assess the effectiveness of actions taken to address the risks and opportunities?",
      "Does the organization ensure that the results of the audits are reported to relevant management?",
      "Does the organization take appropriate corrections and corrective actions without undue delay?",
      "Does the organization retain documented information as evidence of the implementation of the audit programme and the audit results?"
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
        section: "quality-5",
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
    q_allData5 = [...data];
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
      localStorage.setItem('quality5Score', q_yesCount5);
      console.log(`Score quality5 mis à jour: ${q_yesCount5}`);
      
      // Redirection vers la page suivante
      setIsLoading(false);
      history.push("/Quality-6");
    })
    .catch(error => {
      console.error("Error saving data:", error);
      setErrorMessage("Error saving data. Please try again.");
      console.error("Détails de l'erreur:", error.message);
      
      // Redirection malgré l'erreur
      setIsLoading(false);
      history.push("/Quality-6");
    });
  }

  function calculateProgressPercentage() {
    const totalQuestions = document.getElementsByTagName("section").length;
    if (totalQuestions === 0) return 0;
    return Math.round((q_yesCount5 / totalQuestions) * 100);
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
            Your score: {q_yesCount5} / {totalQuestions} ({calculateProgressPercentage()}%)
          </p>
        </div>

        <div className="questions-container">
          <section className="question-card">
            <p className="question-text">Do you carry out internal audits at planned intervals to determine whether the QMS complies with the organisation's requirements?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Do you carry out internal audits at planned intervals to determine whether the QMS complies with the organisation's requirements?", "Yes")} 
                className={`btn-option ${selectedOptions["Do you carry out internal audits at planned intervals to determine whether the QMS complies with the organisation's requirements?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Do you carry out internal audits at planned intervals to determine whether the QMS complies with the organisation's requirements?", "No")} 
                className={`btn-option ${selectedOptions["Do you carry out internal audits at planned intervals to determine whether the QMS complies with the organisation's requirements?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
            </div>
          </section>

          <section className="question-card">
            <p className="question-text">Is the planning and execution of the audit programme organised on a process-by-process basis?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Is the planning and execution of the audit programme organised on a process-by-process basis?", "Yes")} 
                className={`btn-option ${selectedOptions["Is the planning and execution of the audit programme organised on a process-by-process basis?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Is the planning and execution of the audit programme organised on a process-by-process basis?", "No")} 
                className={`btn-option ${selectedOptions["Is the planning and execution of the audit programme organised on a process-by-process basis?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
            </div>
          </section>

          <section className="question-card">
            <p className="question-text">Does the organization plan, establish, implement and maintain an audit programme(s)?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Does the organization plan, establish, implement and maintain an audit programme(s)?", "Yes")} 
                className={`btn-option ${selectedOptions["Does the organization plan, establish, implement and maintain an audit programme(s)?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Does the organization plan, establish, implement and maintain an audit programme(s)?", "No")} 
                className={`btn-option ${selectedOptions["Does the organization plan, establish, implement and maintain an audit programme(s)?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
            </div>
          </section>

          <section className="question-card">
            <p className="question-text">Does the organization use the results of previous audits to assess the effectiveness of actions taken to address the risks and opportunities?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Does the organization use the results of previous audits to assess the effectiveness of actions taken to address the risks and opportunities?", "Yes")} 
                className={`btn-option ${selectedOptions["Does the organization use the results of previous audits to assess the effectiveness of actions taken to address the risks and opportunities?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Does the organization use the results of previous audits to assess the effectiveness of actions taken to address the risks and opportunities?", "No")} 
                className={`btn-option ${selectedOptions["Does the organization use the results of previous audits to assess the effectiveness of actions taken to address the risks and opportunities?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
            </div>
          </section>

          <section className="question-card">
            <p className="question-text">Does the organization ensure that the results of the audits are reported to relevant management?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Does the organization ensure that the results of the audits are reported to relevant management?", "Yes")} 
                className={`btn-option ${selectedOptions["Does the organization ensure that the results of the audits are reported to relevant management?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Does the organization ensure that the results of the audits are reported to relevant management?", "No")} 
                className={`btn-option ${selectedOptions["Does the organization ensure that the results of the audits are reported to relevant management?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
            </div>
          </section>

          <section className="question-card">
            <p className="question-text">Are these audit results also visible to employees?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Are these audit results also visible to employees?", "Yes")} 
                className={`btn-option ${selectedOptions["Are these audit results also visible to employees?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Are these audit results also visible to employees?", "No")} 
                className={`btn-option ${selectedOptions["Are these audit results also visible to employees?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
            </div>
          </section>
        </div>

        <div className="form-actions">
          <Link to="/quality-4" className="btn-secondary">
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

export default Quality5;
