"""
Script de test pour vérifier le format d'enregistrement des réponses

Ce script teste la fonction save_data pour s'assurer que les réponses sont enregistrées 
dans le format requis: _id, category, question, answer
"""

import asyncio
import sys
import os
import json
from bson import ObjectId

# Ajuster les importations en fonction de l'emplacement d'exécution
try:
    # Si exécuté comme module
    from app.database import save_data, results_collection
    from app.model import Data_POST_request
    module_prefix = "app."
except ModuleNotFoundError:
    try:
        # Si exécuté depuis le répertoire backend
        sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
        from app.database import save_data, results_collection
        from app.model import Data_POST_request
        module_prefix = "app."
    except ModuleNotFoundError:
        # Si exécuté depuis le répertoire app
        from database import save_data, results_collection
        from model import Data_POST_request
        module_prefix = ""

async def test_save_answers():
    """
    Test de la fonction save_data avec des données simulées
    """
    print("=== TEST D'ENREGISTREMENT DES RÉPONSES AU FORMAT SIMPLIFIÉ ===")
    
    # Simulation de données
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
    
    # Appeler la fonction save_data
    print("Envoi des données de test à la fonction save_data...")
    result = await save_data(test_data)
    print(f"Résultat: {json.dumps(result, indent=2)}")
    
    # Vérifier l'enregistrement dans MongoDB
    if result.get("success", False):
        print("\nVérification des documents enregistrés dans MongoDB:")
        
        for doc_id in result.get("ids", []):
            try:
                # Convertir doc_id en ObjectId si c'est une chaîne
                object_id = ObjectId(doc_id) if isinstance(doc_id, str) else doc_id
                doc = await results_collection.find_one({"_id": object_id})
                
                if doc:
                    # Convertir _id en chaîne pour l'affichage
                    doc["_id"] = str(doc["_id"])
                    print(f"\nDocument {doc_id}:")
                    print(json.dumps(doc, indent=2))
                    
                    # Vérifier le format des champs
                    required_fields = ["_id", "category", "question", "answer"]
                    missing_fields = [field for field in required_fields if field not in doc]
                    
                    if missing_fields:
                        print(f"⚠️ Champs requis manquants: {', '.join(missing_fields)}")
                    else:
                        print("✅ Format correct: Le document contient tous les champs requis")
                else:
                    print(f"❌ Document {doc_id} non trouvé dans la base de données")
            except Exception as e:
                print(f"❌ Erreur lors de la récupération du document {doc_id}: {str(e)}")
    else:
        print("❌ Échec de l'enregistrement des données")

async def test_score_calculation():
    """
    Test du calcul de score basé sur les réponses enregistrées
    """
    print("\n=== TEST DU CALCUL DE SCORE ===")
    
    try:
        # Simuler un appel à l'API de calcul de score
        # Importation dynamique pour s'adapter aux différents contextes d'exécution
        if module_prefix == "app.":
            from app.main import calculate_category_score
        else:
            from main import calculate_category_score
        
        score = await calculate_category_score("test123", "Environmental")
        print(f"Score calculé pour la catégorie Environmental: {score}")
        
        # Vérification manuelle
        cursor = results_collection.find({
            "enterpriseId": "test123",
            "category": "Environmental",
            "answer": "Yes"
        })
        
        yes_count = len(await cursor.to_list(length=None))
        print(f"Nombre de réponses 'Yes' trouvées manuellement: {yes_count}")
        
        if score == yes_count:
            print("✅ Le calcul du score fonctionne correctement")
        else:
            print(f"❌ Écart entre le calcul du score ({score}) et le nombre réel de 'Yes' ({yes_count})")
    except Exception as e:
        print(f"❌ Erreur lors du test de calcul du score: {str(e)}")

async def main():
    """
    Fonction principale qui exécute les tests
    """
    try:
        await test_save_answers()
        await test_score_calculation()
    except Exception as e:
        print(f"❌ Erreur non gérée: {str(e)}")

if __name__ == "__main__":
    asyncio.run(main()) 