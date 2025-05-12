import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import NavItems3 from "../NavItems3";
import Frame11332 from "../Frame11332";
import Frame114 from "../Frame114";
import Frame115 from "../Frame115";
import Frame117 from "../Frame117";
import "./CurPerformance.css";
import { useEnterprise } from "../../context/EnterpriseContext";

// Optimized metric card component with React.memo
const MetricCard = React.memo(({ metricKey, label, score, maxScore = 20, isVisible }) => {
  const scoreValue = score !== undefined ? score : 'N/A';
  
  return (
    <div 
      className={`metric-card ${isVisible ? 'slide-in-right' : ''} responsive-metric-card`}
    >
      <h2 className="metric-title responsive-metric-title">{label}</h2>
      <div className="metric-value responsive-metric-value">
        <span className="score-value">
          {scoreValue}
        </span>
        <span className="score-max">/{maxScore}</span>
      </div>
      <div className="score-bar responsive-score-bar">
        <div 
          className="score-fill"
          style={{ 
            width: isVisible ? 
              `${score !== undefined ? (score / maxScore) * 100 : 0}%` : '0%'
          }}
        ></div>
      </div>
    </div>
  );
});

// Optimized enterprise information panel component
const EnterpriseInfoPanel = React.memo(({ enterpriseInfo }) => {
  return (
    <div className="enterprise-info-panel responsive-info-panel">
      <h2 className="enterprise-info-title responsive-info-title">Company Information</h2>
      <div className="enterprise-info-content responsive-info-content">
        <div className="enterprise-info-item responsive-info-item">
          <span className="info-label">Name:</span>
          <span className="info-value">{enterpriseInfo.company_name || "Not available"}</span>
        </div>
        <div className="enterprise-info-item responsive-info-item">
          <span className="info-label">Size:</span>
          <span className="info-value">{enterpriseInfo.company_size ? `${enterpriseInfo.company_size} employees` : "Not available"}</span>
        </div>
        <div className="enterprise-info-item responsive-info-item">
          <span className="info-label">Business sector:</span>
          <span className="info-value">{enterpriseInfo.activity_sector || "Not available"}</span>
        </div>
        <div className="enterprise-info-item responsive-info-item">
          <span className="info-label">Assessment date:</span>
          <span className="info-value">{enterpriseInfo.date_created || enterpriseInfo.date_added || "Not available"}</span>
        </div>
      </div>
    </div>
  );
});

