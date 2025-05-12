import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import NavItems3 from "../NavItems3";
import NavItems2 from "../NavItems2";
import "./ClientConsommateur2.css";
import "../../styleguide.css";
import jsPDF from "jspdf";
import { cc_allData1, cc_yesCount1 } from "../ClientConsommateur1";
import { s_sum } from "../Social6";
import { company_name } from "../Acquisition";
import { e_sum } from "../Environmental5";
import { m_sum } from "../Modernization4";
import { l_sum } from "../Leadtime2";
import { c_sum } from "../Cost2";
import { q_sum } from "../Quality6";
import { saveAllScores, saveCategoryScore } from "../../utils/scoreHelper";

export let cc_sum = 0;
export let cc_allData2 = [];
export let cc_yesCount2 = 0;

function ClientConsommateur2(props) {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [scoreState, setScoreState] = useState(0);
  
  const {
    x1200PxLogo_Icam__20081,
    navItems3Props,
  } = props;

  useEffect(() => {
    // Reset the count when component mounts to avoid residual values
    cc_yesCount2 = 0;
    setScoreState(0);
    
    // Récupérer le score de ClientConsommateur1 depuis le localStorage
    const clientConsommateur1Score = parseInt(localStorage.getItem('clientConsommateur1Score') || 0);
    cc_yesCount1 = clientConsommateur1Score;
    console.log(`Score ClientConsommateur1 récupéré: ${cc_yesCount1}`);
    
    // Calculate the total number of questions based on sections
    const sections = document.getElementsByTagName("section");
    setTotalQuestions(sections.length);
    
    // Calculer cc_sum en additionnant cc_yesCount1 et cc_yesCount2
    cc_sum = cc_yesCount1 + cc_yesCount2;
    console.log(`cc_sum initial: ${cc_sum} (cc_yesCount1: ${cc_yesCount1}, cc_yesCount2: ${cc_yesCount2})`);
  }, []); // Exécuter seulement au montage du composant, pas à chaque changement de cc_yesCount2

  function clicked(question, option) {
    console.log(`Option clicked: ${option} for question: ${question}`);
    
    // If the clicked option is the same as the already selected one, deselect it
    if (selectedOptions[question] === option) {
      setSelectedOptions((prevSelectedOptions) => {
        const newOptions = { ...prevSelectedOptions };
        delete newOptions[question];
        return newOptions;
      });
      // If we deselect a "Yes", decrement the score
      if (option === "Yes") {
        cc_yesCount2--;
        setScoreState(cc_yesCount2);
        console.log(`Score après désélection: ${cc_yesCount2}`);
      }
      return;
    }

    // Otherwise, update the selection
    const previousOption = selectedOptions[question];
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [question]: option,
    }));
    
    // If changing from "No" to "Yes", increment the score
    if (option === "Yes" && previousOption !== "Yes") {
      cc_yesCount2++;
      setScoreState(cc_yesCount2);
      console.log(`Score après sélection Yes: ${cc_yesCount2}`);
    }
    // If changing from "Yes" to "No", decrement the score
    else if (option === "No" && previousOption === "Yes") {
      cc_yesCount2--;
      setScoreState(cc_yesCount2);
      console.log(`Score après sélection No: ${cc_yesCount2}`);
    }
    
    // Mettre à jour cc_sum après modification du score
    cc_sum = cc_yesCount1 + cc_yesCount2;
    console.log(`cc_sum mis à jour: ${cc_sum}`);
  }

  const history = useHistory();

  function saveData() {
    setIsLoading(true);
    setErrorMessage("");
    
    console.log("Début de sauvegarde des données ClientConsommateur2");
    
    const enterpriseId = localStorage.getItem("enterpriseId");
    const userId = localStorage.getItem("userId");
    
    if (!enterpriseId) {
      console.error("ERREUR: ID d'entreprise manquant");
      setErrorMessage("ID d'entreprise manquant. Veuillez retourner à la sélection d'entreprise.");
      setIsLoading(false);
      return;
    }

    // Définir toutes les questions qui apparaissent dans le composant
    const allQuestions = [
      "Is your complaint rate above 75%?",
      "Do you have a Warehouse Management System (WMS) to manage product movement and storage?",
      "Do you take measures for data protection?",
      "Do you have justified complaints about privacy violations or customer data loss?"
    ];

    // Créer un tableau de questions/réponses pour toutes les questions
    const data = allQuestions.map(question => {
      const answer = selectedOptions[question] || "No";
      return {
        question: question,
        answer: answer,
        category: "client-consommateur",
        enterpriseId: enterpriseId,
        userId: userId || "",
        section: "client-consommateur-2",
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
    cc_allData2 = [...data];
    console.log("Données à envoyer:", JSON.stringify(data, null, 2));
    
    // Calculer la somme des scores Cost1 et Cost2
    const clientConsommateur1Score = parseInt(localStorage.getItem('clientConsommateur1Score') || 0);
    cc_sum = clientConsommateur1Score + scoreState;
    console.log("Score total ClientConsommateur:", cc_sum);
    
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
      localStorage.setItem('clientConsommateur2Score', scoreState);
      console.log(`Score clientConsommateur2 mis à jour: ${scoreState}`);
      
      // Sauvegarder également le score total clientConsommateur
      const scoreData = [{
        question: "ClientConsommateur Total Score Final",
        answer: cc_sum.toString(),
        category: "client-consommateur",
        enterpriseId: enterpriseId,
        userId: userId || "",
        section: "client-consommateur-total-final",
        timestamp: new Date().toISOString()
      }];
      
      console.log("Envoi du score total clientConsommateur:", JSON.stringify(scoreData, null, 2));
      
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
      console.log("Score total clientConsommateur enregistré avec succès:", scoreResponse);
      
      // Récupérer correctement les données de tous les composants
      const allClientConsommateurData = [];
      
      try {
        if (Array.isArray(cc_allData1) && cc_allData1.length > 0) allClientConsommateurData.push(...cc_allData1);
        if (Array.isArray(cc_allData2) && cc_allData2.length > 0) allClientConsommateurData.push(...cc_allData2);
      } catch (error) {
        console.error("Erreur lors de la concaténation des données:", error);
      }
      
      console.log("Toutes les données ClientConsommateur pour le PDF:", allClientConsommateurData.length, "questions");
      
      // Générer le PDF avec toutes les données
      generatePdf(allClientConsommateurData);
      
      // Récupération des scores de toutes les catégories
      const social_value = parseInt(localStorage.getItem('social6Score') || 0);
      const environmental_value = parseInt(localStorage.getItem('environmental5Score') || 0);
      const quality_value = parseInt(localStorage.getItem('quality3Score') || 0);
      const cost_value = parseInt(localStorage.getItem('cost2Score') || 0);
      const leadTime_value = parseInt(localStorage.getItem('leadtime2Score') || 0);
      const modernization_value = parseInt(localStorage.getItem('modernization4Score') || 0);
      
      // S'assurer que cc_sum est à jour avec les dernières valeurs
      cc_sum = clientConsommateur1Score + scoreState;
      const clientConsumer_value = cc_sum;
      
      console.log("Valeurs récupérées pour chaque catégorie:", {
        social: social_value,
        environmental: environmental_value,
        quality: quality_value,
        cost: cost_value,
        leadTime: leadTime_value,
        modernization: modernization_value,
        clientConsumer: clientConsumer_value
      });
      
      // Créer un objet avec tous les scores - S'assurer que la clé est exactement "clientConsumer"
      const allScores = {
        social: social_value,
        environmental: environmental_value,
        quality: quality_value,
        cost: cost_value,
        leadTime: leadTime_value,
        modernization: modernization_value,
        clientConsumer: clientConsumer_value // Vérifier que cette clé est correcte pour la base de données
      };
      
      // Afficher les scores avant l'envoi pour vérification
      console.log("SCORES à envoyer à saveAllScores:", JSON.stringify(allScores, null, 2));
      
      // Récupérer le nom de l'entreprise
      const company_name = localStorage.getItem("company_name") || "Entreprise sans nom";
      
      // Appeler la fonction centralisée pour sauvegarder tous les scores
      return saveAllScores(allScores, company_name, enterpriseId, userId);
    })
    .then(result => {
      console.log("Tous les scores ont été sauvegardés avec succès:", result);
      
      // Recalculer cc_sum pour s'assurer qu'il est à jour
      const clientConsommateur1Score = parseInt(localStorage.getItem('clientConsommateur1Score') || 0);
      cc_sum = clientConsommateur1Score + scoreState;
      console.log(`Score clientConsumer avant sauvegarde séparée: ${cc_sum} (${clientConsommateur1Score} + ${scoreState})`);
      
      // Sauvegarder séparément le score clientConsumer pour s'assurer qu'il est bien enregistré
      return saveCategoryScore("clientConsumer", cc_sum, localStorage.getItem("enterpriseId"), localStorage.getItem("userId"));
    })
    .then(categoryResult => {
      console.log("Score clientConsumer sauvegardé séparément:", categoryResult);
      setIsLoading(false);
      setMessage("Scores enregistrés avec succès !");
      setTimeout(() => {
        setMessage("");
        history.push("/cur-performance");
      }, 2000);
    })
    .catch(error => {
      console.error("Error saving data:", error);
      setErrorMessage("Error saving data. Please try again.");
      console.error("Détails de l'erreur:", error.message);
      
      // Même en cas d'erreur, essayer de générer le PDF avec les données disponibles
      const allClientConsommateurData = [];
      try {
        if (Array.isArray(cc_allData1) && cc_allData1.length > 0) allClientConsommateurData.push(...cc_allData1);
        if (Array.isArray(cc_allData2) && cc_allData2.length > 0) allClientConsommateurData.push(...cc_allData2);
      } catch (error) {
        console.error("Erreur lors de la concaténation des données:", error);
      }
      
      generatePdf(allClientConsommateurData);
      
      setIsLoading(false);
      history.push("/cur-performance");
    });
  }

  function generatePdf(cc_allData) {
    // Check if data exists
    if (!cc_allData || cc_allData.length === 0) {
      console.error("No data available to generate PDF");
      return;
    }
    
    console.log("Generating PDF with", cc_allData.length, "questions");
    
    // Create a new PDF document
    const doc = new jsPDF();
    const lineHeight = 10;
    const pageHeight = doc.internal.pageSize.height - 20;
    const pageWidth = doc.internal.pageSize.width - 20;
    let y = 20;

    // Add a title
    doc.setFontSize(16);
    doc.text("Client/Consumer Assessment Results", 105, y, { align: "center" });
    y += 15;
    
    // Add total score
    doc.setFontSize(14);
    doc.text(`Total score: ${cc_sum} / ${cc_allData.length}`, 105, y, { align: "center" });
    y += 15;
    
    doc.setFontSize(12);
    
    // Go through the data and add each question and answer to the PDF document
    cc_allData.forEach((data, index) => {
      // Check if data is valid
      if (!data || !data.question) {
        console.error("Invalid data for item", index);
        return;
      }
      
      const question = `Question ${index + 1}: ${data.question}`;
      const answer = `Answer: ${data.answer || 'No answer'}`;

      // Estimate text height after division to better manage page breaks
      const splitQuestion = doc.splitTextToSize(question, pageWidth);
      const estimatedHeight = splitQuestion.length * lineHeight + lineHeight * 2;
      
      // Check if we need to go to a new page
      if (y + estimatedHeight > pageHeight) {
        doc.addPage();
        y = 20;
      }

      // Write the question and answer to the PDF
      doc.text(splitQuestion, 10, y);
      y += splitQuestion.length * lineHeight;

      doc.text(answer, 10, y);
      y += lineHeight * 2; // Add some space between questions
    });

    // Add a summary page
    doc.addPage();
    y = 20;
    doc.setFontSize(16);
    doc.text("Client/Consumer Assessment Summary", 105, y, { align: "center" });
    y += 20;
    
    doc.setFontSize(12);
    doc.text(`Total number of questions: ${cc_allData.length}`, 10, y);
    y += lineHeight;
    doc.text(`Total "Yes" answers: ${cc_sum}`, 10, y);
    y += lineHeight;
    doc.text(`Score percentage: ${Math.round((cc_sum / cc_allData.length) * 100)}%`, 10, y);
    y += lineHeight * 2;
    
    // Add details for each section
    doc.text("Scores by section:", 10, y);
    y += lineHeight * 1.5;
    doc.text(`Client/Consumer 1: ${cc_yesCount1}`, 20, y); y += lineHeight;
    doc.text(`Client/Consumer 2: ${scoreState}`, 20, y); y += lineHeight * 2;
    
    const date = new Date();
    doc.text(`Generated on: ${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`, 10, y);

    // Save the PDF document
    doc.save("Client_Consumer_Assessment_Complete.pdf");
    console.log("Client/Consumer PDF generated successfully");
  }

  function calculateProgressPercentage() {
    const totalQuestions = document.getElementsByTagName("section").length;
    if (totalQuestions === 0) return 0;
    return Math.round((scoreState / totalQuestions) * 100);
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
            Your score: {scoreState} / {totalQuestions} ({calculateProgressPercentage()}%)
          </p>
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <div className="questions-container">
          <section className="question-card">
            <p className="question-text">Is your complaint rate above 75%?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Is your complaint rate above 75%?", "Yes")} 
                className={`btn-option ${selectedOptions["Is your complaint rate above 75%?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Is your complaint rate above 75%?", "No")} 
                className={`btn-option ${selectedOptions["Is your complaint rate above 75%?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
            </div>
          </section>

          <section className="question-card">
            <p className="question-text">Do you have a Warehouse Management System (WMS) to manage product movement and storage?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Do you have a Warehouse Management System (WMS) to manage product movement and storage?", "Yes")} 
                className={`btn-option ${selectedOptions["Do you have a Warehouse Management System (WMS) to manage product movement and storage?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Do you have a Warehouse Management System (WMS) to manage product movement and storage?", "No")} 
                className={`btn-option ${selectedOptions["Do you have a Warehouse Management System (WMS) to manage product movement and storage?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
            </div>
          </section>

          <section className="question-card">
            <p className="question-text">Do you take measures for data protection?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Do you take measures for data protection?", "Yes")} 
                className={`btn-option ${selectedOptions["Do you take measures for data protection?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Do you take measures for data protection?", "No")} 
                className={`btn-option ${selectedOptions["Do you take measures for data protection?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
            </div>
          </section>

          <section className="question-card">
            <p className="question-text">Do you have justified complaints about privacy violations or customer data loss?</p>
            <div className="question-actions">
              <button 
                onClick={() => clicked("Do you have justified complaints about privacy violations or customer data loss?", "Yes")} 
                className={`btn-option ${selectedOptions["Do you have justified complaints about privacy violations or customer data loss?"] === "Yes" ? "enabled" : ""}`}
              >
                Yes
              </button>
              <button 
                onClick={() => clicked("Do you have justified complaints about privacy violations or customer data loss?", "No")} 
                className={`btn-option ${selectedOptions["Do you have justified complaints about privacy violations or customer data loss?"] === "No" ? "enabled" : ""}`}
              >
                No
              </button>
            </div>
          </section>
        </div>

        <div className="form-actions">
          <Link to="/client-consommateur-1" className="btn-secondary">
            Back
          </Link>
          <button onClick={() => saveData()} className="btn-primary">
            Save and Continue
          </button>
        </div>

        {isLoading && (
          <div className="loading-indicator">
            <div className="spinner"></div>
            <p>{message}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ClientConsommateur2;
