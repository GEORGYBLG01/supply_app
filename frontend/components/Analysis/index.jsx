import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavItems3 from "../NavItems3";
import Frame11332 from "../Frame11332";
import Frame114 from "../Frame114";
import Frame232 from "../Frame232";
import Frame222 from "../Frame222";
import jsPDF from "jspdf";
import "./Analysis.css";

function Analysis(props) {
  const [result, setResult] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const {
    analysis,
    label,
    x1200PxLogo_Icam__20081,
    place,
    formalismesEnFonct,
    navItems3Props,
    frame11332Props,
    frame232Props,
    frame222Props,
    toggleProps,
  } = props;

  // Fonction d'inférence pour récupérer les résultats
  function inference() {
    fetch(window.env.API_URL + "/inferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Aucun fichier trouvé pour l'analyse. Veuillez d'abord télécharger un fichier.");
          }
          throw new Error(`Erreur serveur: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("API Response:", data); // Log de la réponse de l'API
        // Vérification de la structure de la réponse
        if (data && data.errors && Array.isArray(data.errors)) {
          const responseData = data.errors; // Accéder directement à 'errors'
          setResult(responseData);
          alert("Analyse réussie");
        } else if (data && data.message) {
          // Cas où il n'y a pas d'erreurs mais un message de succès
          setResult([data.message]);
          alert(data.message);
        } else if (data && data.detail) {
          // Cas où il y a un message d'erreur détaillé
          alert(`Erreur: ${data.detail}`);
          console.error("Erreur détaillée:", data.detail);
        } else {
          console.error("Structure de réponse inattendue:", data);
          alert("Échec: La réponse n'a pas la structure attendue.");
        }
      })
      .catch((error) => {
        console.error(error);
        alert(`Échec de l'analyse: ${error.message}`);
      });
  }

  // Fonction pour générer et sauvegarder le PDF
  function saveAsPDF() {
    // Vérification de si result est un tableau et contient des erreurs
    if (!result || !Array.isArray(result) || result.length === 0) {
      alert("No results or errors to save!");
      return;
    }

    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.width;
    const pageHeight = pdf.internal.pageSize.height;
    let currentVerticalPosition = 20;

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(18);
    pdf.text("Rapport d'Erreurs d'Analyse", pageWidth / 2, currentVerticalPosition, { align: "center" });
    currentVerticalPosition += 20;

    pdf.setDrawColor(0);
    pdf.setLineWidth(0.5);
    pdf.line(10, currentVerticalPosition, pageWidth - 10, currentVerticalPosition);
    currentVerticalPosition += 10;

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(12);

    // Ajouter les erreurs dans le PDF directement à partir de 'result'
    if (Array.isArray(result) && result.length > 0) {
      console.log("Filtered Errors:", result);  // Affichage dans la console pour vérifier les erreurs

      // Ajouter les erreurs dans le PDF
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(14);
      pdf.text("Liste des erreurs :", 10, currentVerticalPosition);
      currentVerticalPosition += 10;

      // Ajouter les erreurs une par une dans le PDF
      result.forEach((error, index) => {
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(12);
        pdf.text(`${index + 1}. ${error}`, 10, currentVerticalPosition);
        currentVerticalPosition += 8;  // Espace entre les erreurs
      });

      currentVerticalPosition += 15;
    } else {
      alert("No errors found in the API response.");
      return;
    }

    pdf.setDrawColor(0);
    pdf.setLineWidth(0.5);
    pdf.line(10, currentVerticalPosition, pageWidth - 10, currentVerticalPosition);
    currentVerticalPosition += 10;

    const currentDate = new Date().toLocaleDateString();
    pdf.setFont("helvetica", "italic");
    pdf.setFontSize(10);
    const footerText = `Generated on: ${currentDate}`;
    pdf.text(footerText, pageWidth - 10 - pdf.getTextWidth(footerText), pageHeight - 10, { align: "right" });

    pdf.save(`analysis_errors_${currentDate}.pdf`);
  }

  // Fonction pour gérer le téléchargement de fichier
  function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);
    setUploadStatus("Téléchargement en cours...");

    const formData = new FormData();
    formData.append("file", file);

    fetch(window.env.API_URL + "/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erreur serveur: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Upload Response:", data);
        setUploadStatus("Fichier téléchargé avec succès");
        setIsUploading(false);
      })
      .catch((error) => {
        console.error("Upload error:", error);
        setUploadStatus(`Erreur de téléchargement: ${error.message}`);
        setIsUploading(false);
      });
  }

  return (
    <div className="container-center-horizontal">
      <div className="analysis-88 screen">
        <div className="overlap-group-13">
          <div className="rectangle-2"></div>

          <NavItems3
            className={navItems3Props.className}
            frame1172Props={navItems3Props.frame1172Props}
            frame1162Props={navItems3Props.frame1162Props}
            frame1132Props={navItems3Props.frame1132Props}
          />

          <div className="nav-items-2-17">
            <Frame11332 className={frame11332Props.className} />
            <Frame114 />

            <Link to="/analysis">
              <div className="frame-115-115">
                <div className="analysis-89 valign-text-middle inter-medium-white-18px">
                  {analysis}
                </div>
              </div>
            </Link>

            <Frame232 headerMenuDefault2Props={frame232Props.headerMenuDefault2Props} />

            <div className="label-98 inter-medium-star-dust-18-1px">{label}</div>
          </div>

          <Link to="/home">
            <img
              className="x1200px-logo_icam_-_2008-1-13"
              src={x1200PxLogo_Icam__20081}
              alt="1200px-Logo_ICAM_-_2008 1"
            />
          </Link>

          <Link to="/functional-view">
            <Frame222>{frame222Props.children}</Frame222>
          </Link>

          <Link to="/visual-management-1">
            <div className="frame-5-9">
              <div className="place-74 valign-text-middle inter-bold-tropical-rain-forest-18px">
                {place}
              </div>
            </div>
          </Link>

          <p className="formalismes-en-fonct valign-text-middle">
            {formalismesEnFonct}
            <div className="upload-section">
              <h3 className="upload-title">Télécharger un fichier d'analyse</h3>
              <p className="upload-description">Choisissez une image à analyser (formats .jpg, .png, .jpeg, .gif, .bmp)</p>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                disabled={isUploading}
                className="file-input"
              />
              {uploadStatus && <span className="upload-status">{uploadStatus}</span>}
              <div className="action-buttons">
                <button className="bu analysis-button" onClick={inference} disabled={isUploading}>
                  <span className="button-icon">📊</span> Analyser
                </button>
                <button className="bu export-button" onClick={saveAsPDF} disabled={!result || result.length === 0}>
                  <span className="button-icon">📄</span> Exporter en PDF
                </button>
              </div>
            </div>
          </p>

          <div className="body">
            {result && result.length > 0 ? (
              <div className="result-groups">
                {Array.isArray(result) && result.length > 0 ? (
                  result.map((item, index) => (
                    <div key={index} className="result-box">
                      <h2>Erreur d'analyse #{index + 1}</h2>
                      <div className="scrollable-container">
                        <div className="result-item">
                          <p>{item}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="result-box">
                    <h2>Résultat d'analyse</h2>
                    <div className="scrollable-container">
                      <div className="result-item">
                        <p>Aucune erreur détectée.</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : null}
            {isUploading && (
              <div className="loading-container">
                <div className="loading-spinner"></div>
                <p className="loading-text">Analyse en cours...</p>
              </div>
            )}
          </div>
          
          {/* Bouton pour compléter le flux de navigation */}
          <div className="navigation-complete">
            <Link to="/home" className="complete-button">
              <button className="bu complete-flow-button">
                <span className="button-icon">✓</span> Terminer le processus
              </button>
            </Link>
            <p className="complete-message">Félicitations pour avoir complété le processus d'analyse !</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analysis;
