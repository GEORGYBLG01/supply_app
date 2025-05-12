import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import NavItems2 from "../NavItems2";
import NavItems3 from "../NavItems3";
import Toggle from "../Toggle";
import Frame136 from "../Frame136";
import Frame144 from "../Frame144";
import Frame11732 from "../Frame11732";
import "./Cost1.css";
import "../../styleguide.css";
export let c_allData1 = [];
export let c_yesCount1 = 0;

function Cost1(props) {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const {
    x1200PxLogo_Icam__20081,
    pleaseAnswerTheFollowingQuestions,
    navItems2Props,
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
        c_yesCount1--;
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
      c_yesCount1++;
    }
    // Si on passe de "Yes" à "No", on décrémente le score
    else if (option === "No" && previousOption === "Yes") {
      c_yesCount1--;
    }
  }

  const history = useHistory();

  function saveData() {
    setIsLoading(true);
    setErrorMessage("");
    
    console.log("Début de sauvegarde des données Cost1");
    
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
      "Do you have a follow-up of raw materials, stocks... (ex: ERP)?",
      "Do you have a current average cost price?",
      "Do you have a margin calculation?",
      "Do you have a material replenishment system?",
      "Do you have dedicated resources who are responsible for purchasing and managing inventory?",
      "Do you have a method of receiving orders and forecasts from your customers?",
      "Do you have a specific system to monitor profitability?",
      "Do you have defined KPIs for cost efficiency?",
      "Do you carry out periodic stock inventory control?"
    ];

    // Créer un tableau de questions/réponses pour toutes les questions
    const data = allQuestions.map(question => {
      const answer = selectedOptions[question] || "No";
      return {
        question: question,
        answer: answer,
        category: "cost",
        enterpriseId: enterpriseId,
        userId: userId || "",
        section: "cost-1",
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
    c_allData1 = [...data];
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
      localStorage.setItem('cost1Score', c_yesCount1);
      console.log(`Score cost1 mis à jour: ${c_yesCount1}`);
      
      setIsLoading(false);
      history.push("/cost-2");
    })
    .catch(error => {
      console.error("Error saving data:", error);
      setErrorMessage("Error saving data. Please try again.");
      console.error("Détails de l'erreur:", error.message);
      setIsLoading(false);
      history.push("/cost-2");
    });
  }

  function calculateProgressPercentage() {
    if (totalQuestions === 0) return 0;
    return Math.round((c_yesCount1 / totalQuestions) * 100);
  }

  return (
    <div className="environmental-container">
      <div className="environmental-header">
        <Link to="/home">
          <img
            className="logo-icam"
            src={x1200PxLogo_Icam__20081}
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
          <NavItems2 className={navItems2Props.className} />
        </div>
      </div>

      <div className="environmental-content">
        <h1 className="environmental-title">
          {pleaseAnswerTheFollowingQuestions || "COST ASSESSMENT"}
        </h1>
        
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        
        <div className="progress-container">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{width: `${calculateProgressPercentage()}%`}}
            ></div>
          </div>
          <p className="progress-text">
            Your score: {c_yesCount1} / {totalQuestions} ({calculateProgressPercentage()}%)
          </p>
        </div>

        <div className="questions-container">
          <section className="question-card">
            <p className="question-text">Do you have a follow-up of raw materials, stocks... (ex: ERP)?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Do you have a follow-up of raw materials, stocks... (ex: ERP)?", "Yes")} 
                className={`btn-option ${selectedOptions["Do you have a follow-up of raw materials, stocks... (ex: ERP)?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Do you have a follow-up of raw materials, stocks... (ex: ERP)?", "No")} 
                className={`btn-option ${selectedOptions["Do you have a follow-up of raw materials, stocks... (ex: ERP)?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
              </div>
            </section>

          <section className="question-card">
            <p className="question-text">Do you have a current average cost price?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Do you have a current average cost price?", "Yes")} 
                className={`btn-option ${selectedOptions["Do you have a current average cost price?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Do you have a current average cost price?", "No")} 
                className={`btn-option ${selectedOptions["Do you have a current average cost price?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
              </div>
            </section>
          
          <section className="question-card">
            <p className="question-text">Are your raw material costs fixed?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Are your raw material costs fixed?", "Yes")} 
                className={`btn-option ${selectedOptions["Are your raw material costs fixed?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Are your raw material costs fixed?", "No")} 
                className={`btn-option ${selectedOptions["Are your raw material costs fixed?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
              </div>
            </section>

          <section className="question-card">
            <p className="question-text">Do you use the FIFO method?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Do you use the FIFO method?", "Yes")} 
                className={`btn-option ${selectedOptions["Do you use the FIFO method?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Do you use the FIFO method?", "No")} 
                className={`btn-option ${selectedOptions["Do you use the FIFO method?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
              </div>
            </section>

          <section className="question-card">
            <p className="question-text">Do you analyse stock data in real time?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Do you analyse stock data in real time?", "Yes")} 
                className={`btn-option ${selectedOptions["Do you analyse stock data in real time?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Do you analyse stock data in real time?", "No")} 
                className={`btn-option ${selectedOptions["Do you analyse stock data in real time?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
              </div>
            </section>

          <section className="question-card">
            <p className="question-text">Do you have a rounding stock system to make the most of the space?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Do you have a rounding stock system to make the most of the space?", "Yes")} 
                className={`btn-option ${selectedOptions["Do you have a rounding stock system to make the most of the space?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Do you have a rounding stock system to make the most of the space?", "No")} 
                className={`btn-option ${selectedOptions["Do you have a rounding stock system to make the most of the space?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
              </div>
            </section>

          <section className="question-card">
            <p className="question-text">In case of shortage, do you have a safety stock?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("In case of shortage, do you have a safety stock?", "Yes")} 
                className={`btn-option ${selectedOptions["In case of shortage, do you have a safety stock?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("In case of shortage, do you have a safety stock?", "No")} 
                className={`btn-option ${selectedOptions["In case of shortage, do you have a safety stock?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
              </div>
            </section>

          <section className="question-card">
            <p className="question-text">Calculation of the cost of the stock?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Calculation of the cost of the stock?", "Yes")} 
                className={`btn-option ${selectedOptions["Calculation of the cost of the stock?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Calculation of the cost of the stock?", "No")} 
                className={`btn-option ${selectedOptions["Calculation of the cost of the stock?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
              </div>
            </section>
        </div>

        <div className="form-actions">
          <Link to="/home" className="btn-secondary">
            Back to Home
          </Link>
          <button onClick={saveData} className="btn-primary">
            Continue to Next Section
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

export default Cost1;
