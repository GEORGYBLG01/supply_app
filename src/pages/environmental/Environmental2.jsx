import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import QuestionnaireLayout from '../../components/QuestionnaireLayout';
import axios from 'axios';

const Environmental2 = () => {
  const [answers, setAnswers] = useState({
    "Do you control and limit liquid pollutant emissions into water and soil related to your activities?": "",
    "Do you monitor your water consumption volume?": "",
    "Have you invested in water recovery and treatment technologies?": "",
    "Do you control and limit air emissions related to your activities?": "",
    "Do you monitor non-renewable energy consumption related to your activities?": ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAnswerChange = (question, answer) => {
    setAnswers(prev => ({
      ...prev,
      [question]: answer
    }));
  };

  const calculateScore = () => {
    return Object.values(answers).filter(answer => answer === "Yes").length;
  };

  const saveData = async () => {
    try {
      setIsLoading(true);
      setError('');
      
      // Vérifier que toutes les questions ont une réponse
      const unansweredQuestions = Object.entries(answers).filter(([_, value]) => value === "");
      if (unansweredQuestions.length > 0) {
        setError('Veuillez répondre à toutes les questions avant de continuer.');
        setIsLoading(false);
        return;
      }

      console.log("Données à envoyer:", Object.entries(answers).map(([question, answer]) => ({
        question,
        answer,
        category: "environmental",
        enterpriseId: user?.enterpriseId || "",
        userId: user?.id || "",
        section: "environmental-2",
        timestamp: new Date().toISOString()
      })));

      const response = await axios.post(
        'http://localhost:8000/api/save-answers',
        Object.entries(answers).map(([question, answer]) => ({
          question,
          answer,
          category: "environmental",
          enterpriseId: user?.enterpriseId || "",
          userId: user?.id || "",
          section: "environmental-2",
          timestamp: new Date().toISOString()
        }))
      );

      if (response.data) {
        console.log("Data saved successfully:", response.data);
        const score = calculateScore();
        console.log("Score environmental2 mis à jour:", score);
        navigate('/environmental3');
      }
    } catch (error) {
      console.error("Error saving data:", error);
      console.log("Détails de l'erreur:", error.message);
      setError(`Erreur lors de la sauvegarde des données: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <QuestionnaireLayout
      title="Questionnaire Environmental - Partie 2: Eau et émissions atmosphériques"
      questions={Object.keys(answers).map(question => ({
        question,
        answer: answers[question],
        onChange: (answer) => handleAnswerChange(question, answer)
      }))}
      onNext={saveData}
      isLoading={isLoading}
      error={error}
      showBreadcrumb
      currentStep={2}
      totalSteps={5}
      category="environmental"
    />
  );
};

export default Environmental2; 