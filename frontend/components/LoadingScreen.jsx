import React, { useState, useEffect } from "react";

const LoadingScreen = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [loadingPhrase, setLoadingPhrase] = useState('');

  // Phrases inspirantes pour l'écran de chargement
  const loadingPhrases = [
    "Processing your data...",
    "Getting things ready...",
    "Almost there...",
    "Preparing your experience...",
    "Building your interface..."
  ];

  useEffect(() => {
    // Sélectionner aléatoirement une phrase
    const randomPhrase = loadingPhrases[Math.floor(Math.random() * loadingPhrases.length)];
    setLoadingPhrase(randomPhrase);

    // Simuler la progression du chargement
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          // Appeler la fonction de callback lorsque le chargement est terminé
          setTimeout(() => {
            if (onLoadingComplete) onLoadingComplete();
          }, 500); // Petit délai pour montrer la barre complète
          return 100;
        }
        // Augmenter la progression de manière non linéaire pour simuler un chargement réaliste
        const increment = Math.floor(Math.random() * 10) + 1;
        return Math.min(prevProgress + increment, 100);
      });
    }, 200);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <div className="loading-screen">
      <div className="loading-container">
        <div className="loading-icon">
          <svg width="60" height="60" viewBox="0 0 60 60">
            <circle cx="30" cy="30" r="25" fill="none" stroke="#E8D8B8" strokeWidth="3" />
            <circle
              cx="30"
              cy="30"
              r="25"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="5"
              strokeDasharray="157"
              strokeDashoffset={157 * (1 - progress / 100)}
              strokeLinecap="round"
              className="progress-circle"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1E4549" />
                <stop offset="100%" stopColor="#3A6D71" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <h2>{loadingPhrase}</h2>
        
        <div className="progress-container">
          <div className="progress-bar-container">
            <div className="progress-background">
              <div className="progress-glow"></div>
            </div>
            <div 
              className="progress-bar" 
              style={{ width: `${progress}%` }}
            >
              <div className="progress-shine"></div>
              <div className="progress-particles">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className={`particle particle-${i+1}`}></div>
                ))}
              </div>
            </div>
            <div className="progress-dots">
              {[20, 40, 60, 80].map(point => (
                <div 
                  key={point} 
                  className={`progress-dot ${progress >= point ? 'active' : ''}`}
                  style={{ left: `${point}%` }}
                ></div>
              ))}
            </div>
          </div>
          <div className="progress-text">
            <span className="progress-value">{progress}</span>
            <span className="percent">%</span>
            <span className="progress-complete">{progress === 100 ? ' Complete!' : ''}</span>
          </div>
        </div>
        
        <style>{`
          .loading-icon {
            margin-bottom: 20px;
            animation: floatAnimation 3s ease-in-out infinite;
          }
          
          @keyframes floatAnimation {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-10px) rotate(3deg); }
          }
          
          .progress-circle {
            transition: stroke-dashoffset 0.5s ease;
            transform-origin: center;
            transform: rotate(-90deg);
            filter: drop-shadow(0 0 8px rgba(30, 69, 73, 0.4));
          }

          .progress-container {
            position: relative;
            width: 100%;
            margin-top: 10px;
          }
          
          .progress-bar-container {
            width: 100%;
            height: 12px;
            background: transparent;
            border-radius: 10px;
            position: relative;
            overflow: visible;
            margin: 15px 0;
          }
          
          .progress-background {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(240, 230, 210, 0.8);
            border-radius: 10px;
            overflow: hidden;
            box-shadow: inset 0 1px 3px rgba(30, 69, 73, 0.12);
          }
          
          .progress-glow {
            position: absolute;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle at center, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.1) 70%, transparent 100%);
            mix-blend-mode: overlay;
          }
          
          .progress-bar {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 0%;
            border-radius: 10px;
            background: linear-gradient(90deg, #1E4549, #3A6D71);
            box-shadow: 0 0 15px rgba(30, 69, 73, 0.5);
            transition: width 0.5s cubic-bezier(0.33, 1, 0.68, 1);
            z-index: 2;
            overflow: hidden;
          }
          
          .progress-shine {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(
              90deg,
              transparent,
              rgba(255, 255, 255, 0.4),
              transparent
            );
            animation: shine 2s infinite;
            z-index: 3;
          }
          
          @keyframes shine {
            0% { transform: translateX(-200%); }
            100% { transform: translateX(200%); }
          }
          
          .progress-particles {
            position: absolute;
            width: 100%;
            height: 100%;
            overflow: hidden;
            z-index: 1;
          }
          
          .particle {
            position: absolute;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #F0E6D2;
            opacity: 0.7;
            z-index: 2;
            filter: blur(1px);
            animation: float 4s infinite;
          }
          
          .particle-1 { top: -50%; left: 15%; animation-delay: 0s; }
          .particle-2 { top: 50%; left: 35%; animation-delay: 0.5s; }
          .particle-3 { top: 30%; left: 55%; animation-delay: 1s; }
          .particle-4 { top: -30%; left: 75%; animation-delay: 1.5s; }
          .particle-5 { top: 70%; left: 85%; animation-delay: 2s; }
          
          @keyframes float {
            0%, 100% { transform: translateY(0); opacity: 0.7; }
            50% { transform: translateY(15px); opacity: 0.3; }
          }
          
          .progress-dots {
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: 4;
          }
          
          .progress-dot {
            position: absolute;
            width: 4px;
            height: 4px;
            top: 50%;
            transform: translate(-50%, -50%);
            background: rgba(240, 230, 210, 0.5);
            border-radius: 50%;
            transition: all 0.3s ease;
          }
          
          .progress-dot.active {
            background: #F0E6D2;
            width: 8px;
            height: 8px;
            box-shadow: 0 0 10px rgba(240, 230, 210, 0.8);
          }
          
          .progress-text {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            color: #1E4549;
            margin-top: 5px;
          }
          
          .percent {
            font-size: 14px;
            margin-left: 2px;
          }
          
          .progress-complete {
            margin-left: 5px;
            color: #4A7073;
            font-weight: 600;
          }
          
          .loading-screen {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #FFFFFF;
            z-index: 1000;
          }
          
          .loading-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 40px;
            border-radius: 12px;
            background-color: #FFFFFF;
            box-shadow: 0 10px 25px rgba(30, 69, 73, 0.1);
            max-width: 400px;
            width: 80%;
          }
          
          .loading-container h2 {
            color: #1E4549;
            font-size: 20px;
            margin: 0 0 20px 0;
            text-align: center;
            font-weight: 500;
          }
          
          .loading-container p {
            color: #4A7073;
            margin-top: 20px;
            text-align: center;
            font-size: 14px;
          }
        `}</style>
      </div>
    </div>
  );
};

export default LoadingScreen; 