// Main component
function CurPerformance(props) {
  const {
    x1200PxLogo_Icam__20081,
    resultPropositions,
    place,
    formalismesEnFonct,
    navItems3Props,
    frame11332Props,
    currentResults = {},
    enterpriseData = {}
  } = props;

  // Hook to access enterprise context
  const { enterpriseId, updateScores } = useEnterprise();

  // States
  const [animate, setAnimate] = useState(false);
  const [metricsVisible, setMetricsVisible] = useState({});
  const [scores, setScores] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [enterpriseInfo, setEnterpriseInfo] = useState(enterpriseData);
  const [apiResults, setApiResults] = useState(currentResults);

  // Maximum number of questions per category - memoized
  const maxQuestionsPerCategory = useMemo(() => ({
    environmental: 25,
    social: 35, 
    modernization: 27,
    leadTime: 15,
    cost: 18,
    quality: 35,
    clientConsumer: 18
  }), []);

  // Metrics names - memoized
  const metrics = useMemo(() => ({
    environmental: "Environment",
    social: "Social",
    modernization: "Modernization",
    leadTime: "Lead Time",
    cost: "Cost",
    quality: "Quality",
    clientConsumer: "Client / Consumer"
  }), []);

  // Function to retrieve scores from API - optimized with useCallback
  const fetchScores = useCallback(async () => {
    if (!enterpriseId) {
      console.error("Enterprise ID not available.");
      setError("Enterprise ID not available. Please complete the acquisition section.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      
      // Using AbortController to be able to cancel the request
      const controller = new AbortController();
      const signal = controller.signal;
      
      // API call to retrieve scores
      const apiUrl = `${window.env.API_URL}/api/enterprise-scores/${enterpriseId}`;
      
      const response = await fetch(apiUrl, {
        headers: {
          "Authorization": localStorage.getItem("token") ? `Bearer ${localStorage.getItem("token")}` : "",
        },
        signal
      });

      if (!response.ok) {
        throw new Error(`API Error (${response.status}): ${await response.text()}`);
      }

      const data = await response.json();
      
      // Check if data was found
      if (data.found === false) {
        console.warn("No case found for this company");
        setError("No case found for this company. Please complete the questionnaires first.");
        setLoading(false);
        return;
      }
      
      // Update local state with received data
      setApiResults(data);
      
      // Also retrieve company information with the same technique
      try {
        const enterpriseUrl = `${window.env.API_URL}/api/enterprise/${enterpriseId}`;
        const enterpriseResponse = await fetch(enterpriseUrl, {
          headers: {
            "Authorization": localStorage.getItem("token") ? `Bearer ${localStorage.getItem("token")}` : "",
          },
          signal
        });
        
        if (enterpriseResponse.ok) {
          const enterpriseData = await enterpriseResponse.json();
          setEnterpriseInfo(enterpriseData);
        }
      } catch (err) {
        if (!signal.aborted) {
          console.error("Error retrieving company data:", err);
        }
      }
      
      setLoading(false);
      
      // Returns a function to cancel ongoing requests
      return () => controller.abort();
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error("Error retrieving scores:", err);
        setError("Connection error. Please check your internet connection and try again.");
        setLoading(false);
      }
    }
  }, [enterpriseId]);

  // Load scores when component mounts with cleanup
  useEffect(() => {
    const abortHandler = fetchScores();
    return () => {
      if (abortHandler && typeof abortHandler === 'function') {
        abortHandler();
      }
    };
  }, [fetchScores]);

  // Data processing and calculation of scores out of 20
  useEffect(() => {
    if (apiResults && Object.keys(apiResults).length > 0) {
      const calculatedScores = {};
      
      // For each category, calculate the score out of 20
      Object.entries(apiResults).forEach(([category, value]) => {
        if (category in maxQuestionsPerCategory && typeof value === 'number') {
          // Score = (number of positive answers / max number of questions) * 20
          const maxQuestions = maxQuestionsPerCategory[category];
          const scoreOn20 = (value / maxQuestions) * 20;
          
          // Round to 1 decimal place
          calculatedScores[category] = Math.round(scoreOn20 * 10) / 10;
        }
      });
      
      // Check if the scores have actually changed before updating them
      const scoresChanged = JSON.stringify(calculatedScores) !== JSON.stringify(scores);
      
      if (scoresChanged) {
        setScores(calculatedScores);
        
        // Update scores in the global context
        if (typeof updateScores === 'function') {
          updateScores(calculatedScores);
        }
      }
    }
  }, [apiResults, maxQuestionsPerCategory, updateScores, scores]);

  // Trigger animations on component mount
  useEffect(() => {
    setAnimate(true);
    
    // Check if all metrics are already visible
    const allVisible = Object.keys(metrics).every(key => metricsVisible[key]);
    
    // Don't execute timeouts if all metrics are already visible
    if (!allVisible) {
      // Reveal metrics one by one with a delay
      Object.keys(metrics).forEach((key, index) => {
        setTimeout(() => {
          setMetricsVisible(prev => ({
            ...prev,
            [key]: true
          }));
        }, 300 + (index * 100)); // Reduced to 100ms instead of 150ms for faster animation
      });
    }
  }, [metrics, metricsVisible]);

  // Global score calculation - memoized
  const globalScore = useMemo(() => {
    if (Object.keys(scores).length === 0) return "N/A";
    
    const total = Object.values(scores).reduce((sum, score) => sum + score, 0);
    return (total / Object.keys(scores).length).toFixed(1);
  }, [scores]);

  // Optimized event handlers
  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  const handleNavigateHome = useCallback(() => {
    window.location.href = '/home';
  }, []);

  const handleNavigateAnalysis = useCallback(() => {
    window.location.href = '/functional-view';
  }, []);

  const renderMetricsGrid = useCallback(() => {
    return (
      <div className="metrics-grid responsive-metrics-grid">
        {Object.entries(metrics).map(([key, label], index) => (
          <MetricCard
            key={`metric-${key}`}
            metricKey={key}
            label={label}
            score={scores[key]}
            isVisible={metricsVisible[key]}
          />
        ))}
      </div>
    );
  }, [metrics, scores, metricsVisible]);

  return (
    <div className="container-center-horizontal responsive-container">
      <div className="cur-performance-10 screen">
        <div className="overlap-group-91 responsive-header">
          <Link to="/home">
            <img
              className="x1200px-logo_icam_-_2008-1-88 responsive-logo"
              src={x1200PxLogo_Icam__20081}
              alt="ICAM Logo"
              loading="lazy"
            />
          </Link>
          <div className="nav-items-container-52 responsive-nav">
            <NavItems3
              className={navItems3Props.className}
              frame1172Props={navItems3Props.frame1172Props}
              frame1162Props={navItems3Props.frame1162Props}
              frame1132Props={navItems3Props.frame1132Props}
            />
            <div className="nav-items-2-56 responsive-nav-items">
              <Frame11332 className={frame11332Props.className} />
              <Frame114 />
              <Frame115 />
              <div className="frame-116-181">
                <div className="result-propositions valign-text-middle inter-medium-white-18px">
                  {resultPropositions}
                </div>
              </div>
              <Frame117 />
            </div>
          </div>
        </div>

        <div className="flex-row-154 responsive-breadcrumb">
          <Link to="/functional-view">
            <div className="frame-5-25">
              <div className="place-273 valign-text-middle inter-bold-tropical-rain-forest-18px">
                {place}
              </div>
            </div>
          </Link>
          <p className="formalismes-en-fonct-1 valign-text-middle bevan-normal-white-20px responsive-title">
            {formalismesEnFonct}
          </p>
        </div>

        {loading ? (
          <div className="loading-container responsive-section">
            <div className="loading-spinner"></div>
            <p className="loading-text">Loading data...</p>
          </div>
        ) : error ? (
          <div className="error-container responsive-section">
            <p className="error-message">{error}</p>
            <button className="retry-button" onClick={fetchScores}>
              Try again
            </button>
          </div>
        ) : (
          <div className={`results-container ${animate ? 'fade-in' : ''} responsive-results`}>
            <h1 className="results-title responsive-heading">Assessment Results</h1>
            
            {/* Company Information */}
            <EnterpriseInfoPanel enterpriseInfo={enterpriseInfo} />
            
            {/* Metrics grid - optimized with virtualization if necessary */}
            {renderMetricsGrid()}
            
            <div className={`global-score always-visible ${animate ? 'bounce-effect' : ''} responsive-global-score`}>
              <div className="global-score-container">
                <div className="global-score-circle">
                  <div className="circle-content">
                    {globalScore}
                  </div>
                </div>
                <div className="global-score-details">
                  <div className="global-score-label">Global Score</div>
                  <div className="global-score-description">Overall performance across all categories</div>
                </div>
              </div>
            </div>
            
            <div className="actions-container responsive-actions">
              <div className="actions-row">
                <button 
                  onClick={handleNavigateHome} 
                  className="action-button back-button responsive-button"
                >
                  <span className="button-icon">←</span> Back
                </button>
                
                <button 
                  onClick={handleNavigateAnalysis} 
                  className="action-button analysis-button functional-view-button responsive-button"
                >
                  <span className="button-icon">📊</span> Functional View
                </button>
                
                <button 
                  onClick={handlePrint} 
                  className="action-button print-button responsive-button"
                >
                  <span className="button-icon">🖨️</span> Print
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default React.memo(CurPerformance);
