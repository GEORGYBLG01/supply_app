from model import User, Data_enterprise, Data_points, Data_POST_request
from fastapi import FastAPI, HTTPException
from datetime import datetime
import bcrypt
import gridfs
from pymongo import MongoClient
import motor.motor_asyncio
from bson import ObjectId
from typing import List, Optional

# MongoDB Driver and client creation
client = motor.motor_asyncio.AsyncIOMotorClient(
    "mongodb://root:12Grai%3F34icamDBr@195.35.0.41:27017/"
)
# client = MongoClient("mongodb://root:12Grai%3F34icamDBr@195.35.0.41:27017/")  
# Remplacez par votre URI de connexion


# Database
database = client['Icam']
users_collection = database.users
enterprises_collection = database.enterprises
answers_collection = database.answers
cases_collection = database.cases
points_collection = database.points
results_collection = database.results  # Nouvelle collection pour les réponses agrégées

# Utiliser GridFS avec le client asynchrone
fs = gridfs.GridFS(database.delegate, collection="GRAI")

# with open('C:/Users/boris/Documents/GPS_2024/supplychain/farmstack_project/backend/uploads/test.png', 'rb') as file:
#     file_id = fs.put(file, filename='test')

# # # Exemple : Récupérer un fichier depuis GridFS
# # grid_out = fs.get(file_id)
# # file_data = grid_out.read()
# # output_path='C:/Users/boris/Documents/test.png'
# # with open(output_path, 'wb') as output_file:
# #     output_file.write(file_data)
# print(f'Fichier sauvegardé dans GridFS ')

# Hash password
async def hash_password(password: str, salt: bytes = None) -> tuple[str, str]:
    # Generate a new salt if not provided
    if salt is None:
        salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode("utf-8"), salt)
    return hashed_password.decode("utf-8"), salt.decode("utf-8")

# register a user in database
async def register_user(user: User):
    existing_user = await users_collection.find_one({"username": user.username})

    # raise an error if the user already exists
    if existing_user:
        raise HTTPException(status_code=400, detail="User already registered")

    # register if user does not already exist
    hashed_password, salt = await hash_password(user.password)
    user_dict = user.dict()
    user_dict["password"] = hashed_password
    user_dict["salt"] = salt  # Store the salt
    
    # S'assurer que le rôle est défini (par défaut "user")
    if "role" not in user_dict:
        user_dict["role"] = "user"
    
    # Ajouter les champs de suivi
    user_dict["created_at"] = datetime.now()
    user_dict["last_login"] = None
    user_dict["login_count"] = 0
    user_dict["login_history"] = []
    user_dict["is_active"] = True
    
    await users_collection.insert_one(user_dict)  # Utiliser user_dict au lieu de user.dict()

    return {"message": "Registration successful"}

# login a user
async def login(username: str, password: str):
    user = await users_collection.find_one({"username": username})
    if user:
        if not user.get("is_active", True):
            raise HTTPException(status_code=401, detail="Ce compte utilisateur est désactivé")
            
        stored_password_hash = user["password"]
        
        # Vérifier si le salt existe, sinon utiliser une méthode de vérification alternative
        if "salt" in user:
            # Méthode avec salt stocké
            stored_salt = user["salt"]
            if bcrypt.checkpw(password.encode("utf-8"), stored_password_hash.encode("utf-8")):
                is_admin = user.get("role") == "admin"
                
                # Mettre à jour les statistiques de connexion
                now = datetime.now()
                login_count = user.get("login_count", 0) + 1
                login_history = user.get("login_history", [])
                
                # Limiter l'historique à 10 dernières connexions
                if len(login_history) >= 10:
                    login_history = login_history[-9:]
                login_history.append(now)
                
                await users_collection.update_one(
                    {"username": username},
                    {"$set": {
                        "last_login": now,
                        "login_count": login_count,
                        "login_history": login_history
                    }}
                )
                
                return {"message": "Login successful", "user": username, "is_admin": is_admin}
        else:
            # Méthode de vérification directe pour les utilisateurs créés avant l'ajout du salt
            if bcrypt.checkpw(password.encode("utf-8"), stored_password_hash.encode("utf-8")):
                # Mettre à jour l'utilisateur avec un salt pour les futures connexions
                salt = bcrypt.gensalt()
                hashed_password = bcrypt.hashpw(password.encode("utf-8"), salt)
                is_admin = user.get("role") == "admin"
                
                # Mettre à jour les statistiques de connexion
                now = datetime.now()
                login_count = user.get("login_count", 0) + 1
                login_history = user.get("login_history", [])
                
                # Limiter l'historique à 10 dernières connexions
                if len(login_history) >= 10:
                    login_history = login_history[-9:]
                login_history.append(now)
                
                await users_collection.update_one(
                    {"username": username},
                    {"$set": {
                        "salt": salt.decode("utf-8"),
                        "last_login": now,
                        "login_count": login_count,
                        "login_history": login_history
                    }}
                )
                return {"message": "Login successful", "user": username, "is_admin": is_admin}
        
        # Si aucune méthode ne fonctionne, l'authentification échoue
        raise HTTPException(status_code=401, detail="Invalid username or password")
    else:
        raise HTTPException(status_code=401, detail="Authentication failed")

