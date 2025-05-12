import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import NavItems3 from "../NavItems3";
import Frame113 from "../Frame113";
import Frame114 from "../Frame114";
import Frame115 from "../Frame115";
import Frame116 from "../Frame116";
import Frame117 from "../Frame117";
import "./Environmental1.css";
import "../../styleguide.css";

// Variables pour stocker les données en dehors du composant
export let e_allData1 = [];
export let yes_Count1 = 0;
export let e_final = 0;
export let e_yesCount1 = 0;

function Environmental1(props) {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [yesCount1, setYesCount1] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  
  const {
    x1200PxLogo_Icam__20081,
    navItems3Props,
    frame113Props,
    frame117Props,
  } = props;

  const history = useHistory();

  useEffect(() => {
    const sections = document.getElementsByTagName("section");
    setTotalQuestions(sections.length);
  }, []);

  function clicked(question, option) {
    if (selectedOptions[question] === option) {
      setSelectedOptions((prevSelectedOptions) => {
        const newOptions = { ...prevSelectedOptions };
        delete newOptions[question];
        return newOptions;
      });
      if (option === "Yes") {
        yes_Count1--;
      }
      return;
    }

    const previousOption = selectedOptions[question];
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [question]: option,
    }));
    
    if (option === "Yes" && previousOption !== "Yes") {
      yes_Count1++;
    }
    else if (option === "No" && previousOption === "Yes") {
      yes_Count1--;
    }
  }

  function saveData() {
    setIsSaving(true);
    setErrorMessage("");
    
    console.log("Début de sauvegarde des données Environmental1");
    
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
      "Do you have a policy for reducing greenhouse gas emissions?",
      "Do you monitor and report your carbon footprint?",
      "Do you use renewable energy sources in your operations?"
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
        section: "environmental-1",
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
      localStorage.setItem('environmental1Score', yes_Count1);
      console.log(`Score environmental1 mis à jour: ${yes_Count1}`);
      
      setIsSaving(false);
      history.push("/environmental-2");
    })
    .catch(error => {
      console.error("Error saving data:", error);
      setErrorMessage("Error saving data. Please try again.");
      console.error("Détails de l'erreur:", error.message);
      setIsSaving(false);
      history.push("/environmental-2");
    });
  }

  function calculateProgressPercentage() {
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
            <p className="question-text">Do you have a policy for reducing greenhouse gas emissions?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Do you have a policy for reducing greenhouse gas emissions?", "Yes")} 
                className={`btn-option ${selectedOptions["Do you have a policy for reducing greenhouse gas emissions?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Do you have a policy for reducing greenhouse gas emissions?", "No")} 
                className={`btn-option ${selectedOptions["Do you have a policy for reducing greenhouse gas emissions?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
            </div>
          </section>

          <section className="question-card">
            <p className="question-text">Do you monitor and report your carbon footprint?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Do you monitor and report your carbon footprint?", "Yes")} 
                className={`btn-option ${selectedOptions["Do you monitor and report your carbon footprint?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Do you monitor and report your carbon footprint?", "No")} 
                className={`btn-option ${selectedOptions["Do you monitor and report your carbon footprint?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
            </div>
          </section>

          <section className="question-card">
            <p className="question-text">Do you use renewable energy sources in your operations?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Do you use renewable energy sources in your operations?", "Yes")} 
                className={`btn-option ${selectedOptions["Do you use renewable energy sources in your operations?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Do you use renewable energy sources in your operations?", "No")} 
                className={`btn-option ${selectedOptions["Do you use renewable energy sources in your operations?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
            </div>
          </section>
        </div>

        <div className="form-actions">
          <Link to="/social-6" className="btn-secondary">
            Back
          </Link>
          <button 
            onClick={saveData} 
            className="btn-primary"
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Continue to Next Section"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Environmental1;
