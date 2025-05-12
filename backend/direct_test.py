"""
Script de test direct pour la sauvegarde des réponses au format souhaité

Ce script évite les importations complexes en définissant directement 
les fonctions et modèles nécessaires au test.
"""

import asyncio
import json
from datetime import datetime
from typing import List, Optional, Dict, Any
from pymongo import MongoClient
from bson.objectid import ObjectId
from pydantic import BaseModel

# Connexion à MongoDB
client = MongoClient("mongodb://root:12Grai%3F34icamDBr@195.35.0.41:27017/")
database = client['Icam']
results_collection = database.results
cases_collection = database.cases

# Définition simple des modèles
class Data_POST_request(BaseModel):
    question: str
    answer: str
    category: Optional[str] = None
    enterpriseId: Optional[str] = None
    userId: Optional[str] = None

# Fonction simplifiée pour enregistrer les réponses
async def save_data_simple(data: List[Data_POST_request]) -> Dict[str, Any]:
    """
    Version simplifiée de la fonction save_data qui sauvegarde les réponses
    au format spécifié (_id, category, question, answer)
    """
    try:
        if not data:
            return {"success": False, "message": "Aucune donnée fournie"}
            
        inserted_ids = []
        total_score = 0
        
        for item in data:
            # Créer un document au format souhaité
            doc = {
                "category": item.category,
                "question": item.question,
                "answer": item.answer
            }
            
            # Ajouter les autres champs si disponibles
            if item.enterpriseId:
                doc["enterpriseId"] = item.enterpriseId
            if item.userId:
                doc["userId"] = item.userId
                
            # Imprimer pour le débogage
            print(f"Document à insérer: {doc}")
                
            # Enregistrer dans MongoDB
            result = results_collection.insert_one(doc)
            
            if result.acknowledged:
                inserted_ids.append(str(result.inserted_id))
                if item.answer == "Yes":
                    total_score += 1
        
        # Mettre à jour le score dans la collection cases si nécessaire
        if inserted_ids and data[0].category and data[0].enterpriseId:
            # Vérifier si un document existe déjà
            enterprise_id = data[0].enterpriseId
            
            # Normaliser la catégorie (première lettre minuscule pour correspondre au format attendu)
            category = data[0].category
            if category == "Environmental":
                category = "environmental"  # Corriger la casse
            
            print(f"Mise à jour du score pour la catégorie: {category}")
            
            existing_case = cases_collection.find_one({"enterpriseId": enterprise_id})
            
            if existing_case:
                # Vérifier si la catégorie existe dans le document
                if category not in existing_case:
                    print(f"Attention: La catégorie '{category}' n'existe pas dans le document de cas existant")
                    print(f"Catégories disponibles: {list(existing_case.keys())}")
                    # Utiliser une catégorie par défaut si nécessaire
                
                # Mettre à jour le document existant
                try:
                    update_result = cases_collection.update_one(
                        {"enterpriseId": enterprise_id},
                        {"$set": {f"{category}.Total": total_score}}
                    )
                    print(f"Mise à jour réussie: {update_result.modified_count} document(s) modifié(s)")
                except Exception as e:
                    print(f"Erreur lors de la mise à jour du score: {str(e)}")
            else:
                # Créer un nouveau document
                case_data = {
                    "enterpriseId": enterprise_id,
                    "timestamp": datetime.utcnow().isoformat(),
                    "environmental": {"Total": 0},
                    "social": {"Total": 0},
                    "modernization": {"Total": 0},
                    "leadTime": {"Total": 0},
                    "cost": {"Total": 0},
                    "quality": {"Total": 0},
                    "clientConsumer": {"Total": 0}
                }
                
                # Vérifier que la catégorie existe dans notre structure
                if category in case_data:
                    case_data[category]["Total"] = total_score
                else:
                    print(f"Attention: La catégorie '{category}' n'existe pas dans la structure par défaut")
                
                try:
                    insert_result = cases_collection.insert_one(case_data)
                    print(f"Nouveau document créé avec ID: {insert_result.inserted_id}")
                except Exception as e:
                    print(f"Erreur lors de la création du document: {str(e)}")
        
        return {
            "success": True,
            "message": f"{len(inserted_ids)} réponses enregistrées avec succès",
            "ids": inserted_ids,
            "score": total_score
        }
    except Exception as e:
        print(f"Erreur: {str(e)}")
        return {"success": False, "message": str(e)}

async def test_save_answers():
    """Test d'enregistrement des réponses au format simplifié"""
    print("=== TEST D'ENREGISTREMENT DES RÉPONSES AU FORMAT SIMPLIFIÉ ===")
    
    # Données de test
    test_data = [
        Data_POST_request(
            question="Do you have partnerships for the second life of your products?",
            answer="Yes",
            category="Environmental",
            enterpriseId="test123",
            userId="testuser"
        ),
        Data_POST_request(
            question="Do you know the tonnage of your external suppliers' product transport?",
            answer="No",
            category="Environmental",
            enterpriseId="test123", 
            userId="testuser"
        )
    ]
    
    # Enregistrer les données
    print("Envoi des données de test...")
    result = await save_data_simple(test_data)
    print(f"Résultat: {json.dumps(result, indent=2)}")
    
    # Vérifier les documents enregistrés
    if result["success"]:
        print("\nVérification des documents enregistrés:")
        
        for doc_id in result["ids"]:
            doc = results_collection.find_one({"_id": ObjectId(doc_id)})
            if doc:
                # Convertir l'ObjectId en chaîne pour l'affichage
                doc["_id"] = str(doc["_id"])
                print(f"\nDocument {doc_id}:")
                print(json.dumps(doc, indent=2))
                
                # Vérifier le format
                required_fields = ["category", "question", "answer"]
                if all(field in doc for field in required_fields):
                    print("✅ Format correct!")
                else:
                    missing = [f for f in required_fields if f not in doc]
                    print(f"❌ Champs manquants: {', '.join(missing)}")
            else:
                print(f"❌ Document {doc_id} non trouvé!")
    else:
        print("❌ Échec de l'enregistrement")

async def main():
    try:
        await test_save_answers()
    except Exception as e:
        print(f"Erreur non gérée: {str(e)}")

if __name__ == "__main__":
    print("Exécution du test direct...")
    asyncio.run(main())
    print("Test terminé.") 