# saving enterprises data for points counting
async def save_points(data: Data_points):
    try:
        data_dict = data.dict()
        
        # Log complet des données reçues
        print(f"Saving points data (complet): {data_dict}")
        print(f"Type de données: {type(data_dict)}")
        print(f"Clés disponibles: {list(data_dict.keys() if isinstance(data_dict, dict) else [])}")
        
        # Vérifier si les données sont vides
        if not data_dict or (isinstance(data_dict, dict) and len(data_dict) == 0):
            print("ERREUR CRITIQUE: Les données reçues sont vides!")
            return {"message": "Error: Empty data received", "success": False}
        
        # Vérification détaillée de toutes les catégories de scores (debug)
        print("Vérification détaillée des scores:")
        categories = ["social", "environmental", "quality", "cost", "leadTime", "modernization", "clientConsumer"]
        categories_status = {}
        
        for category in categories:
            if category in data_dict:
                if isinstance(data_dict[category], dict) and "Total" in data_dict[category]:
                    value = data_dict[category]["Total"]
                    categories_status[category] = f"OK: {value}"
                    print(f"  - {category}: {value}")
                else:
                    categories_status[category] = "FORMAT INVALIDE"
                    print(f"  - {category}: Format invalide - pas de clé 'Total'")
                    # Corriger le format si possible
                    if isinstance(data_dict[category], dict):
                        data_dict[category]["Total"] = 0
                        print(f"    > Format corrigé avec valeur par défaut")
                    else:
                        data_dict[category] = {"Total": 0}
                        print(f"    > Format recréé avec valeur par défaut")
            else:
                categories_status[category] = "MANQUANT"
                print(f"  - {category}: MANQUANT - Catégorie absente")
                # Ajouter la catégorie manquante
                data_dict[category] = {"Total": 0}
                print(f"    > Catégorie ajoutée avec valeur par défaut")
        
        # Résumé de toutes les catégories
        print("Résumé des catégories:")
        for cat, status in categories_status.items():
            print(f"  - {cat}: {status}")
        
        # Vérifier la présence de l'enterpriseId
        had_enterprise_id = True
        if "enterpriseId" not in data_dict or not data_dict["enterpriseId"]:
            print("ATTENTION: enterpriseId manquant ou vide!")
            had_enterprise_id = False
            
            # Essayer de récupérer l'ID de l'entreprise depuis le champ enterprise
            if "enterprise" in data_dict and isinstance(data_dict["enterprise"], dict):
                enterprise_info = data_dict["enterprise"]
                print(f"Contenu du champ enterprise: {enterprise_info}")
                
                # Si l'ID est inclus dans enterprise.id ou enterprise._id
                if "_id" in enterprise_info:
                    data_dict["enterpriseId"] = str(enterprise_info["_id"])
                    print(f"Utilisation de enterprise._id comme enterpriseId: {data_dict['enterpriseId']}")
                elif "id" in enterprise_info:
                    data_dict["enterpriseId"] = str(enterprise_info["id"])
                    print(f"Utilisation de enterprise.id comme enterpriseId: {data_dict['enterpriseId']}")
                
                # Si le nom est fourni, essayer de trouver l'ID à partir du nom
                elif "name" in enterprise_info and enterprise_info["name"]:
                    company_name = enterprise_info["name"]
                    print(f"Recherche de l'entreprise par nom: {company_name}")
                    
                    # Chercher l'entreprise par nom
                    enterprise = await enterprises_collection.find_one({
                        "name": {"$regex": f"^{company_name}$", "$options": "i"}
                    })
                    
                    if enterprise:
                        data_dict["enterpriseId"] = str(enterprise["_id"])
                        print(f"Entreprise trouvée par nom, ID: {data_dict['enterpriseId']}")
                    else:
                        print(f"Aucune entreprise trouvée avec le nom: {company_name}")
        
        # Vérifier si un timestamp est présent, sinon en ajouter un
        if "timestamp" not in data_dict or not data_dict["timestamp"]:
            data_dict["timestamp"] = datetime.utcnow().isoformat()
            print(f"Ajout d'un timestamp: {data_dict['timestamp']}")
        
        # Préparation des données finales à insérer
        final_data = {
            "social": data_dict.get("social", {"Total": 0}),
            "environmental": data_dict.get("environmental", {"Total": 0}),
            "quality": data_dict.get("quality", {"Total": 0}),
            "cost": data_dict.get("cost", {"Total": 0}),
            "leadTime": data_dict.get("leadTime", {"Total": 0}),
            "modernization": data_dict.get("modernization", {"Total": 0}),
            "clientConsumer": data_dict.get("clientConsumer", {"Total": 0}),
            "enterpriseId": data_dict.get("enterpriseId", ""),
            "userId": data_dict.get("userId", ""),
            "timestamp": data_dict.get("timestamp", datetime.utcnow().isoformat()),
        }
        
        print(f"Données finales à insérer: {final_data}")
        
        # Vérifier une dernière fois la présence de l'enterpriseId
        if not final_data["enterpriseId"]:
            print("ERREUR CRITIQUE: Impossible de déterminer l'enterpriseId après toutes les tentatives!")
            return {"message": "Error: Could not determine enterpriseId", "success": False, "had_enterprise_id": had_enterprise_id}
        
        # Insérer dans les deux collections : points_collection et cases_collection
        # 1. Insérer dans points_collection (existant)
        result_points = await points_collection.insert_one(final_data)
        
        # 2. Insérer/Mettre à jour dans cases_collection (pour les scores)
        print(f"Insertion des données dans cases_collection pour l'entreprise ID: {final_data['enterpriseId']}")
        
        # Rechercher si un document existe déjà pour cette entreprise
        existing_case = await cases_collection.find_one({"enterpriseId": final_data["enterpriseId"]})
        
        if existing_case:
            # Mettre à jour le document existant
            print(f"Document existant trouvé dans cases_collection, mise à jour...")
            result_cases = await cases_collection.update_one(
                {"enterpriseId": final_data["enterpriseId"]},
                {"$set": final_data}
            )
            cases_success = result_cases.modified_count > 0
        else:
            # Créer un nouveau document
            print(f"Aucun document existant trouvé, création d'un nouveau document dans cases_collection...")
            result_cases = await cases_collection.insert_one(final_data)
            cases_success = result_cases.inserted_id is not None
        
        # Vérifier si l'insertion a réussi
        if result_points.inserted_id and cases_success:
            return {
                "message": "Data points saved successfully to both collections",
                "id": str(result_points.inserted_id),
                "success": True,
                "had_enterprise_id": had_enterprise_id,
                "categories_status": categories_status
            }
        else:
            return {
                "message": "Error: Failed to save data points to one or both collections",
                "success": False,
                "had_enterprise_id": had_enterprise_id,
                "points_collection_success": result_points.inserted_id is not None,
                "cases_collection_success": cases_success
            }
            
    except Exception as e:
        print(f"Exception in save_points: {str(e)}")
        return {"message": f"Error: {str(e)}", "success": False}

