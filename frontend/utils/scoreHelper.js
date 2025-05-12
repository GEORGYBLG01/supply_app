/**
 * Utilitaire pour la gestion des scores
 * Ce fichier centralise la logique de sauvegarde des scores
 * pour garantir l'uniformité des noms de catégories
 */

/**
 * Sauvegarde les scores totaux de toutes les catégories
 * @param {Object} scores - Objet contenant les scores de chaque catégorie
 * @param {string} companyName - Nom de l'entreprise
 * @param {string} enterpriseId - ID de l'entreprise
 * @param {string} userId - ID de l'utilisateur
 * @returns {Promise} Promesse résolue après la sauvegarde
 */
export const saveAllScores = async (scores, companyName, enterpriseId, userId) => {
  console.log("Appel à saveAllScores avec les paramètres:", {
    scores: scores ? "Présent" : "Absent",
    companyName: companyName || "Non fourni",
    enterpriseId: enterpriseId || "Non fourni",
    userId: userId || "Non fourni"
  });
  
  // Vérifier que scores est bien défini
  if (!scores || typeof scores !== 'object') {
    console.error("ERREUR CRITIQUE: scores n'est pas un objet valide", scores);
    scores = {}; // Initialiser avec un objet vide plutôt que de planter
  }
  
  // Vérifier la présence de l'ID d'entreprise
  if (!enterpriseId) {
    console.error("ERREUR CRITIQUE: enterpriseId manquant lors de la sauvegarde des scores");
    enterpriseId = localStorage.getItem("enterpriseId");
    console.log(`Tentative de récupération depuis le localStorage: ${enterpriseId}`);
    
    if (!enterpriseId) {
      throw new Error("Impossible de sauvegarder les scores: ID d'entreprise manquant");
    }
  }
  
  // Liste des catégories requises
  const requiredCategories = [
    "social", 
    "environmental", 
    "quality", 
    "cost", 
    "leadTime", 
    "modernization", 
    "clientConsumer"
  ];
  
  // Valider ou initialiser chaque catégorie de score
  const validatedScores = {};
  requiredCategories.forEach(category => {
    // Récupérer la valeur depuis l'objet scores
    const value = scores && scores[category] !== undefined ? scores[category] : 0;
    
    // Convertir en nombre et s'assurer qu'elle est valide
    const numericValue = parseInt(value, 10);
    validatedScores[category] = isNaN(numericValue) ? 0 : numericValue;
    
    console.log(`Score ${category}: ${validatedScores[category]} (original: ${value})`);
  });
  
  // Vérifier si au moins un score est non-nul
  const hasNonZeroScores = Object.values(validatedScores).some(value => value > 0);
  if (!hasNonZeroScores) {
    console.warn("ATTENTION: Tous les scores sont à zéro. Vérifiez que l'évaluation a bien été complétée.");
  }
  
  // Structure uniforme avec les noms de catégories standardisés
  const allScoresData = {
    enterprise: {
      name: companyName || "Entreprise non spécifiée"
    },
    // Utiliser les valeurs validées pour chaque catégorie
    social: { Total: validatedScores.social },
    environmental: { Total: validatedScores.environmental },
    quality: { Total: validatedScores.quality },
    cost: { Total: validatedScores.cost },
    leadTime: { Total: validatedScores.leadTime },
    modernization: { Total: validatedScores.modernization },
    clientConsumer: { Total: validatedScores.clientConsumer },
    // Métadonnées
    enterpriseId: enterpriseId,
    userId: userId,
    timestamp: new Date().toISOString()
  };
  
  console.log("Sauvegarde des scores totaux:", JSON.stringify(allScoresData, null, 2));
  
  // Vérifier que les données ne sont pas vides
  if (!allScoresData || Object.keys(allScoresData).length === 0) {
    console.error("ERREUR CRITIQUE: Les données à envoyer sont vides");
    throw new Error("Impossible de sauvegarder: données vides");
  }
  
  try {
    const response = await fetch(`${window.env.API_URL}/api/save-points`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token") ? `Bearer ${localStorage.getItem("token")}` : "",
      },
      body: JSON.stringify(allScoresData),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Erreur lors de la sauvegarde (${response.status}): ${errorText}`);
      throw new Error(`Erreur lors de la sauvegarde (${response.status}): ${errorText}`);
    }
    
    const result = await response.json();
    console.log("Résultat de la sauvegarde:", result);
    
    // Vérification si l'ID d'entreprise a été correctement utilisé
    if (result.had_enterprise_id === false) {
      console.warn("L'ID d'entreprise n'a pas été correctement enregistré!");
    }
    
    // Vérifier que toutes les catégories ont été correctement sauvegardées
    if (result.categories_status) {
      console.log("Statut des catégories sauvegardées:");
      Object.entries(result.categories_status).forEach(([category, status]) => {
        console.log(`  - ${category}: ${status}`);
      });
    }
    
    return result;
  } catch (error) {
    console.error("Erreur lors de la sauvegarde des scores:", error);
    throw error;
  }
};

/**
 * Sauvegarde le score total d'une catégorie
 * @param {string} category - Nom de la catégorie (en format standardisé)
 * @param {number} score - Score total
 * @param {string} enterpriseId - ID de l'entreprise
 * @param {string} userId - ID de l'utilisateur
 * @returns {Promise} Promesse résolue après la sauvegarde
 */
export const saveCategoryScore = async (category, score, enterpriseId, userId) => {
  console.log("Appel à saveCategoryScore avec les paramètres:", {
    category: category || "Non fournie",
    score: score !== undefined ? score : "Non fourni",
    enterpriseId: enterpriseId || "Non fourni",
    userId: userId || "Non fourni"
  });
  
  // Vérifier que la catégorie est bien définie
  if (!category) {
    console.error("ERREUR: Catégorie non spécifiée");
    throw new Error("Impossible de sauvegarder le score: catégorie manquante");
  }
  
  // Vérifier que le score est bien défini
  if (score === undefined || score === null) {
    console.error("ERREUR: Score non spécifié");
    score = 0; // Valeur par défaut
  }
  
  // Convertir le score en nombre
  const numericScore = parseInt(score, 10);
  if (isNaN(numericScore)) {
    console.warn(`Score invalide: ${score}, utilisation de 0 par défaut`);
    score = 0;
  } else {
    score = numericScore;
  }
  
  // Récupérer l'ID d'entreprise du localStorage si non fourni
  if (!enterpriseId) {
    console.warn("ID d'entreprise non fourni, tentative de récupération depuis localStorage");
    enterpriseId = localStorage.getItem("enterpriseId");
    if (!enterpriseId) {
      console.error("ERREUR: Impossible de trouver l'ID d'entreprise");
      throw new Error("ID d'entreprise manquant");
    }
  }
  
  const categoryKey = getCategoryKey(category);
  console.log(`Utilisation de la clé de catégorie standardisée: ${categoryKey}`);
  
  const scoreData = [{
    question: `${categoryKey} Total Score`,
    answer: score.toString(),
    category: categoryKey, // Utiliser la clé standardisée
    section: "summary",
    enterpriseId: enterpriseId,
    userId: userId,
    timestamp: new Date().toISOString()
  }];
  
  console.log("Données à envoyer:", JSON.stringify(scoreData, null, 2));
  
  try {
    console.log(`Envoi de la requête à ${window.env.API_URL}/api/save-answers`);
    const response = await fetch(`${window.env.API_URL}/api/save-answers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token") ? `Bearer ${localStorage.getItem("token")}` : "",
      },
      body: JSON.stringify(scoreData),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Erreur serveur (${response.status}): ${errorText}`);
      throw new Error(`Erreur lors de la sauvegarde (${response.status}): ${errorText}`);
    }
    
    const result = await response.json();
    console.log("Résultat de la sauvegarde:", result);
    return result;
  } catch (error) {
    console.error(`Erreur lors de la sauvegarde du score ${category}:`, error);
    throw error;
  }
};

/**
 * Convertit un nom de catégorie quelconque en clé standardisée
 * @param {string} category - Nom de catégorie (peut être n'importe quel format)
 * @returns {string} Clé standardisée
 */
const getCategoryKey = (category) => {
  // Table de correspondance pour assurer l'uniformité
  const categoryMap = {
    // Standardisé (retourné tel quel)
    'environmental': 'environmental',
    'social': 'social',
    'modernization': 'modernization',
    'leadTime': 'leadTime',
    'cost': 'cost',
    'quality': 'quality',
    'clientConsumer': 'clientConsumer'
  };
  
  // Simplifier la catégorie pour la recherche (minuscules)
  const simplifiedCategory = category.toLowerCase();
  
  // Trouver la correspondance ou retourner la catégorie originale
  for (const [key, value] of Object.entries(categoryMap)) {
    if (key.toLowerCase() === simplifiedCategory) {
      return value;
    }
  }
  
  console.warn(`Catégorie non reconnue: ${category}, utilisation telle quelle`);
  return category;
}; 