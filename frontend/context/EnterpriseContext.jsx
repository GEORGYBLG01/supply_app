import React, { createContext, useState, useContext } from 'react';

const EnterpriseContext = createContext(null);

export const EnterpriseProvider = ({ children }) => {
  const [companyName, setCompanyName] = useState('');
  const [companySize, setCompanySize] = useState('');
  const [activitySector, setActivitySector] = useState('');
  const [enterpriseId, setEnterpriseId] = useState(() => localStorage.getItem('enterpriseId') || '');
  const [scores, setScores] = useState({
    environmental: 0,
    social: 0,
    modernization: 0,
    leadTime: 0,
    cost: 0,
    quality: 0,
    clientConsumer: 0
  });

  // Fonction pour mettre à jour les scores
  const updateScores = (newScores) => {
    // Vérifier si les scores ont réellement changé
    if (JSON.stringify(newScores) !== JSON.stringify(scores)) {
      setScores(newScores);
    }
  };

  // Fonction pour récupérer les données d'entreprise depuis l'API
  const fetchEnterpriseData = async (id) => {
    try {
      console.log(`fetchEnterpriseData appelé avec ID: ${id}`);
      // Corriger l'URL de l'API en utilisant enterprise (singulier) au lieu de enterprises (pluriel)
      const response = await fetch(`${window.env.API_URL || ''}/api/enterprise/${id}`, {
        headers: {
          'Authorization': localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : '',
        }
      });

      if (!response.ok) {
        console.error(`Erreur HTTP: ${response.status} - ${await response.text()}`);
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();
      console.log("Données entreprise reçues:", data);
      
      // Mettre à jour l'état local
      setCompanyName(data.company_name || '');
      setCompanySize(data.company_size || '');
      setActivitySector(data.activity_sector || '');
      setEnterpriseId(id);
      
      return data;
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
      return { success: false, error: error.message };
    }
  };

  // Fonction pour enregistrer les données d'entreprise
  const saveEnterpriseData = async (data) => {
    try {
      // Effectuer un appel API réel au backend
      const response = await fetch(`${window.env.API_URL || ''}/api/save-enterprises`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : '',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const result = await response.json();
      
      // Mettre à jour l'état local
      setCompanyName(data.company_name);
      setCompanySize(data.company_size);
      setActivitySector(data.activity_sector);
      
      // Stocker l'ID de l'entreprise dans le localStorage pour une utilisation ultérieure
      if (result.enterpriseId) {
        setEnterpriseId(result.enterpriseId);
        localStorage.setItem('enterpriseId', result.enterpriseId);
      }
      
      return result;
    } catch (error) {
      console.error("Erreur lors de la sauvegarde des données:", error);
      return { success: false, error: error.message };
    }
  };

  return (
    <EnterpriseContext.Provider 
      value={{ 
        companyName, 
        setCompanyName, 
        companySize, 
        setCompanySize, 
        activitySector, 
        setActivitySector,
        enterpriseId,
        setEnterpriseId,
        scores,
        updateScores,
        fetchEnterpriseData,
        saveEnterpriseData 
      }}
    >
      {children}
    </EnterpriseContext.Provider>
  );
};

export const useEnterprise = () => {
  const context = useContext(EnterpriseContext);
  if (!context) {
    throw new Error('useEnterprise must be used within an EnterpriseProvider');
  }
  return context;
}; 