# saving enterprises data
async def save_enterprise(data: Data_enterprise):
    try:
        print("Données reçues:", data)
        data_dict = data.dict()
        
        # Générer systématiquement la date exacte côté serveur
        now = datetime.now()
        # Format: "2023-05-15 14:30:45" (année-mois-jour heure:minute:seconde)
        data_dict["date_added"] = now.strftime("%Y-%m-%d %H:%M:%S")
            
        print("Dictionnaire à insérer:", data_dict)
        result = await enterprises_collection.insert_one(data_dict)
        print("Résultat insertion:", result.acknowledged, str(result.inserted_id))
        
        if result.acknowledged:
            # Création d'un nouveau document dans cases_collection
            enterprise_id = str(result.inserted_id)
            
            # Initialiser la structure du document cases avec toutes les catégories à 0
            case_data = {
                "enterpriseId": enterprise_id,
                "timestamp": datetime.utcnow().isoformat(),
                "company_name": data_dict["company_name"],
                "company_size": data_dict["company_size"],
                "activity_sector": data_dict["activity_sector"],
                "date_created": data_dict["date_added"],
                "environmental": {"Total": 0},
                "social": {"Total": 0},
                "modernization": {"Total": 0},
                "leadTime": {"Total": 0},
                "cost": {"Total": 0},
                "quality": {"Total": 0},
                "clientConsumer": {"Total": 0}
            }
            
            # Insérer dans cases_collection
            print(f"Création d'un document initial dans cases_collection pour l'entreprise {enterprise_id}")
            case_result = await cases_collection.insert_one(case_data)
            
            if case_result.acknowledged:
                print(f"Document cases créé avec succès: {str(case_result.inserted_id)}")
                return {
                    "message": "Data saved successfully and case initialized",
                    "enterpriseId": enterprise_id,
                    "success": True,
                    "case_initialized": True
                }
            else:
                print("ATTENTION: Échec de la création du document cases initial")
                return {
                    "message": "Data saved successfully but case initialization failed",
                    "enterpriseId": enterprise_id,
                    "success": True,
                    "case_initialized": False
                }
        else:
            return {"message": "Error saving data to MongoDB", "success": False}
    except Exception as e:
        print("Erreur:", str(e))
        return {"message": f"MongoDB Error: {str(e)}", "success": False}

