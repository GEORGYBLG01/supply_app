import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import NavItems3 from "../NavItems3";
import NavItems2 from "../NavItems2";
import Avatars from "../Avatars";
import Toggle from "../Toggle";
import HeaderMenuDefault6 from "../HeaderMenuDefault6";
import HeaderMenuDefault5 from "../HeaderMenuDefault5";
import HeaderMenuDefault from "../HeaderMenuDefault";
import HeaderMenuDefault7 from "../HeaderMenuDefault7";
import Group102 from "../Group102";
import "./Modernization.css";
import "../../styleguide.css";
export let m_allData = [];
export let m_yesCount = 0;

function Modernization(props) {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [yesCount, setYesCount] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const {
    x1200PxLogo_Icam__20081,
    admin,
    pleaseAnswerTheFollowingQuestions,
    label1,
    label2,
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
    inputType8,
    inputPlaceholder8,
    inputType9,
    inputPlaceholder9,
    inputType10,
    inputPlaceholder10,
    avatarsProps,
    toggle1Props,
    headerMenuDefault61Props,
    headerMenuDefault51Props,
    headerMenuDefault52Props,
    headerMenuDefaultProps,
    headerMenuDefault53Props,
    headerMenuDefault54Props,
    headerMenuDefault62Props,
    toggle2Props,
    group1021Props,
    group1022Props,
    group1023Props,
    group1024Props,
    group1025Props,
    toggle3Props,
    group1026Props,
    group1027Props,
    group1028Props,
    group1029Props,
    group10210Props,
    toggle4Props,
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
        m_yesCount--;
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
      m_yesCount++;
    }
    // Si on passe de "Yes" à "No", on décrémente le score
    else if (option === "No" && previousOption === "Yes") {
      m_yesCount--;
    }
  }

  const history = useHistory();

  function saveData() {
    const sections = document.getElementsByTagName("section");
    const data = [];

    for (let section of sections) {
      const question = section.querySelector('.question-text').textContent;
      const enabledButton = section.querySelector(".enabled");
      if (enabledButton) {
        const enabledValue = enabledButton.textContent.trim();
        data.push({ question, answer: enabledValue });
      }
    }

    // Mettre à jour m_allData
    m_allData = [...data];
    console.log("Collected Data:", m_allData);
    
    // Sauvegarder les données en base de données
    const enterpriseId = localStorage.getItem("enterpriseId") || "";
    const userId = localStorage.getItem("userId") || "";
    
    // Préparation des données pour l'API
    const apiData = data.map(item => ({
      ...item,
      category: "modernization",
      section: "modernization-1",
      enterpriseId: enterpriseId,
      userId: userId,
      timestamp: new Date().toISOString()
    }));
    
    // Appel API pour sauvegarder les données
    fetch(window.env.API_URL + "/api/save-answers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token") ? `Bearer ${localStorage.getItem("token")}` : "",
      },
      body: JSON.stringify(apiData),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
      console.log("Data saved successfully:", data);
      // Redirection vers la page suivante après sauvegarde réussie
      history.push("/modernization-2");
    })
    .catch(error => {
      console.error("Error saving data:", error);
      // Afficher un message d'erreur
      setErrorMessage("Error saving data. Please try again.");
      // Continuer quand même vers la page suivante en cas d'erreur
      history.push("/modernization-2");
    });
  }

  function calculateProgressPercentage() {
    if (totalQuestions === 0) return 0;
    return Math.round((yesCount / totalQuestions) * 100);
  }

  return (
    <div className="modernization-container">
      <div className="modernization-header">
          <Link to="/home">
            <img
            className="logo-icam"
              src={x1200PxLogo_Icam__20081}
            alt="ICAM Logo"
            />
          </Link>
        <div className="nav-container">
          <NavItems3
            className={navItems3Props?.className}
            frame1172Props={navItems3Props?.frame1172Props}
            frame1162Props={navItems3Props?.frame1162Props}
            frame1132Props={navItems3Props?.frame1132Props}
          />
          <NavItems2 />
        </div>
        {avatarsProps && (
          <div className="user-info">
            <div className="admin-text">{admin}</div>
          <Avatars ellipse83={avatarsProps.ellipse83} ellipse81={avatarsProps.ellipse81} />
          </div>
        )}
      </div>

      <div className="modernization-content">
        <h1 className="modernization-title">
          {pleaseAnswerTheFollowingQuestions || "MODERNIZATION ASSESSMENT"}
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
            Your score: {yesCount} / {totalQuestions} ({calculateProgressPercentage()}%)
          </p>
        </div>

        <div className="questions-container">
          <section className="question-card">
            <p className="question-text">Do you use an ERP?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Do you use an ERP?", "Yes")} 
                className={`btn-option ${selectedOptions["Do you use an ERP?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Do you use an ERP?", "No")} 
                className={`btn-option ${selectedOptions["Do you use an ERP?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
            </div>
          </section>

          <section className="question-card">
            <p className="question-text">Do you use this ERP to place orders?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Do you use this ERP to place orders?", "Yes")} 
                className={`btn-option ${selectedOptions["Do you use this ERP to place orders?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Do you use this ERP to place orders?", "No")} 
                className={`btn-option ${selectedOptions["Do you use this ERP to place orders?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
            </div>
          </section>
          
          <section className="question-card">
            <p className="question-text">What communication channel do you use within the company?</p>
            <div className="question-actions">
              <input 
                type="text" 
                className="form-input" 
                placeholder="Enter your answer" 
                value={selectedOptions["What communication channel do you use within the company?"] || ""} 
                onChange={(e) => setSelectedOptions({
                  ...selectedOptions,
                  "What communication channel do you use within the company?": e.target.value
                })}
              />
            </div>
          </section>
          
          <section className="question-card">
            <p className="question-text">Do you use robots in your production process?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Do you use robots in your production process?", "Yes")} 
                className={`btn-option ${selectedOptions["Do you use robots in your production process?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Do you use robots in your production process?", "No")} 
                className={`btn-option ${selectedOptions["Do you use robots in your production process?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
            </div>
          </section>

          <section className="question-card">
            <p className="question-text">Do you use RPA (Robotic Process Automation)?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Do you use RPA (Robotic Process Automation)?", "Yes")} 
                className={`btn-option ${selectedOptions["Do you use RPA (Robotic Process Automation)?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Do you use RPA (Robotic Process Automation)?", "No")} 
                className={`btn-option ${selectedOptions["Do you use RPA (Robotic Process Automation)?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
            </div>
          </section>

          <section className="question-card">
            <p className="question-text">Do you model your processes in 3D for better visibility?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Do you model your processes in 3D for better visibility?", "Yes")} 
                className={`btn-option ${selectedOptions["Do you model your processes in 3D for better visibility?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Do you model your processes in 3D for better visibility?", "No")} 
                className={`btn-option ${selectedOptions["Do you model your processes in 3D for better visibility?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
            </div>
          </section>
        </div>

        <div className="navigation-options">
          <div className="nav-items-options">
              <a href="javascript:SubmitForm('form19')">
              <div className="nav-link-option">{label1}</div>
              </a>
              <HeaderMenuDefault6>{headerMenuDefault61Props.children}</HeaderMenuDefault6>
              <HeaderMenuDefault5 className={headerMenuDefault51Props.className}>
                {headerMenuDefault51Props.children}
              </HeaderMenuDefault5>
              <HeaderMenuDefault5 className={headerMenuDefault52Props.className}>
                {headerMenuDefault52Props.children}
              </HeaderMenuDefault5>
              <a href="javascript:SubmitForm('form19')">
              <div className="nav-link-option">
                  <HeaderMenuDefault>{headerMenuDefaultProps.children}</HeaderMenuDefault>
                </div>
              </a>
            </div>
          </div>
        
        <div className="form-actions">
          <div className="toggle-wrapper">
            <Toggle className={toggle1Props.className} buttonSecondaryProps={toggle1Props.buttonSecondaryProps} />
          </div>
          <Link to="/home" className="btn-secondary">
            Back to Home
          </Link>
          <button onClick={saveData} className="btn-primary">
            Continue to Next Section
          </button>
          <div className="toggle-wrapper">
            <Toggle className={toggle4Props.className} buttonSecondaryProps={toggle4Props.buttonSecondaryProps} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modernization;
