import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import NavItems3 from "../NavItems3";
import NavItems2 from "../NavItems2";
import "./Cost2.css";
import "../../styleguide.css";
import jsPDF from "jspdf";
import { c_allData1, c_yesCount1 } from "../Cost1";
export let c_allData2 = [];
export let c_yesCount2 = 0;
export let c_sum = 0;

function Cost2(props) {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    x1200PxLogo_Icac__20081,
    qualityCriteria,
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
        c_yesCount2--;
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
      c_yesCount2++;
    }
    // Si on passe de "Yes" à "No", on décrémente le score
    else if (option === "No" && previousOption === "Yes") {
      c_yesCount2--;
    }
  }

  const history = useHistory();

  function saveData() {
    setIsLoading(true);
    setErrorMessage("");
    
    console.log("Début de sauvegarde des données Cost2");
    
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
      "Do you have a method to calculate production costs?",
      "Do you have a method of analysis for the costs of non-quality?",
      "Do you monitor your obsolete inventory?",
      "Have you identified your costs that do not add value to your product?",
      "Do you have a method of assessing supply chain cost risks?",
      "Do you measure the cost of shipping materials?",
      "Do you know the cost of capital employed?",
      "Do you know your employee productivity rates and costs for each operation?",
      "Do you have a budget system (annual or multi-year)?"
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
        section: "cost-2",
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
    c_allData2 = [...data];
    console.log("Données à envoyer:", JSON.stringify(data, null, 2));
    
    // Calculer la somme des scores Cost1 et Cost2
    const cost1Score = parseInt(localStorage.getItem('cost1Score') || 0);
    c_sum = cost1Score + c_yesCount2;
    console.log("Score total Cost:", c_sum);
    
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
      localStorage.setItem('cost2Score', c_yesCount2);
      console.log(`Score cost2 mis à jour: ${c_yesCount2}`);
      
      // Sauvegarder également le score total cost
      const scoreData = [{
        question: "Cost Total Score Final",
        answer: c_sum.toString(),
        category: "cost",
        enterpriseId: enterpriseId,
        userId: userId || "",
        section: "cost-total-final",
        timestamp: new Date().toISOString()
      }];
      
      console.log("Envoi du score total cost:", JSON.stringify(scoreData, null, 2));
      
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
      console.log("Score total cost enregistré avec succès:", scoreResponse);
      
      // Récupérer correctement les données de tous les composants
      const allCostData = [];
      
      // Utiliser des try/catch pour éviter les erreurs si certaines données sont manquantes
      try {
        if (Array.isArray(c_allData1) && c_allData1.length > 0) allCostData.push(...c_allData1);
        if (Array.isArray(c_allData2) && c_allData2.length > 0) allCostData.push(...c_allData2);
      } catch (error) {
        console.error("Erreur lors de la concaténation des données:", error);
      }
      
      console.log("Toutes les données Cost pour le PDF:", allCostData.length, "questions");
      
      // Générer le PDF avec toutes les données
      generatePdf(allCostData);
      
      // Redirection vers la page suivante
      setIsLoading(false);
      history.push("/Quality-1");
    })
    .catch(error => {
      console.error("Error saving data:", error);
      setErrorMessage("Error saving data. Please try again.");
      console.error("Détails de l'erreur:", error.message);
      
      // Même en cas d'erreur, essayer de générer le PDF avec les données disponibles
      const allCostData = [];
      try {
        if (Array.isArray(c_allData1) && c_allData1.length > 0) allCostData.push(...c_allData1);
        if (Array.isArray(c_allData2) && c_allData2.length > 0) allCostData.push(...c_allData2);
      } catch (error) {
        console.error("Erreur lors de la concaténation des données:", error);
      }
      
      generatePdf(allCostData);
      
      // Redirection malgré l'erreur
      setIsLoading(false);
      history.push("/Quality-1");
    });
  }

  function generatePdf(allData) {
    // Vérifier si des données existent
    if (!allData || allData.length === 0) {
      console.error("Aucune donnée disponible pour générer le PDF");
      return;
    }
    
    console.log("Génération du PDF avec", allData.length, "questions");
    
    // Créer un nouveau document PDF
    const doc = new jsPDF();
    const lineHeight = 10;
    const pageHeight = doc.internal.pageSize.height - 20;
    const pageWidth = doc.internal.pageSize.width - 20;
    let y = 20;

    // Ajouter un titre
    doc.setFontSize(16);
    doc.text("Cost Assessment Results", 105, y, { align: "center" });
    y += 15;
    
    // Ajouter le score total
    doc.setFontSize(14);
    doc.text(`Total Score: ${c_sum} / ${allData.length}`, 105, y, { align: "center" });
    y += 15;
    
    doc.setFontSize(12);
    
    // Parcourir les données et ajouter chaque question et réponse au document PDF
    allData.forEach((data, index) => {
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
    doc.text("Summary of Cost Assessment", 105, y, { align: "center" });
    y += 20;
    
    doc.setFontSize(12);
    doc.text(`Total number of questions: ${allData.length}`, 10, y);
    y += lineHeight;
    doc.text(`Total "Yes" answers: ${c_sum}`, 10, y);
    y += lineHeight;
    doc.text(`Score percentage: ${Math.round((c_sum / allData.length) * 100)}%`, 10, y);
    y += lineHeight * 2;
    
    const date = new Date();
    doc.text(`Generated on: ${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`, 10, y);

    // Enregistrer le document PDF
    doc.save("Cost_Assessment_Complete.pdf");
    console.log("PDF Cost généré avec succès");
  }

  function calculateProgressPercentage() {
    if (totalQuestions === 0) return 0;
    return Math.round((c_yesCount2 / totalQuestions) * 100);
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
          <NavItems2 />
        </div>
      </div>

      <div className="environmental-content">
        <h1 className="environmental-title">
          COST ASSESSMENT - PART 2
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
            Your score: {c_yesCount2} / {totalQuestions} ({calculateProgressPercentage()}%)
          </p>
        </div>

        <div className="questions-container">
          <section className="question-card">
            <p className="question-text">Do you have a budget for machine maintenance?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Do you have a budget for machine maintenance?", "Yes")} 
                className={`btn-option ${selectedOptions["Do you have a budget for machine maintenance?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Do you have a budget for machine maintenance?", "No")} 
                className={`btn-option ${selectedOptions["Do you have a budget for machine maintenance?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
            </div>
          </section>

          <section className="question-card">
            <p className="question-text">Have you defined a budget for external services?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Have you defined a budget for external services?", "Yes")} 
                className={`btn-option ${selectedOptions["Have you defined a budget for external services?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Have you defined a budget for external services?", "No")} 
                className={`btn-option ${selectedOptions["Have you defined a budget for external services?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
            </div>
          </section>
          
          <section className="question-card">
            <p className="question-text">Do you have different suppliers?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Do you have different suppliers?", "Yes")} 
                className={`btn-option ${selectedOptions["Do you have different suppliers?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Do you have different suppliers?", "No")} 
                className={`btn-option ${selectedOptions["Do you have different suppliers?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
            </div>
          </section>

          <section className="question-card">
            <p className="question-text">Are you able to change suppliers depending on prices?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Are you able to change suppliers depending on prices?", "Yes")} 
                className={`btn-option ${selectedOptions["Are you able to change suppliers depending on prices?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Are you able to change suppliers depending on prices?", "No")} 
                className={`btn-option ${selectedOptions["Are you able to change suppliers depending on prices?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
            </div>
          </section>

          <section className="question-card">
            <p className="question-text">Do you control your transport costs?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Do you control your transport costs?", "Yes")} 
                className={`btn-option ${selectedOptions["Do you control your transport costs?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Do you control your transport costs?", "No")} 
                className={`btn-option ${selectedOptions["Do you control your transport costs?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
            </div>
          </section>

          <section className="question-card">
            <p className="question-text">Do you know the price of the product excluding raw materials?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Do you know the price of the product excluding raw materials?", "Yes")} 
                className={`btn-option ${selectedOptions["Do you know the price of the product excluding raw materials?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Do you know the price of the product excluding raw materials?", "No")} 
                className={`btn-option ${selectedOptions["Do you know the price of the product excluding raw materials?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
            </div>
          </section>

          <section className="question-card">
            <p className="question-text">Do you know the economic losses linked to the non-conforming product (disquality)?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Do you know the economic losses linked to the non-conforming product (disquality)?", "Yes")} 
                className={`btn-option ${selectedOptions["Do you know the economic losses linked to the non-conforming product (disquality)?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Do you know the economic losses linked to the non-conforming product (disquality)?", "No")} 
                className={`btn-option ${selectedOptions["Do you know the economic losses linked to the non-conforming product (disquality)?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
            </div>
          </section>

          <section className="question-card">
            <p className="question-text">Do you plan a budget for non-voluntary "breakage"?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Do you plan a budget for non-voluntary \"breakage\"?", "Yes")} 
                className={`btn-option ${selectedOptions["Do you plan a budget for non-voluntary \"breakage\"?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Do you plan a budget for non-voluntary \"breakage\"?", "No")} 
                className={`btn-option ${selectedOptions["Do you plan a budget for non-voluntary \"breakage\"?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
            </div>
          </section>

          <section className="question-card">
            <p className="question-text">Do you know your optimal quantity of product to be profitable?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Do you know your optimal quantity of product to be profitable?", "Yes")} 
                className={`btn-option ${selectedOptions["Do you know your optimal quantity of product to be profitable?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Do you know your optimal quantity of product to be profitable?", "No")} 
                className={`btn-option ${selectedOptions["Do you know your optimal quantity of product to be profitable?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
            </div>
          </section>
        </div>

        <div className="form-actions">
          <Link to="/cost-1" className="btn-secondary">
            Previous Section
          </Link>
          <button onClick={saveData} className="btn-primary">
            {qualityCriteria || "Continue to Next Section"}
          </button>
        </div>
      </div>

      {isLoading && (
        <div className="loading-indicator">
          <div className="spinner"></div>
          <p>Saving data and generating PDF...</p>
        </div>
      )}
    </div>
  );
}

export default Cost2;