# saving question/answers to MongoDB
async def save_data(data: list[Data_POST_request]):
    try:
        # Vérifier que les données sont correctement formées
        if not data or not isinstance(data, list):
            return {"message": "Invalid data format. Expected a list of answers.", "success": False}
            
        # Stocker les IDs des documents insérés
        inserted_ids = []
        total_score = 0
        is_total_score = False
        enterpriseId = ""
        category_raw = ""
        
        for item in data:
            # Convertir en dictionnaire mais conserver tous les champs
            data_dict = item.dict(exclude_unset=True)
            
            # Récupérer les identifiants communs
            if "enterpriseId" in data_dict and data_dict["enterpriseId"]:
                enterpriseId = data_dict["enterpriseId"]
            if "category" in data_dict and data_dict["category"]:
                category_raw = data_dict["category"]
            
            # Vérification des données requises
            if not data_dict.get("question") or not data_dict.get("answer"):
                print(f"Avertissement: question ou réponse manquante dans les données: {data_dict}")
                # Essayer d'ajouter des valeurs par défaut pour éviter les erreurs
                if "question" not in data_dict or not data_dict["question"]:
                    data_dict["question"] = "Question non spécifiée"
                if "answer" not in data_dict or not data_dict["answer"]:
                    data_dict["answer"] = "Réponse non spécifiée"
            
            # Normaliser la catégorie (minuscules pour correspondre au format de la BDD)
            if category_raw:
                # Convertir les noms de catégories en première lettre minuscule
                category_mapping = {
                    "Environmental": "environmental",
                    "Social": "social",
                    "Modernization": "modernization",
                    "LeadTime": "leadTime",
                    "leadTime": "leadTime",
                    "leadtime": "leadTime",
                    "Cost": "cost",
                    "Quality": "quality",
                    "ClientConsumer": "clientConsumer"
                }
                
                # Essayer d'abord la correspondance exacte
                category = category_mapping.get(category_raw)
                
                # Si pas de correspondance exacte, essayer en ignorant la casse
                if not category:
                    category_lower = category_raw.lower()
                    for key, value in category_mapping.items():
                        if key.lower() == category_lower:
                            category = value
                            break
                
                # Si toujours pas de correspondance, utiliser la valeur originale en minuscules
                if not category:
                    category = category_raw.lower()
            else:
                print(f"Avertissement: catégorie manquante dans les données: {data_dict}")
                category = ""
            
            # Vérifier s'il s'agit d'un score total
            if "question" in data_dict and "Total Score" in data_dict.get("question", "") and "answer" in data_dict:
                try:
                    total_score = int(data_dict["answer"])
                    is_total_score = True
                    print(f"Score total détecté pour {category}: {total_score}")
                    
                    # Insérer le score total avec le format complet
                    data_dict["category"] = category  # Utiliser la catégorie normalisée
                    result = await results_collection.insert_one(data_dict)
                    if result.acknowledged:
                        inserted_ids.append(str(result.inserted_id))
                except (ValueError, TypeError):
                    print(f"Impossible de convertir la réponse en score: {data_dict['answer']}")
            else:
                # Pour les réponses normales, insérer le document complet sans simplification
                # Cela garantit que tous les champs sont conservés
                
                # S'assurer que la catégorie est normalisée
                data_dict["category"] = category
                
                # Ajouter enterpriseId s'il existe mais n'est pas dans data_dict
                if "enterpriseId" not in data_dict and enterpriseId:
                    data_dict["enterpriseId"] = enterpriseId
                
                # Tracer les informations pour le débogage
                print(f"Insertion de réponse individuelle: {data_dict}")
                
                # Insérer le document complet
                result = await results_collection.insert_one(data_dict)
                
                if result.acknowledged:
                    inserted_ids.append(str(result.inserted_id))
                    
                    # Ne pas incrémenter le compteur pour éviter les mises à jour des scores
                    # La ligne suivante est commentée pour éviter les mises à jour automatiques
                    # if data_dict.get("answer") == "Yes":
                    #     total_score += 1
            
        # Si c'est un score total (uniquement), mettre à jour dans cases_collection
        if is_total_score and enterpriseId and category:
            # Score à utiliser - uniquement le score total détecté explicitement
            score_to_update = total_score
            
            # Vérifier si un document existe déjà pour cette entreprise
            existing_case = await cases_collection.find_one({"enterpriseId": enterpriseId})
            
            # Liste des catégories valides
            valid_categories = ["environmental", "social", "modernization", "leadTime", 
                               "cost", "quality", "clientConsumer"]
            
            # Vérifier que la catégorie est valide (de manière insensible à la casse)
            is_valid = False
            for valid_category in valid_categories:
                if category.lower() == valid_category.lower():
                    is_valid = True
                    # Normaliser à la forme valide
                    category = valid_category
                    break
                    
            if not is_valid:
                print(f"Avertissement: Catégorie '{category}' non reconnue. Catégories valides: {valid_categories}")
                return {
                    "message": f"Category '{category}' is not valid",
                    "ids": inserted_ids,
                    "success": False
                }
            
            if existing_case:
                # Mettre à jour le document existant avec le score total détecté sans le modifier
                try:
                    update_data = {f"{category}.Total": score_to_update}
                    result = await cases_collection.update_one(
                        {"enterpriseId": enterpriseId},
                        {"$set": update_data}
                    )
                    print(f"Score pour {category} mis à jour: {score_to_update}")
                except Exception as e:
                    print(f"Erreur lors de la mise à jour du score: {str(e)}")
                    return {
                        "message": f"Error updating score: {str(e)}",
                        "ids": inserted_ids,
                        "success": False
                    }
            else:
                # Créer un nouveau document
                try:
                    timestamp = datetime.utcnow().isoformat()
                    case_data = {
                        "enterpriseId": enterpriseId,
                        "timestamp": timestamp,
                        "environmental": {"Total": 0},
                        "social": {"Total": 0},
                        "modernization": {"Total": 0},
                        "leadTime": {"Total": 0},
                        "cost": {"Total": 0},
                        "quality": {"Total": 0},
                        "clientConsumer": {"Total": 0}
                    }
                    # Mettre à jour la catégorie spécifique
                    case_data[category]["Total"] = score_to_update
                    
                    # Insérer le nouveau document
                    await cases_collection.insert_one(case_data)
                    print(f"Nouveau document créé dans MSR avec score {category}: {score_to_update}")
                except Exception as e:
                    print(f"Erreur lors de la création du document: {str(e)}")
                    return {
                        "message": f"Error creating case document: {str(e)}",
                        "ids": inserted_ids,
                        "success": False
                    }
        
        if inserted_ids:
            return {
                "message": f"Successfully saved {len(inserted_ids)} answers",
                "ids": inserted_ids,
                "success": True
            }
        else:
            return {"message": "No data was saved", "success": False}
    except Exception as e:
        print(f"Error in save_data: {str(e)}")
        return {"message": f"Error: {str(e)}", "success": False}

