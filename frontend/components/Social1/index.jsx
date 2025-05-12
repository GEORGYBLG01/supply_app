import React from "react";
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import NavItems3 from "../NavItems3";
import Frame113 from "../Frame113";
import Frame114 from "../Frame114";
import Frame115 from "../Frame115";
import Frame116 from "../Frame116";
import Frame117 from "../Frame117";
import Toggle from "../Toggle";
import "./Social1.css";
import "../../styleguide.css";
export let s_allData1 = [];
export let s_final = 0;
export let yes_Count1 = 0;

function Social1(props) {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [yesCount1, setYesCount1] = useState(0); // Initialize yesCount state
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const {
    x1200PxLogo_Icam__20081,
    pleaseAnswerTheFollowingQuestions,
    navItems3Props,
    frame113Props,
    frame117Props,
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
        yes_Count1--;
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
      yes_Count1++;
    }
    // Si on passe de "Yes" à "No", on décrémente le score
    else if (option === "No" && previousOption === "Yes") {
      yes_Count1--;
    }
  }

  const history = useHistory();

  function saveData() {
    setIsSaving(true);
    setErrorMessage("");
    
    console.log("Début de sauvegarde des données Social1");
    
    const enterpriseId = localStorage.getItem("enterpriseId");
    const userId = localStorage.getItem("userId");
    
    if (!enterpriseId) {
      console.error("ERREUR: ID d'entreprise manquant");
      setErrorMessage("ID d'entreprise manquant. Veuillez retourner à la sélection d'entreprise.");
      setIsSaving(false);
      return;
    }

    // Définir toutes les questions possibles
    const allQuestions = [
      "Do you limit any type of discrimination between employees, in order to ensure equal opportunities and equal treatment, especially for men and women?",
      "Do you have a percentage of incidents of discrimination that have been remedied?",
      "Do you make efforts to recruit people with disabilities?"
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
        section: "social-1",
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
      setIsSaving(false);
      return;
    }
    
    // Sauvegarder les données pour une utilisation ultérieure
    s_allData1 = [...data];
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
      localStorage.setItem('social1Score', yes_Count1);
      console.log(`Score social1 mis à jour: ${yes_Count1}`);
      
      setIsSaving(false);
      history.push("/social-2");
    })
    .catch(error => {
      console.error("Error saving data:", error);
      setErrorMessage("Error saving data. Please try again.");
      console.error("Détails de l'erreur:", error.message);
      setIsSaving(false);
      history.push("/social-2");
    });
  }

  function calculateProgressPercentage() {
    const totalQuestions = document.getElementsByTagName("section").length;
    if (totalQuestions === 0) return 0;
    return Math.round((yes_Count1 / totalQuestions) * 100);
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
          <div className="navigation-secondary">
            <Frame113 className={frame113Props?.className} />
              <Frame114 />
              <Frame115 />
              <Frame116 />
            <Frame117 className={frame117Props?.className} />
          </div>
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
            Your score: {yes_Count1} / {totalQuestions} ({calculateProgressPercentage()}%)
          </p>
        </div>

        <div className="questions-container">
          <section className="question-card">
            <p className="question-text">Do you limit any type of discrimination between employees, in order to ensure equal opportunities and equal treatment, especially for men and women?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Do you limit any type of discrimination between employees, in order to ensure equal opportunities and equal treatment, especially for men and women?", "Yes")} 
                className={`btn-option ${selectedOptions["Do you limit any type of discrimination between employees, in order to ensure equal opportunities and equal treatment, especially for men and women?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Do you limit any type of discrimination between employees, in order to ensure equal opportunities and equal treatment, especially for men and women?", "No")} 
                className={`btn-option ${selectedOptions["Do you limit any type of discrimination between employees, in order to ensure equal opportunities and equal treatment, especially for men and women?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
              </div>
            </section>

          <section className="question-card">
            <p className="question-text">Do you have a percentage of incidents of discrimination that have been remedied?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Do you have a percentage of incidents of discrimination that have been remedied?", "Yes")} 
                className={`btn-option ${selectedOptions["Do you have a percentage of incidents of discrimination that have been remedied?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Do you have a percentage of incidents of discrimination that have been remedied?", "No")} 
                className={`btn-option ${selectedOptions["Do you have a percentage of incidents of discrimination that have been remedied?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
              </div>
            </section>

          <section className="question-card">
            <p className="question-text">Do you manage your employees' diversity of ages, gender, and nationality?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Do you manage your employees' diversity of ages, gender, and nationality?", "Yes")} 
                className={`btn-option ${selectedOptions["Do you manage your employees' diversity of ages, gender, and nationality?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Do you manage your employees' diversity of ages, gender, and nationality?", "No")} 
                className={`btn-option ${selectedOptions["Do you manage your employees' diversity of ages, gender, and nationality?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
              </div>
            </section>
        </div>

        <div className="form-actions">
          <Link to="/environmental-5" className="btn-secondary">
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

export default Social1;
