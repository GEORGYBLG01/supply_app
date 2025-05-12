import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import NavItems3 from "../NavItems3";
import NavItems2 from "../NavItems2";
import Toggle from "../Toggle";
import "./Environmental5.css";
import "../../styleguide.css";
import jsPDF from "jspdf";
import { e_allData1, yes_Count1 } from "../Environmental1";
import { e_allData2, yes_Count2 } from "../Environmental2";
import { e_allData3, yes_Count3 } from "../Environmental3";
import { e_allData4, yes_Count4 } from "../Environmental4";
export let e_sum = 0;
export let yes_Count5 = 0;
export let e_yesCount5 = 0;

function Environmental5(props) {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [yesCount5, setYesCount5] = useState(0); // Initialize yesCount state
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [isLoading, setIsLoading] = useState(false); // Ajout de l'état isLoading manquant
  const {
    x1200PxLogo_Icam__20082,
    socialCriteria,
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

  //let e_yesCount5 = 0;
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
        e_yesCount5--;
        yes_Count5 = e_yesCount5; // Synchroniser les deux variables
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
      e_yesCount5++;
      yes_Count5 = e_yesCount5; // Synchroniser les deux variables
    }
    // Si on passe de "Yes" à "No", on décrémente le score
    else if (option === "No" && previousOption === "Yes") {
      e_yesCount5--;
      yes_Count5 = e_yesCount5; // Synchroniser les deux variables
    }
  }

  const history = useHistory();
  let e_allData5 = [];

  function saveData() {
    setIsLoading(true);
    setErrorMessage("");
    
    console.log("Début de sauvegarde des données Environmental5");
    
    const enterpriseId = localStorage.getItem("enterpriseId");
    const userId = localStorage.getItem("userId");
    
    if (!enterpriseId) {
      console.error("ERREUR: ID d'entreprise manquant");
      setErrorMessage("ID d'entreprise manquant. Veuillez retourner à la sélection d'entreprise.");
      setIsLoading(false);
      return;
    }

    // Définir toutes les questions possibles pour Environmental5
    const allQuestions = [
      "Are you implementing environmental management tools?",
      "Do you have environmental certifications?",
      "Have you had environmental non-compliance issues in the past 3 years?",
      "Have you communicated with your community about potential negative impacts of your activities?",
      "Do you communicate about environmental issues with your suppliers?"
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
        section: "environmental-5",
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
    
    e_allData5 = [...data]; // Sauvegarder les données pour le PDF
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
      
      // Calculer le score total environnemental
      e_sum = yes_Count1 + yes_Count2 + yes_Count3 + yes_Count4 + yes_Count5;
      console.log("Score total environnemental calculé:", e_sum);
      
      // Sauvegarder le score dans le localStorage
      localStorage.setItem('environmental5Score', yes_Count5);
      console.log(`Score environmental5 mis à jour: ${yes_Count5}`);
      
      // Sauvegarder le score total environnemental
      const scoreData = [{
        question: "Environmental Total Score",
        answer: e_sum.toString(),
        category: "environmental",
        enterpriseId: enterpriseId,
        userId: userId || "",
        section: "environmental-total",
        timestamp: new Date().toISOString()
      }];
      
      console.log("Envoi du score total:", JSON.stringify(scoreData, null, 2));
      
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
      console.log("Score total enregistré avec succès:", scoreResponse);
      
      // Récupérer correctement les données de tous les composants
      const allEnvironmentalData = [];
      
      // Utiliser des try/catch pour éviter les erreurs si certaines données sont manquantes
      try {
        if (Array.isArray(e_allData1) && e_allData1.length > 0) allEnvironmentalData.push(...e_allData1);
        if (Array.isArray(e_allData2) && e_allData2.length > 0) allEnvironmentalData.push(...e_allData2);
        if (Array.isArray(e_allData3) && e_allData3.length > 0) allEnvironmentalData.push(...e_allData3);
        if (Array.isArray(e_allData4) && e_allData4.length > 0) allEnvironmentalData.push(...e_allData4);
        if (Array.isArray(e_allData5) && e_allData5.length > 0) allEnvironmentalData.push(...e_allData5);
      } catch (error) {
        console.error("Erreur lors de la concaténation des données:", error);
      }
      
      console.log("Toutes les données environnementales pour le PDF:", allEnvironmentalData.length, "questions");
      
      // Générer le PDF avec toutes les données environnementales
      generatePdf(allEnvironmentalData);
      
      // Redirection vers la page suivante après sauvegarde réussie
      setIsLoading(false);
      history.push("/social-1");
    })
    .catch(error => {
      console.error("Error saving data:", error);
      setErrorMessage("Error saving data. Please try again.");
      console.error("Détails de l'erreur:", error.message);
      
      // Même en cas d'erreur, essayer de générer le PDF avec les données disponibles
      const allEnvironmentalData = [];
      try {
        if (Array.isArray(e_allData1) && e_allData1.length > 0) allEnvironmentalData.push(...e_allData1);
        if (Array.isArray(e_allData2) && e_allData2.length > 0) allEnvironmentalData.push(...e_allData2);
        if (Array.isArray(e_allData3) && e_allData3.length > 0) allEnvironmentalData.push(...e_allData3);
        if (Array.isArray(e_allData4) && e_allData4.length > 0) allEnvironmentalData.push(...e_allData4);
        if (Array.isArray(e_allData5) && e_allData5.length > 0) allEnvironmentalData.push(...e_allData5);
      } catch (error) {
        console.error("Erreur lors de la concaténation des données:", error);
      }
      
      generatePdf(allEnvironmentalData);
      
      // Redirection malgré l'erreur
      setIsLoading(false);
      history.push("/social-1");
    });
  }

  function generatePdf(e_allData) {
    // Vérifier si des données existent
    if (!e_allData || e_allData.length === 0) {
      console.error("Aucune donnée disponible pour générer le PDF");
      return;
    }
    
    console.log("Génération du PDF avec", e_allData.length, "questions");
    
    // Créer un nouveau document PDF
    const doc = new jsPDF();
    const lineHeight = 10;
    const pageHeight = doc.internal.pageSize.height - 20;
    const pageWidth = doc.internal.pageSize.width - 20;
    let y = 20;

    // Ajouter un titre
    doc.setFontSize(16);
    doc.text("Environmental Assessment Results", 105, y, { align: "center" });
    y += 15;
    
    // Ajouter le score total
    doc.setFontSize(14);
    doc.text(`Total Score: ${e_sum} / ${e_allData.length}`, 105, y, { align: "center" });
    y += 15;
    
    doc.setFontSize(12);

    // Parcourir les données dans e_allData et ajouter chaque question et réponse au document PDF
    e_allData.forEach((data, index) => {
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
      
      // Vérifier si la position y actuelle plus la hauteur de la question dépasse la hauteur maximale de la page
      if (y + estimatedHeight > pageHeight) {
        // Ajouter une nouvelle page et réinitialiser la position y
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
    doc.text("Summary of Environmental Assessment", 105, y, { align: "center" });
    y += 20;
    
    doc.setFontSize(12);
    doc.text(`Total number of questions: ${e_allData.length}`, 10, y);
    y += lineHeight;
    doc.text(`Total "Yes" answers: ${e_sum}`, 10, y);
    y += lineHeight;
    doc.text(`Score percentage: ${Math.round((e_sum / e_allData.length) * 100)}%`, 10, y);
    y += lineHeight * 2;
    
    const date = new Date();
    doc.text(`Generated on: ${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`, 10, y);

    // Enregistrer le document PDF
    doc.save("Environmental_Assessment_Complete.pdf");
    console.log("PDF environnemental généré avec succès");
  }

  return (
    <div className="environmental-container">
      <div className="environmental-header">
        <Link to="/home">
          <img
            className="logo-icam"
            src="/img/1200px-logo-icam---2008-1@2x.png"
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
            Your score: {yes_Count5} / {totalQuestions} ({Math.round((yes_Count5 / totalQuestions) * 100) || 0}%)
          </p>
        </div>

        <div className="questions-container">
          <section className="question-card">
            <p className="question-text">Are you implementing environmental management tools?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Are you implementing environmental management tools?", "Yes")} 
                className={`btn-option ${selectedOptions["Are you implementing environmental management tools?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Are you implementing environmental management tools?", "No")} 
                className={`btn-option ${selectedOptions["Are you implementing environmental management tools?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
            </div>
          </section>

          <section className="question-card">
            <p className="question-text">Do you have environmental certifications?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Do you have environmental certifications?", "Yes")} 
                className={`btn-option ${selectedOptions["Do you have environmental certifications?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Do you have environmental certifications?", "No")} 
                className={`btn-option ${selectedOptions["Do you have environmental certifications?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
            </div>
          </section>

          <section className="question-card">
            <p className="question-text">Have you had environmental non-compliance issues in the past 3 years?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Have you had environmental non-compliance issues in the past 3 years?", "Yes")} 
                className={`btn-option ${selectedOptions["Have you had environmental non-compliance issues in the past 3 years?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Have you had environmental non-compliance issues in the past 3 years?", "No")} 
                className={`btn-option ${selectedOptions["Have you had environmental non-compliance issues in the past 3 years?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
            </div>
          </section>

          <section className="question-card">
            <p className="question-text">Have you communicated with your community about potential negative impacts of your activities?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Have you communicated with your community about potential negative impacts of your activities?", "Yes")} 
                className={`btn-option ${selectedOptions["Have you communicated with your community about potential negative impacts of your activities?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Have you communicated with your community about potential negative impacts of your activities?", "No")} 
                className={`btn-option ${selectedOptions["Have you communicated with your community about potential negative impacts of your activities?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
            </div>
          </section>

          <section className="question-card">
            <p className="question-text">Do you communicate about environmental issues with your suppliers?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Do you communicate about environmental issues with your suppliers?", "Yes")} 
                className={`btn-option ${selectedOptions["Do you communicate about environmental issues with your suppliers?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Do you communicate about environmental issues with your suppliers?", "No")} 
                className={`btn-option ${selectedOptions["Do you communicate about environmental issues with your suppliers?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
            </div>
          </section>
        </div>

        <div className="form-actions">
          <Link to="/environmental-4" className="btn-secondary">
            Back
          </Link>
          <button onClick={saveData} className="btn-primary">
          Submit Environmental Assessment
          </button>
        </div>

        {isLoading && (
          <div className="loading-indicator">
            <div className="spinner"></div>
            <p>Enregistrement des données en cours...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Environmental5;
