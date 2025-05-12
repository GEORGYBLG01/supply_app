import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import NavItems3 from "../NavItems3";
import NavItems2 from "../NavItems2";
import "./Quality6.css";
import "../../styleguide.css";
import jsPDF from "jspdf";
import { q_allData1, q_yesCount1 } from "../Quality1";
import { q_allData2, q_yesCount2 } from "../Quality2";
import { q_allData3, q_yesCount3 } from "../Quality3";
import { q_allData4, q_yesCount4 } from "../Quality4";
import { q_allData5, q_yesCount5 } from "../Quality5";
export let q_sum = 0;
export let q_allData6 = [];
export let q_yesCount6 = 0;

function Quality6(props) {
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
        q_yesCount6--;
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
      q_yesCount6++;
    }
    // Si on passe de "Yes" à "No", on décrémente le score
    else if (option === "No" && previousOption === "Yes") {
      q_yesCount6--;
    }
  }

  const history = useHistory();

  function saveData() {
    setIsLoading(true);
    setErrorMessage("");
    
    console.log("Début de sauvegarde des données Quality6");
    
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
      "Do you have a policy to evaluate, select, monitor supplier performance and their re-evaluation?",
      "Is this policy available in digital form?",
      "Do you periodically track supplier performance against measurable objectives and targets?",
      "Do suppliers receive performance feedback on a regular basis?",
      "Do you have corrective action plan in place for suppliers who aren't achieving performance objectives?",
      "Are the decision-makers made aware of this supplier performance assessment?",
      "Is it used to make decisions?",
      "Do you have a system for managing supplier contracts?",
      "Do you ensure your suppliers comply with all relevant governmental requirements?"
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
        section: "quality-6",
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
    q_allData6 = [...data];
    console.log("Données à envoyer:", JSON.stringify(data, null, 2));
    
    // Calculer la somme totale
    q_sum = q_yesCount1 + q_yesCount2 + q_yesCount3 + q_yesCount4 + q_yesCount5 + q_yesCount6;
    console.log("Score total Quality:", q_sum);
    
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
      localStorage.setItem('quality6Score', q_yesCount6);
      console.log(`Score quality6 mis à jour: ${q_yesCount6}`);
      
      // Sauvegarder également le score total quality
      const scoreData = [{
        question: "Quality Total Score",
        answer: q_sum.toString(),
        category: "quality",
        enterpriseId: enterpriseId,
        userId: userId || "",
        section: "quality-total",
        timestamp: new Date().toISOString()
      }];
      
      console.log("Envoi du score total quality:", JSON.stringify(scoreData, null, 2));
      
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
      console.log("Score total quality enregistré avec succès:", scoreResponse);
      
      // Récupérer correctement les données de tous les composants
      const allQualityData = [];
      
      // Utiliser des try/catch pour éviter les erreurs si certaines données sont manquantes
      try {
        if (Array.isArray(q_allData1) && q_allData1.length > 0) allQualityData.push(...q_allData1);
        if (Array.isArray(q_allData2) && q_allData2.length > 0) allQualityData.push(...q_allData2);
        if (Array.isArray(q_allData3) && q_allData3.length > 0) allQualityData.push(...q_allData3);
        if (Array.isArray(q_allData4) && q_allData4.length > 0) allQualityData.push(...q_allData4);
        if (Array.isArray(q_allData5) && q_allData5.length > 0) allQualityData.push(...q_allData5);
        if (Array.isArray(q_allData6) && q_allData6.length > 0) allQualityData.push(...q_allData6);
      } catch (error) {
        console.error("Erreur lors de la concaténation des données:", error);
      }
      
      console.log("Toutes les données Quality pour le PDF:", allQualityData.length, "questions");
      
      // Générer le PDF avec toutes les données
      generatePdf(allQualityData);
      
      // Redirection vers la page suivante
      setIsLoading(false);
      history.push("/client-consommateur-1");
    })
    .catch(error => {
      console.error("Error saving data:", error);
      setErrorMessage("Error saving data. Please try again.");
      console.error("Détails de l'erreur:", error.message);
      
      // Même en cas d'erreur, essayer de générer le PDF avec les données disponibles
      const allQualityData = [];
      try {
        if (Array.isArray(q_allData1) && q_allData1.length > 0) allQualityData.push(...q_allData1);
        if (Array.isArray(q_allData2) && q_allData2.length > 0) allQualityData.push(...q_allData2);
        if (Array.isArray(q_allData3) && q_allData3.length > 0) allQualityData.push(...q_allData3);
        if (Array.isArray(q_allData4) && q_allData4.length > 0) allQualityData.push(...q_allData4);
        if (Array.isArray(q_allData5) && q_allData5.length > 0) allQualityData.push(...q_allData5);
        if (Array.isArray(q_allData6) && q_allData6.length > 0) allQualityData.push(...q_allData6);
      } catch (error) {
        console.error("Erreur lors de la concaténation des données:", error);
      }
      
      generatePdf(allQualityData);
      
      // Redirection malgré l'erreur
      setIsLoading(false);
      history.push("/client-consommateur-1");
    });
  }

  function generatePdf(q_allData) {
    // Vérifier si des données existent
    if (!q_allData || q_allData.length === 0) {
      console.error("Aucune donnée disponible pour générer le PDF");
      return;
    }
    
    console.log("Génération du PDF avec", q_allData.length, "questions");
    
    // Créer un nouveau document PDF
    const doc = new jsPDF();
    const lineHeight = 10;
    const pageHeight = doc.internal.pageSize.height - 20;
    const pageWidth = doc.internal.pageSize.width - 20;
    let y = 20;

    // Ajouter un titre
    doc.setFontSize(16);
    doc.text("Quality Assessment Results", 105, y, { align: "center" });
    y += 15;
    
    // Ajouter le score total
    doc.setFontSize(14);
    doc.text(`Total Score: ${q_sum} / ${q_allData.length}`, 105, y, { align: "center" });
    y += 15;
    
    doc.setFontSize(12);
    
    // Parcourir les données et ajouter chaque question et réponse au document PDF
    q_allData.forEach((data, index) => {
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
    doc.text("Summary of Quality Assessment", 105, y, { align: "center" });
    y += 20;
    
    doc.setFontSize(12);
    doc.text(`Total number of questions: ${q_allData.length}`, 10, y);
    y += lineHeight;
    doc.text(`Total "Yes" answers: ${q_sum}`, 10, y);
    y += lineHeight;
    doc.text(`Score percentage: ${Math.round((q_sum / q_allData.length) * 100)}%`, 10, y);
    y += lineHeight * 2;
    
    // Ajouter des détails par section
    doc.text("Score breakdown by section:", 10, y);
    y += lineHeight;
    
    const quality1Score = parseInt(localStorage.getItem('quality1Score') || '0');
    const quality2Score = parseInt(localStorage.getItem('quality2Score') || '0');
    const quality3Score = parseInt(localStorage.getItem('quality3Score') || '0');
    const quality4Score = parseInt(localStorage.getItem('quality4Score') || '0');
    const quality5Score = parseInt(localStorage.getItem('quality5Score') || '0');
    const quality6Score = parseInt(localStorage.getItem('quality6Score') || '0');
    
    doc.text(`Quality Section 1: ${quality1Score}`, 20, y);
    y += lineHeight;
    doc.text(`Quality Section 2: ${quality2Score}`, 20, y);
    y += lineHeight;
    doc.text(`Quality Section 3: ${quality3Score}`, 20, y);
    y += lineHeight;
    doc.text(`Quality Section 4: ${quality4Score}`, 20, y);
    y += lineHeight;
    doc.text(`Quality Section 5: ${quality5Score}`, 20, y);
    y += lineHeight;
    doc.text(`Quality Section 6: ${quality6Score}`, 20, y);
    y += lineHeight * 2;
    
    const date = new Date();
    doc.text(`Generated on: ${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`, 10, y);

    // Enregistrer le document PDF
    doc.save("Quality_Assessment_Complete.pdf");
    console.log("PDF Quality généré avec succès");
  }

  function calculateProgressPercentage() {
    const totalQuestions = document.getElementsByTagName("section").length;
    if (totalQuestions === 0) return 0;
    return Math.round((q_yesCount6 / totalQuestions) * 100);
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
            Your score: {q_yesCount6} / {totalQuestions} ({calculateProgressPercentage()}%)
          </p>
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <div className="questions-container">
          <section className="question-card">
            <p className="question-text">Do you have a quality policy?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Do you have a quality policy?", "Yes")} 
                className={`btn-option ${selectedOptions["Do you have a quality policy?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Do you have a quality policy?", "No")} 
                className={`btn-option ${selectedOptions["Do you have a quality policy?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
              </div>
            </section>

          <section className="question-card">
            <p className="question-text">Have you developed quality objectives?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Have you developed quality objectives?", "Yes")} 
                className={`btn-option ${selectedOptions["Have you developed quality objectives?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Have you developed quality objectives?", "No")} 
                className={`btn-option ${selectedOptions["Have you developed quality objectives?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
              </div>
              </section>

          <section className="question-card">
            <p className="question-text">Is your quality policy appropriate to the purpose of your organization?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Is your quality policy appropriate to the purpose of your organization?", "Yes")} 
                className={`btn-option ${selectedOptions["Is your quality policy appropriate to the purpose of your organization?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Is your quality policy appropriate to the purpose of your organization?", "No")} 
                className={`btn-option ${selectedOptions["Is your quality policy appropriate to the purpose of your organization?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
              </div>
              </section>

          <section className="question-card">
            <p className="question-text">Does your quality policy include a commitment to satisfy applicable requirements?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Does your quality policy include a commitment to satisfy applicable requirements?", "Yes")} 
                className={`btn-option ${selectedOptions["Does your quality policy include a commitment to satisfy applicable requirements?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Does your quality policy include a commitment to satisfy applicable requirements?", "No")} 
                className={`btn-option ${selectedOptions["Does your quality policy include a commitment to satisfy applicable requirements?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
              </div>
              </section>

          <section className="question-card">
            <p className="question-text">Does your quality policy include a commitment to continual improvement of the QMS?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Does your quality policy include a commitment to continual improvement of the QMS?", "Yes")} 
                className={`btn-option ${selectedOptions["Does your quality policy include a commitment to continual improvement of the QMS?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Does your quality policy include a commitment to continual improvement of the QMS?", "No")} 
                className={`btn-option ${selectedOptions["Does your quality policy include a commitment to continual improvement of the QMS?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
              </div>
              </section>

          <section className="question-card">
            <p className="question-text">Do the quality objectives take into account the requirements?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Do the quality objectives take into account the requirements?", "Yes")} 
                className={`btn-option ${selectedOptions["Do the quality objectives take into account the requirements?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Do the quality objectives take into account the requirements?", "No")} 
                className={`btn-option ${selectedOptions["Do the quality objectives take into account the requirements?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
              </div>
              </section>

          <section className="question-card">
            <p className="question-text">Are the quality objectives monitored and communicated?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Are the quality objectives monitored and communicated?", "Yes")} 
                className={`btn-option ${selectedOptions["Are the quality objectives monitored and communicated?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Are the quality objectives monitored and communicated?", "No")} 
                className={`btn-option ${selectedOptions["Are the quality objectives monitored and communicated?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
            </div>
          </section>
        </div>

        <div className="form-actions">
          <Link to="/quality-5" className="btn-secondary">
            Back
          </Link>
          <button onClick={saveData} className="btn-primary">
            Soumettre et passer aux questions Client/Consommateur
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

export default Quality6;
