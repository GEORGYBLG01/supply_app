import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import NavItems2 from "../NavItems2";
import NavItems3 from "../NavItems3";
import "./Modernization4.css";
import "../../styleguide.css";
import jsPDF from "jspdf";
import { m_allData1, m_yesCount1 } from "../Modernization1";
import { m_allData2, m_yesCount2 } from "../Modernization2";
import { m_allData3, m_yesCount3 } from "../Modernization3";
export let m_sum = 0;
export let m_yesCount4 = 0;
export let m_allData4 = [];

function Modernization4(props) {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    x1200PxLogo_Icam__20081,
    navItems2Props,
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
        m_yesCount4--;
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
      m_yesCount4++;
    }
    // Si on passe de "Yes" à "No", on décrémente le score
    else if (option === "No" && previousOption === "Yes") {
      m_yesCount4--;
    }
  }

  const history = useHistory();

  function saveData() {
    setIsLoading(true);
    setErrorMessage("");
    
    console.log("Début de sauvegarde des données Modernization4");
    
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
      "Are your different systems able to communicate with each other?",
      "Do you have any means of communication?",
      "Is it paper?",
      "Is it oral?",
      "Is it by mail?",
      "Is it an Application Suite like Google, Microsoft?",
      "Is the data produced used to make decisions?",
      "Do operators have access to an intelligent user interface?"
    ];

    // Créer un tableau de questions/réponses pour toutes les questions
    const data = allQuestions.map(question => {
      const answer = selectedOptions[question] || "No";
      return {
        question: question,
        answer: answer,
        category: "modernization",
        enterpriseId: enterpriseId,
        userId: userId || "",
        section: "modernization-4",
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
    m_allData4 = [...data];
    console.log("Données à envoyer:", JSON.stringify(data, null, 2));
    
    // Calculer la somme des scores
    const modernization1Score = parseInt(localStorage.getItem('modernization1Score') || 0);
    const modernization2Score = parseInt(localStorage.getItem('modernization2Score') || 0);
    const modernization3Score = parseInt(localStorage.getItem('modernization3Score') || 0);
    m_sum = modernization1Score + modernization2Score + modernization3Score + m_yesCount4;
    console.log("Score total Modernization:", m_sum);
    
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
      localStorage.setItem('modernization4Score', m_yesCount4);
      console.log(`Score modernization4 mis à jour: ${m_yesCount4}`);
      
      // Sauvegarder également le score total modernization
      const scoreData = [{
        question: "Modernization Total Score Final",
        answer: m_sum.toString(),
        category: "modernization",
        enterpriseId: enterpriseId,
        userId: userId || "",
        section: "modernization-total-final",
        timestamp: new Date().toISOString()
      }];
      
      console.log("Envoi du score total modernization:", JSON.stringify(scoreData, null, 2));
      
      // Appel API pour sauvegarder le score total
      return fetch(window.env.API_URL + "/api/save-answers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("token") ? `Bearer ${localStorage.getItem("token")}` : "",
        },
        body: JSON.stringify(scoreData),
      });
    })
    .then(response => {
      if (!response || !response.ok) {
        throw new Error("Failed to save total score");
      }
      return response.json();
    })
    .then(scoreResponse => {
      console.log("Score total modernization enregistré avec succès:", scoreResponse);
      
      // Récupérer correctement les données de tous les composants
      const allModernizationData = [];
      
      // Utiliser des try/catch pour éviter les erreurs si certaines données sont manquantes
      try {
        if (Array.isArray(m_allData1) && m_allData1.length > 0) allModernizationData.push(...m_allData1);
        if (Array.isArray(m_allData2) && m_allData2.length > 0) allModernizationData.push(...m_allData2);
        if (Array.isArray(m_allData3) && m_allData3.length > 0) allModernizationData.push(...m_allData3);
        if (Array.isArray(m_allData4) && m_allData4.length > 0) allModernizationData.push(...m_allData4);
      } catch (error) {
        console.error("Erreur lors de la concaténation des données:", error);
      }
      
      console.log("Toutes les données Modernization pour le PDF:", allModernizationData.length, "questions");
      
      // Générer le PDF avec toutes les données
      generatePdf(allModernizationData);
      
      // Redirection vers la page suivante
      setIsLoading(false);
      history.push("/lead-time-1");
    })
    .catch(error => {
      console.error("Error saving data:", error);
      setErrorMessage("Error saving data. Please try again.");
      console.error("Détails de l'erreur:", error.message);
      
      // Même en cas d'erreur, essayer de générer le PDF avec les données disponibles
      const allModernizationData = [];
      try {
        if (Array.isArray(m_allData1) && m_allData1.length > 0) allModernizationData.push(...m_allData1);
        if (Array.isArray(m_allData2) && m_allData2.length > 0) allModernizationData.push(...m_allData2);
        if (Array.isArray(m_allData3) && m_allData3.length > 0) allModernizationData.push(...m_allData3);
        if (Array.isArray(m_allData4) && m_allData4.length > 0) allModernizationData.push(...m_allData4);
      } catch (error) {
        console.error("Erreur lors de la concaténation des données:", error);
      }
      
      generatePdf(allModernizationData);
      
      // Redirection malgré l'erreur
      setIsLoading(false);
      history.push("/lead-time-1");
    });
  }

  function generatePdf(m_allData) {
    // Vérifier si des données existent
    if (!m_allData || m_allData.length === 0) {
      console.error("Aucune donnée disponible pour générer le PDF");
      return;
    }
    
    console.log("Génération du PDF avec", m_allData.length, "questions");
    
    // Créer un nouveau document PDF
    const doc = new jsPDF();
    const lineHeight = 10;
    const pageHeight = doc.internal.pageSize.height - 20;
    const pageWidth = doc.internal.pageSize.width - 20;
    let y = 20;

    // Ajouter un titre
    doc.setFontSize(16);
    doc.text("Modernization Assessment Results", 105, y, { align: "center" });
    y += 15;
    
    // Ajouter le score total
    doc.setFontSize(14);
    doc.text(`Total Score: ${m_sum} / ${m_allData.length}`, 105, y, { align: "center" });
    y += 15;
    
    doc.setFontSize(12);
    
    // Parcourir les données et ajouter chaque question et réponse au document PDF
    m_allData.forEach((data, index) => {
      // Vérifier si les données sont valides
      if (!data || !data.question) {
        console.error("Données invalides pour l'élément", index);
        return;
      }
      
      const question = `Question ${index + 1}: ${data.question}`;
      const answer = `Answer: ${data.answer || 'No answer'}`;

      // Estimer la hauteur du texte après division pour mieux gérer les sauts de page
      const splitQuestion = doc.splitTextToSize(question, pageWidth);
      const estimatedHeight = splitQuestion.length * lineHeight + lineHeight * 2;
      
      // Vérifier si on doit passer à une nouvelle page
      if (y + estimatedHeight > pageHeight) {
        doc.addPage();
        y = 20;
      }

      // Écrire la question et la réponse dans le PDF
      doc.text(splitQuestion, 10, y);
      y += splitQuestion.length * lineHeight;

      doc.text(answer, 10, y);
      y += lineHeight * 2; // Ajouter un peu d'espace entre les questions
    });

    // Ajouter une page de résumé
    doc.addPage();
    y = 20;
    doc.setFontSize(16);
    doc.text("Summary of Modernization Assessment", 105, y, { align: "center" });
    y += 20;
    
    doc.setFontSize(12);
    doc.text(`Total number of questions: ${m_allData.length}`, 10, y);
    y += lineHeight;
    doc.text(`Total "Yes" answers: ${m_sum}`, 10, y);
    y += lineHeight;
    doc.text(`Score percentage: ${Math.round((m_sum / m_allData.length) * 100)}%`, 10, y);
    y += lineHeight * 2;
    
    const date = new Date();
    doc.text(`Generated on: ${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`, 10, y);

    // Enregistrer le document PDF
    doc.save("Modernization_Assessment_Complete.pdf");
    console.log("PDF Modernization généré avec succès");
  }

  function calculateProgressPercentage() {
    const totalQuestionsCount = document.getElementsByTagName("section").length;
    if (totalQuestionsCount === 0) return 0;
    return Math.round((m_yesCount4 / totalQuestionsCount) * 100);
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
            Your score: {m_yesCount4} / {totalQuestions} ({calculateProgressPercentage()}%)
          </p>
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <div className="questions-container">
          <section className="question-card">
            <p className="question-text">Are your different systems able to communicate with each other?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Are your different systems able to communicate with each other?", "Yes")} 
                className={`btn-option ${selectedOptions["Are your different systems able to communicate with each other?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Are your different systems able to communicate with each other?", "No")} 
                className={`btn-option ${selectedOptions["Are your different systems able to communicate with each other?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
              </div>
            </section>

          <section className="question-card">
            <p className="question-text">Do you have any means of communication?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Do you have any means of communication?", "Yes")} 
                className={`btn-option ${selectedOptions["Do you have any means of communication?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Do you have any means of communication?", "No")} 
                className={`btn-option ${selectedOptions["Do you have any means of communication?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
              </div>
            </section>

          <section className="question-card">
            <p className="question-text">Is it paper?</p>
            <div className="question-actions">
              <button 
                  onClick={() => clicked("Is it paper?", "Yes")}
                className={`btn-option ${selectedOptions["Is it paper?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                  onClick={() => clicked("Is it paper?", "No")}
                className={`btn-option ${selectedOptions["Is it paper?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
              </div>
            </section>

          <section className="question-card">
            <p className="question-text">Is it oral?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Is it oral?", "Yes")} 
                className={`btn-option ${selectedOptions["Is it oral?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Is it oral?", "No")} 
                className={`btn-option ${selectedOptions["Is it oral?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
              </div>
            </section>

          <section className="question-card">
            <p className="question-text">Is it by mail?</p>
            <div className="question-actions">
              <button 
                  onClick={() => clicked("Is it by mail?", "Yes")}
                className={`btn-option ${selectedOptions["Is it by mail?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                  onClick={() => clicked("Is it by mail?", "No")}
                className={`btn-option ${selectedOptions["Is it by mail?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
              </div>
            </section>

          <section className="question-card">
            <p className="question-text">Is it an Application Suite like Google, Microsoft?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Is it an Application Suite like Google, Microsoft?", "Yes")} 
                className={`btn-option ${selectedOptions["Is it an Application Suite like Google, Microsoft?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Is it an Application Suite like Google, Microsoft?", "No")} 
                className={`btn-option ${selectedOptions["Is it an Application Suite like Google, Microsoft?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
              </div>
            </section>

          <section className="question-card">
            <p className="question-text">Is the data produced used to make decisions?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Is the data produced used to make decisions?", "Yes")} 
                className={`btn-option ${selectedOptions["Is the data produced used to make decisions?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Is the data produced used to make decisions?", "No")} 
                className={`btn-option ${selectedOptions["Is the data produced used to make decisions?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
              </div>
            </section>

          <section className="question-card">
            <p className="question-text">Do operators have access to an intelligent user interface?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Do operators have access to an intelligent user interface?", "Yes")} 
                className={`btn-option ${selectedOptions["Do operators have access to an intelligent user interface?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Do operators have access to an intelligent user interface?", "No")} 
                className={`btn-option ${selectedOptions["Do operators have access to an intelligent user interface?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
              </div>
            </section>
        </div>

        <div className="form-actions">
          <Link to="/modernization-3" className="btn-secondary">
            Back
          </Link>
          <button onClick={saveData} className="btn-primary">
            Complete Assessment and Continue
          </button>
        </div>

        {isLoading && (
          <div className="loading-indicator">
            <div className="spinner"></div>
            <p>Saving data and generating PDF...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Modernization4;