# Create a new function to make a user admin
async def set_admin_status(username: str, is_admin: bool):
    user = await users_collection.find_one({"username": username})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    role_value = "admin" if is_admin else "user"
    result = await users_collection.update_one(
        {"username": username},
        {"$set": {"role": role_value}}
    )
    
    if result.modified_count == 1:
        return {"message": f"Admin status for {username} was updated successfully"}
    else:
        return {"message": "No changes made to admin status"}

# Get all users for admin panel
async def get_all_users():
    cursor = users_collection.find({}, {"password": 0, "salt": 0})  # Exclude sensitive fields
    users = await cursor.to_list(length=100)
    
    # Convertir le champ "role" en "is_admin" pour la compatibilité avec le frontend
    for user in users:
        user["is_admin"] = user.get("role") == "admin"
        # Convertir ObjectId en chaîne de caractères pour la sérialisation JSON
        if "_id" in user and isinstance(user["_id"], ObjectId):
            user["_id"] = str(user["_id"])
    
    return users

# Nouvelles fonctions pour la gestion avancée des utilisateurs

# Obtenir les détails d'un utilisateur avec son historique
async def get_user_details(username: str):
    user = await users_collection.find_one({"username": username}, {"password": 0, "salt": 0})
    if not user:
        raise HTTPException(status_code=404, detail="Utilisateur non trouvé")
    
    # Convertir ObjectId en chaîne
    if "_id" in user and isinstance(user["_id"], ObjectId):
        user["_id"] = str(user["_id"])
    
    # Formater les dates pour les rendre lisibles
    if "last_login" in user and user["last_login"]:
        user["last_login_formatted"] = user["last_login"].strftime("%d/%m/%Y %H:%M:%S")
    
    if "login_history" in user and user["login_history"]:
        user["login_history_formatted"] = [d.strftime("%d/%m/%Y %H:%M:%S") for d in user["login_history"]]
    
    if "created_at" in user and user["created_at"]:
        user["created_at_formatted"] = user["created_at"].strftime("%d/%m/%Y %H:%M:%S")
    
    return user

