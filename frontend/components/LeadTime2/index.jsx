import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import NavItems3 from "../NavItems3";
import NavItems2 from "../NavItems2";
import "./LeadTime2.css";
import "../../styleguide.css";
import jsPDF from "jspdf";
import { l_allData1, l_yesCount1 } from "../LeadTime1";
export let l_sum = 0;
export let l_allData2 = [];
export let l_yesCount2 = 0;

function LeadTime2(props) {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    x1200PxLogo_Ical__20081,
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
        l_yesCount2--;
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
      l_yesCount2++;
    }
    // Si on passe de "Yes" à "No", on décrémente le score
    else if (option === "No" && previousOption === "Yes") {
      l_yesCount2--;
    }
  }

  const history = useHistory();

  function saveData() {
    setIsLoading(true);
    setErrorMessage("");
    
    console.log("Début de sauvegarde des données LeadTime2");
    
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
      "Are you experiencing production delays due to technical problems?",
      "Have measures been put in place to avoid these inconveniences?",
      "Are you experiencing delays in product (or service) delivery to your customers?",
      "Do you have shipping delay problems when delivering to your customers?",
      "Do you feel that your customers are satisfied with your delivery times?",
      "Are your customers accepting of your delivery times?"
    ];

    // Créer un tableau de questions/réponses pour toutes les questions
    const data = allQuestions.map(question => {
      const answer = selectedOptions[question] || "No";
      return {
        question: question,
        answer: answer,
        category: "leadTime",
        enterpriseId: enterpriseId,
        userId: userId || "",
        section: "leadtime-2",
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
    l_allData2 = [...data];
    console.log("Données à envoyer:", JSON.stringify(data, null, 2));
    
    // Calculer la somme des scores
    const leadTime1Score = parseInt(localStorage.getItem('leadTime1Score') || 0);
    l_sum = leadTime1Score + l_yesCount2;
    console.log("Score total Leadtime:", l_sum);
    
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
      localStorage.setItem('leadTime2Score', l_yesCount2);
      console.log(`Score leadTime2 mis à jour: ${l_yesCount2}`);
      
      // Sauvegarder également le score total leadtime
      const scoreData = [{
        question: "LeadTime Total Score Final",
        answer: l_sum.toString(),
        category: "leadTime",
        enterpriseId: enterpriseId,
        userId: userId || "",
        section: "leadtime-total-final",
        timestamp: new Date().toISOString()
      }];
      
      console.log("Envoi du score total leadTime:", JSON.stringify(scoreData, null, 2));
      
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
      console.log("Score total leadTime enregistré avec succès:", scoreResponse);
      
      // Récupérer correctement les données de tous les composants
      const allLeadtimeData = [];
      
      // Utiliser des try/catch pour éviter les erreurs si certaines données sont manquantes
      try {
        if (Array.isArray(l_allData1) && l_allData1.length > 0) allLeadtimeData.push(...l_allData1);
        if (Array.isArray(l_allData2) && l_allData2.length > 0) allLeadtimeData.push(...l_allData2);
      } catch (error) {
        console.error("Erreur lors de la concaténation des données:", error);
      }
      
      console.log("Toutes les données LeadTime pour le PDF:", allLeadtimeData.length, "questions");
      
      // Générer le PDF avec toutes les données
      generatePdf(allLeadtimeData);
      
      // Redirection vers la page suivante
      setIsLoading(false);
      history.push("/cost-1");
    })
    .catch(error => {
      console.error("Error saving data:", error);
      setErrorMessage("Error saving data. Please try again.");
      console.error("Détails de l'erreur:", error.message);
      
      // Même en cas d'erreur, essayer de générer le PDF avec les données disponibles
      const allLeadtimeData = [];
      try {
        if (Array.isArray(l_allData1) && l_allData1.length > 0) allLeadTimeData.push(...l_allData1);
        if (Array.isArray(l_allData2) && l_allData2.length > 0) allLeadTimeData.push(...l_allData2);
      } catch (error) {
        console.error("Erreur lors de la concaténation des données:", error);
      }
      
      generatePdf(allLeadtimeData);
      
      // Redirection malgré l'erreur
      setIsLoading(false);
      history.push("/cost-1");
    });
  }

  function generatePdf(l_allData) {
    // Vérifier si des données existent
    if (!l_allData || l_allData.length === 0) {
      console.error("Aucune donnée disponible pour générer le PDF");
      return;
    }
    
    console.log("Génération du PDF avec", l_allData.length, "questions");
    
    // Créer un nouveau document PDF
    const doc = new jsPDF();
    const lineHeight = 10;
    const pageHeight = doc.internal.pageSize.height - 20;
    const pageWidth = doc.internal.pageSize.width - 20;
    let y = 20;

    // Ajouter un titre
    doc.setFontSize(16);
    doc.text("Lead Time Assessment Results", 105, y, { align: "center" });
    y += 15;
    
    // Ajouter le score total
    doc.setFontSize(14);
    doc.text(`Total Score: ${l_sum} / ${l_allData.length}`, 105, y, { align: "center" });
    y += 15;
    
    doc.setFontSize(12);
    
    // Parcourir les données et ajouter chaque question et réponse au document PDF
    l_allData.forEach((data, index) => {
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
    doc.text("Summary of Lead Time Assessment", 105, y, { align: "center" });
    y += 20;
    
    doc.setFontSize(12);
    doc.text(`Total number of questions: ${l_allData.length}`, 10, y);
    y += lineHeight;
    doc.text(`Total "Yes" answers: ${l_sum}`, 10, y);
    y += lineHeight;
    doc.text(`Score percentage: ${Math.round((l_sum / l_allData.length) * 100)}%`, 10, y);
    y += lineHeight * 2;
    
    const date = new Date();
    doc.text(`Generated on: ${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`, 10, y);

    // Enregistrer le document PDF
    doc.save("LeadTime_Assessment_Complete.pdf");
    console.log("PDF Lead Time généré avec succès");
  }

  function calculateProgressPercentage() {
    const totalQuestions = document.getElementsByTagName("section").length;
    if (totalQuestions === 0) return 0;
    return Math.round((l_yesCount2 / totalQuestions) * 100);
  }

  return (
    <div className="environmental-container">
      <div className="environmental-header">
        <Link to="/home">
          <img
            className="logo-icam"
            src={x1200PxLogo_Ical__20081 || "../../assets/x1200PxLogo_Icam__20081.png"}
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
            Your score: {l_yesCount2} / {totalQuestions} ({calculateProgressPercentage()}%)
          </p>
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <div className="questions-container">
          <section className="question-card">
            <p className="question-text">Are you experiencing production delays due to technical problems?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Are you experiencing production delays due to technical problems?", "Yes")} 
                className={`btn-option ${selectedOptions["Are you experiencing production delays due to technical problems?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Are you experiencing production delays due to technical problems?", "No")} 
                className={`btn-option ${selectedOptions["Are you experiencing production delays due to technical problems?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
              </div>
            </section>

          <section className="question-card">
            <p className="question-text">Have measures been put in place to avoid these inconveniences?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Have measures been put in place to avoid these inconveniences?", "Yes")} 
                className={`btn-option ${selectedOptions["Have measures been put in place to avoid these inconveniences?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Have measures been put in place to avoid these inconveniences?", "No")} 
                className={`btn-option ${selectedOptions["Have measures been put in place to avoid these inconveniences?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
              </div>
            </section>

          <section className="question-card">
            <p className="question-text">Are you experiencing delays in product (or service) delivery to your customers?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Are you experiencing delays in product (or service) delivery to your customers?", "Yes")} 
                className={`btn-option ${selectedOptions["Are you experiencing delays in product (or service) delivery to your customers?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Are you experiencing delays in product (or service) delivery to your customers?", "No")} 
                className={`btn-option ${selectedOptions["Are you experiencing delays in product (or service) delivery to your customers?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
              </div>
            </section>

          <section className="question-card">
            <p className="question-text">Do you have shipping delay problems when delivering to your customers?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Do you have shipping delay problems when delivering to your customers?", "Yes")} 
                className={`btn-option ${selectedOptions["Do you have shipping delay problems when delivering to your customers?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Do you have shipping delay problems when delivering to your customers?", "No")} 
                className={`btn-option ${selectedOptions["Do you have shipping delay problems when delivering to your customers?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
              </div>
            </section>

          <section className="question-card">
            <p className="question-text">Do you feel that your customers are satisfied with your delivery times?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Do you feel that your customers are satisfied with your delivery times?", "Yes")} 
                className={`btn-option ${selectedOptions["Do you feel that your customers are satisfied with your delivery times?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Do you feel that your customers are satisfied with your delivery times?", "No")} 
                className={`btn-option ${selectedOptions["Do you feel that your customers are satisfied with your delivery times?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
              </div>
            </section>

          <section className="question-card">
            <p className="question-text">Are your customers accepting of your delivery times?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Are your customers accepting of your delivery times?", "Yes")} 
                className={`btn-option ${selectedOptions["Are your customers accepting of your delivery times?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Are your customers accepting of your delivery times?", "No")} 
                className={`btn-option ${selectedOptions["Are your customers accepting of your delivery times?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
              </div>
            </section>
        </div>

        <div className="form-actions">
          <Link to="/lead-time-1" className="btn-secondary">
            Back
          </Link>
          <button onClick={saveData} className="btn-primary">
            Submit Lead Time Assessment
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

export default LeadTime2;
