"""
Script pour exécuter le test de sauvegarde des réponses
"""

import asyncio
import sys
import os

# Ajouter les chemins nécessaires pour l'importation
current_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.append(current_dir)

try:
    # Importer le module de test
    from app.test_save_answers import main
    
    print("Exécution des tests de sauvegarde des réponses...")
    asyncio.run(main())
    print("Tests terminés.")
except Exception as e:
    print(f"Erreur lors de l'exécution des tests: {str(e)}")
    
    # Tentative alternative si l'importation a échoué
    try:
        print("\nTentative d'exécution directe du script de test...")
        import subprocess
        
        result = subprocess.run([sys.executable, os.path.join(current_dir, "app", "test_save_answers.py")], 
                               capture_output=True, text=True)
        
        print(result.stdout)
        
        if result.stderr:
            print("Erreurs:", result.stderr)
    except Exception as e2:
        print(f"La tentative alternative a également échoué: {str(e2)}")
        
        print("\nSuggestions de dépannage:")
        print("1. Vérifiez les chemins d'importation dans les fichiers database.py et model.py")
        print("2. Exécutez le script directement: python -m app.test_save_answers")
        print("3. Assurez-vous que MongoDB est en cours d'exécution et accessible") 