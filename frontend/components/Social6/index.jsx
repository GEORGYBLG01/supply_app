import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import NavItems3 from "../NavItems3";
import NavItems2 from "../NavItems2";
import Toggle from "../Toggle";
import "./Social6.css";
import { s_allData1, yes_Count1 } from "../Social1";
import { s_allData2, yes_Count2 } from "../Social2";
import { s_allData3, yes_Count3 } from "../Social3";
import { s_allData4, yes_Count4 } from "../Social4";
import { s_allData5, yes_Count5 } from "../Social5";
import jsPDF from "jspdf";
export let s_sum = 0;
export let yes_Count6 = 0;
export let s_yesCount6 = 0;

function Social6(props) {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [yesCount6, setYesCount6] = useState(0); // Initialize yesCount state
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    x1200PxLogo_Icam__20081,
    modernizationCriteria,
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
        s_yesCount6--;
        yes_Count6 = s_yesCount6; // Synchroniser les deux variables
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
      s_yesCount6++;
      yes_Count6 = s_yesCount6; // Synchroniser les deux variables
    }
    // Si on passe de "Yes" à "No", on décrémente le score
    else if (option === "No" && previousOption === "Yes") {
      s_yesCount6--;
      yes_Count6 = s_yesCount6; // Synchroniser les deux variables
    }
  }

  const history = useHistory();
  let s_allData6 = [];

  function saveData() {
    setErrorMessage("");
    setIsLoading(true);
    
    console.log("Début de sauvegarde des données Social6");
    
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
      "Do you contribute to the development of the regions where you are located?",
      "Do you regularly consult with local communities to ensure that your activities do not have a negative impact?",
      "Do you engage in direct dialogue with communities affected by your activities?",
      "Do you have a positive impact on employment in the regions where you are located?",
      "Do you contribute to the economic development of the regions where you are located?",
      "Do you maintain a high level of safety and physical, mental and social well-being of workers (the notion of worker encompasses all populations of employed workers: company employees, seconded workers, self-employed workers, temporary workers, trainees, apprentices...)?",
      "Are staff trained in occupational health and safety?",
      "Is there a budget for health and safety?",
      "Do you prevent and protect employees from negative health effects resulting from working conditions?",
      "Are job descriptions provided to prevention workers (good practices, etc.)?",
      "Percentage of the number of dangerous situations dealt with out of the number of dangerous situations detected",
      "Do you have a work environment that is adapted to the physiological and psychological needs of workers?"
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
        section: "social-6",
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
    s_allData6 = [...data];
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
      localStorage.setItem('social6Score', yes_Count6);
      console.log(`Score social6 mis à jour: ${yes_Count6}`);
      
      // Récupérer tous les scores sociaux du localStorage
      const social1Score = parseInt(localStorage.getItem('social1Score') || 0);
      const social2Score = parseInt(localStorage.getItem('social2Score') || 0);
      const social3Score = parseInt(localStorage.getItem('social3Score') || 0);
      const social4Score = parseInt(localStorage.getItem('social4Score') || 0);
      const social5Score = parseInt(localStorage.getItem('social5Score') || 0);
      const social6Score = parseInt(localStorage.getItem('social6Score') || 0);
      
      // Calculer le score total social
      s_sum = social1Score + social2Score + social3Score + social4Score + social5Score + social6Score;
      console.log("Score total social calculé:", s_sum);
      console.log("Scores individuels:", {social1Score, social2Score, social3Score, social4Score, social5Score, social6Score});
      
      // Sauvegarder également le score total social final
      const scoreData = [{
        question: "Social Total Score Final",
        answer: s_sum.toString(),
        category: "social",
        enterpriseId: enterpriseId,
        userId: userId || "",
        section: "social-total-final",
        timestamp: new Date().toISOString()
      }];
      
      console.log("Envoi du score total social:", JSON.stringify(scoreData, null, 2));
      
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
      console.log("Score total social enregistré avec succès:", scoreResponse);
      
      // Récupérer correctement les données de tous les composants
      const allSocialData = [];
      
      // Utiliser des try/catch pour éviter les erreurs si certaines données sont manquantes
      try {
        if (Array.isArray(s_allData1) && s_allData1.length > 0) allSocialData.push(...s_allData1);
        if (Array.isArray(s_allData2) && s_allData2.length > 0) allSocialData.push(...s_allData2);
        if (Array.isArray(s_allData3) && s_allData3.length > 0) allSocialData.push(...s_allData3);
        if (Array.isArray(s_allData4) && s_allData4.length > 0) allSocialData.push(...s_allData4);
        if (Array.isArray(s_allData5) && s_allData5.length > 0) allSocialData.push(...s_allData5);
        if (Array.isArray(s_allData6) && s_allData6.length > 0) allSocialData.push(...s_allData6);
      } catch (error) {
        console.error("Erreur lors de la concaténation des données:", error);
      }
      
      console.log("Toutes les données sociales pour le PDF:", allSocialData.length, "questions");
      
      // Générer le PDF avec toutes les données sociales
      generatePdf(allSocialData);
      
      // Redirection vers la page suivante
      setIsLoading(false);
      history.push("/modernization-1");
    })
    .catch(error => {
      console.error("Error saving data:", error);
      setErrorMessage("Error saving data. Please try again.");
      console.error("Détails de l'erreur:", error.message);
      
      // Même en cas d'erreur, essayer de générer le PDF avec les données disponibles
      const allSocialData = [];
      try {
        if (Array.isArray(s_allData1) && s_allData1.length > 0) allSocialData.push(...s_allData1);
        if (Array.isArray(s_allData2) && s_allData2.length > 0) allSocialData.push(...s_allData2);
        if (Array.isArray(s_allData3) && s_allData3.length > 0) allSocialData.push(...s_allData3);
        if (Array.isArray(s_allData4) && s_allData4.length > 0) allSocialData.push(...s_allData4);
        if (Array.isArray(s_allData5) && s_allData5.length > 0) allSocialData.push(...s_allData5);
        if (Array.isArray(s_allData6) && s_allData6.length > 0) allSocialData.push(...s_allData6);
      } catch (error) {
        console.error("Erreur lors de la concaténation des données:", error);
      }
      
      generatePdf(allSocialData);
      
      // Continuer quand même vers la page suivante en cas d'erreur
      setIsLoading(false);
      history.push("/modernization-1");
    });
  }

  function generatePdf(s_allData) {
    // Vérifier si des données existent
    if (!s_allData || s_allData.length === 0) {
      console.error("Aucune donnée disponible pour générer le PDF");
      return;
    }
    
    console.log("Génération du PDF avec", s_allData.length, "questions");
    
    // Créer un nouveau document PDF
    const doc = new jsPDF();
    const lineHeight = 10;
    const pageHeight = doc.internal.pageSize.height - 20;
    const pageWidth = doc.internal.pageSize.width - 20;
    let y = 20;

    // Ajouter un titre
    doc.setFontSize(16);
    doc.text("Social Assessment Results", 105, y, { align: "center" });
    y += 15;
    
    // Ajouter le score total
    doc.setFontSize(14);
    doc.text(`Total Score: ${s_sum} / ${s_allData.length}`, 105, y, { align: "center" });
    y += 15;
    
    doc.setFontSize(12);

    // Parcourir les données dans s_allData et ajouter chaque question et réponse au document PDF
    s_allData.forEach((data, index) => {
      // Vérifier si les données sont valides
      if (!data || !data.question) {
        console.error("Données invalides pour l'élément", index);
        return;
      }
      
      const question = `Question ${index + 1}: ${data.question}`;
      const answer = `Answer: ${data.answer || 'No answer'}`;

      // Vérifier si la position y actuelle plus la hauteur de la question dépasse la hauteur maximale de la page
      // Estimer la hauteur du texte après division
      const splitQuestion = doc.splitTextToSize(question, pageWidth);
      const estimatedHeight = splitQuestion.length * lineHeight + lineHeight * 2;
      
      if (y + estimatedHeight > pageHeight) {
        // Ajouter une nouvelle page et réinitialiser la position y
        doc.addPage();
        y = 20;
      }

      // Séparer la question sur plusieurs lignes si elle est trop longue
      doc.text(splitQuestion, 10, y);
      y += splitQuestion.length * lineHeight;

      doc.text(answer, 10, y);
      y += lineHeight * 2; // Ajouter un peu d'espace entre les questions
    });

    // Ajouter une page de résumé
    doc.addPage();
    y = 20;
    doc.setFontSize(16);
    doc.text("Summary of Social Assessment", 105, y, { align: "center" });
    y += 20;
    
    doc.setFontSize(12);
    doc.text(`Total number of questions: ${s_allData.length}`, 10, y);
    y += lineHeight;
    doc.text(`Total "Yes" answers: ${s_sum}`, 10, y);
    y += lineHeight;
    doc.text(`Score percentage: ${Math.round((s_sum / s_allData.length) * 100)}%`, 10, y);
    y += lineHeight * 2;
    
    const date = new Date();
    doc.text(`Generated on: ${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`, 10, y);

    // Enregistrer le document PDF
    doc.save("Social_Assessment_Complete.pdf");
    console.log("PDF généré avec succès");
  }

  return (
    <div className="modernization-container">
      <div className="modernization-header">
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

      <div className="modernization-content">
        <h1 className="modernization-title">
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
            Your score: {yes_Count6} / {totalQuestions} ({Math.round((yes_Count6 / totalQuestions) * 100) || 0}%)
          </p>
        </div>

        <div className="questions-container">
          <section className="question-card">
            <p className="question-text">Do you maintain a high level of safety and physical, mental and social well-being of workers (the notion of worker encompasses all populations of employed workers: company employees, seconded workers, self-employed workers, temporary workers, trainees, apprentices...)?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Do you maintain a high level of safety and physical, mental and social well-being of workers (the notion of worker encompasses all populations of employed workers: company employees, seconded workers, self-employed workers, temporary workers, trainees, apprentices...)?", "Yes")} 
                className={`btn-option ${selectedOptions["Do you maintain a high level of safety and physical, mental and social well-being of workers (the notion of worker encompasses all populations of employed workers: company employees, seconded workers, self-employed workers, temporary workers, trainees, apprentices...)?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Do you maintain a high level of safety and physical, mental and social well-being of workers (the notion of worker encompasses all populations of employed workers: company employees, seconded workers, self-employed workers, temporary workers, trainees, apprentices...)?", "No")} 
                className={`btn-option ${selectedOptions["Do you maintain a high level of safety and physical, mental and social well-being of workers (the notion of worker encompasses all populations of employed workers: company employees, seconded workers, self-employed workers, temporary workers, trainees, apprentices...)?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
            </div>
          </section>

          <section className="question-card">
            <p className="question-text">Are staff trained in occupational health and safety?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Are staff trained in occupational health and safety?", "Yes")} 
                className={`btn-option ${selectedOptions["Are staff trained in occupational health and safety?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Are staff trained in occupational health and safety?", "No")} 
                className={`btn-option ${selectedOptions["Are staff trained in occupational health and safety?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
            </div>
          </section>

          <section className="question-card">
            <p className="question-text">Is there a budget for health and safety?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Is there a budget for health and safety?", "Yes")} 
                className={`btn-option ${selectedOptions["Is there a budget for health and safety?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Is there a budget for health and safety?", "No")} 
                className={`btn-option ${selectedOptions["Is there a budget for health and safety?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
            </div>
          </section>

          <section className="question-card">
            <p className="question-text">Do you prevent and protect employees from negative health effects resulting from working conditions?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Do you prevent and protect employees from negative health effects resulting from working conditions?", "Yes")} 
                className={`btn-option ${selectedOptions["Do you prevent and protect employees from negative health effects resulting from working conditions?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Do you prevent and protect employees from negative health effects resulting from working conditions?", "No")} 
                className={`btn-option ${selectedOptions["Do you prevent and protect employees from negative health effects resulting from working conditions?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
            </div>
          </section>

          <section className="question-card">
            <p className="question-text">Are job descriptions provided to prevention workers (good practices, etc.)?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Are job descriptions provided to prevention workers (good practices, etc.)?", "Yes")} 
                className={`btn-option ${selectedOptions["Are job descriptions provided to prevention workers (good practices, etc.)?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Are job descriptions provided to prevention workers (good practices, etc.)?", "No")} 
                className={`btn-option ${selectedOptions["Are job descriptions provided to prevention workers (good practices, etc.)?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
            </div>
          </section>

          <section className="question-card">
            <p className="question-text">Percentage of the number of dangerous situations dealt with out of the number of dangerous situations detected</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Percentage of the number of dangerous situations dealt with out of the number of dangerous situations detected", "Yes")} 
                className={`btn-option ${selectedOptions["Percentage of the number of dangerous situations dealt with out of the number of dangerous situations detected"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Percentage of the number of dangerous situations dealt with out of the number of dangerous situations detected", "No")} 
                className={`btn-option ${selectedOptions["Percentage of the number of dangerous situations dealt with out of the number of dangerous situations detected"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
            </div>
          </section>

          <section className="question-card">
            <p className="question-text">Do you have a work environment that is adapted to the physiological and psychological needs of workers?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Do you have a work environment that is adapted to the physiological and psychological needs of workers?", "Yes")} 
                className={`btn-option ${selectedOptions["Do you have a work environment that is adapted to the physiological and psychological needs of workers?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Do you have a work environment that is adapted to the physiological and psychological needs of workers?", "No")} 
                className={`btn-option ${selectedOptions["Do you have a work environment that is adapted to the physiological and psychological needs of workers?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
            </div>
          </section>
        </div>

        <div className="form-actions">
          <Link to="/social-5" className="btn-secondary">
            Back
          </Link>
          <button onClick={saveData} className="btn-primary">
            Submit Social Assessment
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

export default Social6;