# Réinitialiser le mot de passe d'un utilisateur
async def reset_password(username: str, new_password: str):
    user = await users_collection.find_one({"username": username})
    if not user:
        raise HTTPException(status_code=404, detail="Utilisateur non trouvé")
    
    hashed_password, salt = await hash_password(new_password)
    
    result = await users_collection.update_one(
        {"username": username},
        {"$set": {
            "password": hashed_password,
            "salt": salt
        }}
    )
    
    if result.modified_count == 1:
        return {"message": f"Mot de passe réinitialisé pour {username}"}
    else:
        raise HTTPException(status_code=500, detail="Échec de la réinitialisation du mot de passe")

# Activer/désactiver un compte utilisateur
async def toggle_user_status(username: str, active: bool):
    user = await users_collection.find_one({"username": username})
    if not user:
        raise HTTPException(status_code=404, detail="Utilisateur non trouvé")
    
    result = await users_collection.update_one(
        {"username": username},
        {"$set": {"is_active": active}}
    )
    
    if result.modified_count == 1:
        status = "activé" if active else "désactivé"
        return {"message": f"Compte {username} {status} avec succès"}
    else:
        raise HTTPException(status_code=500, detail="Échec de la modification du statut")

# Obtenir des statistiques sur les utilisateurs
async def get_user_statistics():
    total_users = await users_collection.count_documents({})
    active_users = await users_collection.count_documents({"is_active": True})
    inactive_users = await users_collection.count_documents({"is_active": False})
    admin_users = await users_collection.count_documents({"role": "admin"})
    
    # Trouver les 5 utilisateurs les plus actifs par nombre de connexions
    cursor = users_collection.find({}, {"username": 1, "login_count": 1, "_id": 0})
    cursor.sort("login_count", -1)
    cursor.limit(5)
    top_users = await cursor.to_list(length=5)
    
    # Compter les utilisateurs créés par mois (pour le graphique)
    pipeline = [
        {
            "$match": {
                "created_at": {"$ne": None}  # Ne prendre que les utilisateurs avec created_at défini
            }
        },
        {
            "$group": {
                "_id": {
                    "year": {"$year": "$created_at"},
                    "month": {"$month": "$created_at"}
                },
                "count": {"$sum": 1}
            }
        },
        {"$sort": {"_id.year": 1, "_id.month": 1}}
    ]
    
    cursor = users_collection.aggregate(pipeline)
    users_by_month = await cursor.to_list(length=100)
    
    # Ajouter une vérification pour éviter les erreurs avec les valeurs None
    users_by_month_formatted = []
    for item in users_by_month:
        if item.get("_id") and item["_id"].get("year") is not None and item["_id"].get("month") is not None:
            users_by_month_formatted.append({
                "date": f"{item['_id']['year']}-{item['_id']['month']:02d}",
                "count": item["count"]
            })
    
    return {
        "total_users": total_users,
        "active_users": active_users,
        "inactive_users": inactive_users,
        "admin_users": admin_users,
        "top_users": top_users,
        "users_by_month": users_by_month_formatted
    }
