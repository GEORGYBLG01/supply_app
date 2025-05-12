from fastapi import FastAPI, HTTPException, Request, UploadFile, File
from typing import List, Dict, Optional
import cv2
import numpy as np
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware  # Utilisation du middleware standard de FastAPI
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import Response
import os
import io
import pdfplumber
import pandas as pd
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.http import MediaIoBaseDownload
from bson.objectid import ObjectId
import gridfs
from datetime import datetime
import time
from database import fs, register_user, login, save_enterprise, save_points, save_data, set_admin_status, get_all_users, users_collection, enterprises_collection, get_user_details, reset_password, toggle_user_status, get_user_statistics, cases_collection, results_collection

# Modèles Pydantic (simplifiés pour cet exemple)
class User(BaseModel):
    username: str
    password: str

class Data_points(BaseModel):
    pass  # À compléter selon tes besoins

class Data_enterprise(BaseModel):
    company_name: str
    company_size: int
    activity_sector: str
    date_added: Optional[int] = None

class Data_POST_request(BaseModel):
    question: str
    answer: str
    category: str
    enterpriseId: str
    userId: str = ""
    section: str
    timestamp: str

# Initialisation de l'application FastAPI
app = FastAPI()

# Configuration CORS avec le middleware standard de FastAPI
origins = [
    "http://localhost:1234",
    "https://f624-80-124-39-140.ngrok-free.app",
    "https://a513-80-124-39-140.ngrok-free.app",
    "https://supply.scgreenoptimizer.fr",
    "https://0ac9-80-124-39-140.ngrok-free.app",
    "*"  # Autorise toutes les origines pour tester (à restreindre en production)
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Chemin relatif pour UPLOAD_DIR (évite les chemins absolus)
UPLOAD_DIR = os.path.join(os.path.dirname(__file__), "uploads")
if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)

SCOPES = ["https://www.googleapis.com/auth/drive.readonly"]
CLIENT_SECRET_FILE = "client_secret_.json"  # Chemin relatif, à ajuster selon ton projet

# Initialisation du moteur PyKE (simplifié, car je n'ai pas les détails)
try:
    from pyke import knowledge_engine, goal
    engine = knowledge_engine.engine(__file__)
except ImportError:
    print("PyKE not installed or configured. Some features may not work.")
    engine = None  # Placeholder si PyKE n'est pas disponible

def detect_shapes(image_content: bytes):
    try:
        # Lecture de l'image avec OpenCV
        image = cv2.imdecode(np.frombuffer(image_content, np.uint8), -1)
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        blurred = cv2.GaussianBlur(gray, (5, 5), 0)
        edges = cv2.Canny(blurred, 50, 150)
        contours, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

        rectangle_count = 0
        for contour in contours:
            epsilon = 0.04 * cv2.arcLength(contour, True)
            approx = cv2.approxPolyDP(contour, epsilon, True)
            vertices = len(approx)
            if vertices == 4:
                rectangle_count += 1

        return {"rectangle": rectangle_count}
    except Exception as e:
        print(f"Error in shape detection: {e}")
        return {"error": str(e)}

@app.post("/detect_shapes", tags=["Analysing shapes"])
async def extract_shapes_from_doc():
    try:
        docs = get_documents()
        results = []
        for doc in docs:
            print(f"Processing document: {doc['name']}")
            if "pdf" in doc["name"].lower():
                print(f"Skipping PDF document: {doc['name']}")
                continue
            data = detect_shapes(doc["content"])
            results.append({"document_name": doc["name"], "shape_data": data})
        return results
    except HTTPException as e:
        return JSONResponse(status_code=e.status_code, content={"error": str(e.detail)})

def perform_inferences_on_shapes(rectangle_count, document_name, doc_index):
    return [{
        "Analysis": "performing good",
        "Data": rectangle_count,
        "DocName": document_name,
        "Document_index": doc_index,
    }]

def perform_inferences(elements, doc_index, doc_name):
    inferences_result = []
    if engine is None:
        return inferences_result  # Retourne une liste vide si PyKE n'est pas disponible
    engine.reset()
    engine.activate("rules")
    try:
        row_count = max(element["row"] + 1 for element in elements) if elements else 0
        print(f"Calculated Row Count: {row_count}")

        if row_count >= 6:
            with engine.prove_goal("rules.eligible($ans)") as gen:
                for vars, plan in gen:
                    result_status = vars["ans"]
                    inferences_result.append({
                        "Analysis": result_status,
                        "DocumentIndex": doc_index,
                        "DocName": doc_name,
                    })

        for element in elements:
            if element.get("value") == "none":
                with engine.prove_goal("rules.empty($ans)") as gen:
                    for vars, plan in gen:
                        result_status = vars["ans"]
                        inferences_result.append({
                            "Analysis": result_status,
                            "Element": element,
                            "DocumentIndex": doc_index,
                        })
    except Exception as e:
        print(f"Exception in inferences: {e}")
    return inferences_result

@app.post("/load_data", tags=["Analysing Documents"])
async def extract_data_from_pdf():
    docs = get_documents()
    file_data = []
    for i, doc in enumerate(docs):
        pdf_content = doc.get("content")
        doc_name = doc.get("name")
        if doc_name and doc_name.lower().endswith(".jpg"):
            print(f"Skipping JPG document: {doc_name}")
            continue
        if pdf_content:
            data = file_parse(pdf_content, doc_name, i)
            file_data.append(data)
    return file_data

def file_parse(pdf_content, document_name, file_number):
    data = {"groups": {}}
    try:
        with pdfplumber.open(io.BytesIO(pdf_content)) as pdf_document:
            for page_num, page in enumerate(pdf_document.pages):
                page_text = page.extract_text() or ""
                cleaned_text = "".join(page_text.split())
                tables = page.extract_tables() or []
                if tables:
                    for i, table in enumerate(tables):
                        if not any(row for row in table):
                            continue
                        if document_name not in data["groups"]:
                            data["groups"][document_name] = {}
                        table_number = f"table_{i + 1}"
                        data["groups"][document_name][table_number] = table_to_tabular_format(table)
                else:
                    if "text" not in data:
                        data["text"] = ""
                    data["text"] += cleaned_text
        cleaned_data = handle_float_values(data)
        cleaned_data = remove_empty_strings(cleaned_data)
        return cleaned_data
    except Exception as e:
        print(f"Error parsing PDF: {e}")
        return data

def remove_empty_strings(data):
    if isinstance(data, list):
        return [item for item in data if item not in ["", "none"]]
    if isinstance(data, dict):
        return {key: remove_empty_strings(value) for key, value in data.items()}
    return data

def table_to_tabular_format(table):
    if table and any(row for row in table):
        headings = [str(head).replace("\n", " ") if head is not None else "" for head in table[0]]
        data = [[str(cell).replace("\n", " ") if cell is not None else "" for cell in row] for row in table[1:]]
        return {"headings": headings, "data": data}
    return {"headings": [], "data": []}

def handle_float_values(data):
    cleaned_data = data.copy()
    for doc_name, tables in cleaned_data.get("groups", {}).items():
        for table_name, table in tables.items():
            for row in table["data"]:
                if isinstance(row, list):
                    for i, cell in enumerate(row):
                        if isinstance(cell, float):
                            if pd.isna(cell) or pd.isnull(cell):
                                row[i] = None
                            elif not (-1e308 <= cell <= 1e308):
                                row[i] = f"{cell:.10e}"
                        elif cell is None or cell == "":
                            row[i] = "none"
    return cleaned_data

def get_documents():
    try:
        creds = get_google_drive_credentials()
        drive_service = build("drive", "v3", credentials=creds)
        criteria = ["pdf", "jpg"]
        query = " or ".join(f"name contains '{crit}'" for crit in criteria)
        results = drive_service.files().list(
            pageSize=10, fields="nextPageToken, files(id, name, mimeType)", q=query
        ).execute()
        files = results.get("files", [])

        if not files:
            raise HTTPException(status_code=404, detail="No PDF or JPG files found.")

        documents = []
        for file in files:
            file_id = file["id"]
            file_name = file["name"]
            mime_type = file.get("mimeType", "")
            content = get_pdf_content(drive_service, file_id) if "pdf" in mime_type else get_image_content(drive_service, file_id) if "image/jpeg" in mime_type else None
            if content:
                documents.append({"id": file_id, "name": file_name, "content": content})
        return documents
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching documents: {e}")

def get_pdf_content(drive_service, file_id):
    request = drive_service.files().get_media(fileId=file_id)
    fh = io.BytesIO()
    downloader = MediaIoBaseDownload(fh, request)
    done = False
    while not done:
        status, done = downloader.next_chunk()
    return fh.getvalue()

def get_image_content(drive_service, file_id):
    request = drive_service.files().get_media(fileId=file_id)
    fh = io.BytesIO()
    downloader = MediaIoBaseDownload(fh, request)
    done = False
    while not done:
        status, done = downloader.next_chunk()
    return fh.getvalue()

@app.get("/get_documents", tags=["Analysing Documents"])
async def get_documents_endpoint():
    documents = get_documents()
    return {"document": documents}

def get_google_drive_credentials():
    flow = InstalledAppFlow.from_client_secrets_file(CLIENT_SECRET_FILE, SCOPES)
    creds = flow.run_local_server(port=0)
    return creds

@app.get("/")
async def read_root():
    return {"message": "Navigate to another page"}

@app.post("/register", tags=["USER"])
async def register_users(user: User):
    try:
        response = await register_user(user)
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/login", tags=["USER"])
async def login_users(user: User):
    try:
        username = user.username
        password = user.password
        result = await login(username, password)
        return result
    except Exception as e:
        raise HTTPException(status_code=401, detail=str(e))

@app.post("/inferences", tags=["Analysing Documents"])
async def inference():
    try:
        if not os.path.exists(UPLOAD_DIR):
            os.makedirs(UPLOAD_DIR)
            raise HTTPException(status_code=404, detail="Aucun fichier téléchargé. Veuillez d'abord télécharger une image.")
        
        files = [f for f in os.listdir(UPLOAD_DIR) if os.path.isfile(os.path.join(UPLOAD_DIR, f)) and 
                os.path.splitext(f)[1].lower() in ['.png', '.jpg', '.jpeg', '.gif', '.bmp']]
        
        if not files:
            raise HTTPException(status_code=404, detail="Aucune image trouvée pour l'analyse. Veuillez télécharger une image valide.")
        
        latest_file = max([os.path.join(UPLOAD_DIR, f) for f in files], key=os.path.getmtime)

        with open(latest_file, 'rb') as file:
            file_id = fs.put(file, filename=os.path.basename(latest_file))

        if not ObjectId.is_valid(file_id):
            raise HTTPException(status_code=400, detail="ID de fichier invalide.")

        grid_out = fs.get(file_id)
        image_data = grid_out.read()

        temp_image_path = os.path.join(UPLOAD_DIR, "temp_image.png")
        with open(temp_image_path, 'wb') as temp_file:
            temp_file.write(image_data)

        try:
            from grai_tools import extract_grid_info, GRAIRules
            grid_info = extract_grid_info(temp_image_path)
            if not grid_info:
                raise HTTPException(status_code=500, detail="Erreur lors de l'extraction des informations de la grille.")
            
            rules_checker = GRAIRules(grid_info)
            validation_errors = rules_checker.check_rules()

            if validation_errors:
                return JSONResponse(content={"errors": validation_errors}, status_code=200)
            return JSONResponse(content={"message": "La grille GRAI est conforme à toutes les règles."}, status_code=200)
        except ImportError:
            raise HTTPException(status_code=500, detail="Module grai_tools non installé ou mal configuré.")
    except HTTPException as http_error:
        return JSONResponse(content={"detail": str(http_error.detail)}, status_code=http_error.status_code)
    except Exception as e:
        return JSONResponse(content={"detail": f"Erreur interne du serveur: {str(e)}"}, status_code=500)

@app.post("/save-points", tags=["DATA"])
async def save_data_points(data: Data_points):
    try:
        response = await save_points(data)
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/save-points", tags=["DATA"])
async def save_data_points_api(data: Data_points):
    try:
        response = await save_points(data)
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/save-enterprises", tags=["DATA"])
async def save_enterprises_api(data: Data_enterprise):
    try:
        response = await save_enterprise(data)
        
        # Vérifier que le document de l'entreprise a bien été créé
        if response["success"]:
            print(f"Entreprise créée avec succès! ID: {response['enterpriseId']}")
            print(f"Cas initialisé: {response.get('case_initialized', False)}")
            
            # Vérifier si le cas n'a pas été initialisé correctement
            if not response.get('case_initialized', False):
                # Tenter de créer le cas manuellement
                try:
                    enterprise_id = response['enterpriseId']
                    await init_enterprise_case(enterprise_id, 
                                           data.company_name,
                                           data.company_size,
                                           data.activity_sector)
                    print(f"Cas initialisé manuellement pour l'entreprise {enterprise_id}")
                except Exception as e:
                    print(f"Échec de l'initialisation manuelle du cas: {str(e)}")
        
        return response
    except Exception as e:
        print(f"Erreur lors de l'enregistrement de l'entreprise: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/save-enterprises", tags=["DATA"])
async def save_enterprises_api_endpoint(data: Data_enterprise, request: Request):
    try:
        # Récupérer le userId à partir de l'header Authorization
        userId = None
        authorization = request.headers.get("Authorization", "")
        if authorization:
            token = authorization.replace("Bearer ", "")
            userId = token  # Dans ce cas, le token est le nom d'utilisateur
        
        # Stocker le userId dans les données de l'entreprise
        response = await save_enterprise(data)
        
        # Vérifier que le document de l'entreprise a bien été créé
        if response["success"]:
            print(f"API: Entreprise créée avec succès! ID: {response['enterpriseId']}")
            print(f"API: Cas initialisé: {response.get('case_initialized', False)}")
            
            # Vérifier si le cas n'a pas été initialisé correctement
            if not response.get('case_initialized', False):
                # Tenter de créer le cas manuellement
                try:
                    enterprise_id = response['enterpriseId']
                    await init_enterprise_case(enterprise_id, 
                                           data.company_name,
                                           data.company_size,
                                           data.activity_sector,
                                           userId)
                    print(f"API: Cas initialisé manuellement pour l'entreprise {enterprise_id} avec userId {userId}")
                except Exception as e:
                    print(f"API: Échec de l'initialisation manuelle du cas: {str(e)}")
        
        return response
    except Exception as e:
        print(f"API: Erreur lors de l'enregistrement de l'entreprise: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# Fonction utilitaire pour initialiser un cas pour une entreprise
async def init_enterprise_case(enterprise_id: str, company_name: str, company_size: int, activity_sector: str, user_id: str = None):
    """Initialise un cas vide pour une entreprise dans la collection cases"""
    try:
        # Vérifier si un cas existe déjà
        existing_case = await cases_collection.find_one({"enterpriseId": enterprise_id})
        
        if existing_case:
            print(f"Un cas existe déjà pour l'entreprise {enterprise_id}")
            # Si le userId n'est pas défini dans le cas existant, l'ajouter
            if user_id and not existing_case.get("userId"):
                print(f"Ajout du userId {user_id} au cas existant")
                await cases_collection.update_one(
                    {"enterpriseId": enterprise_id},
                    {"$set": {"userId": user_id}}
                )
            return True
            
        # Créer un nouveau document avec la structure attendue
        case_data = {
            "enterpriseId": enterprise_id,
            "timestamp": datetime.utcnow().isoformat(),
            "company_name": company_name,
            "company_size": company_size,
            "activity_sector": activity_sector,
            "date_created": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "environmental": {"Total": 0},
            "social": {"Total": 0},
            "modernization": {"Total": 0},
            "leadTime": {"Total": 0},
            "cost": {"Total": 0},
            "quality": {"Total": 0},
            "clientConsumer": {"Total": 0}
        }
        
        # Ajouter le userId s'il est fourni
        if user_id:
            case_data["userId"] = user_id
            print(f"Cas initialisé avec userId: {user_id}")
        
        # Insérer dans cases_collection
        result = await cases_collection.insert_one(case_data)
        
        if result.acknowledged:
            print(f"Cas initialisé avec succès pour l'entreprise {enterprise_id}")
            return True
        else:
            print(f"Échec de l'initialisation du cas pour l'entreprise {enterprise_id}")
            return False
    except Exception as e:
        print(f"Erreur lors de l'initialisation du cas: {str(e)}")
        return False

@app.post("/api/save-answers", tags=["DATA"])
async def save_answers(data: List[Data_POST_request]):
    try:
        # Vérifier les données
        if not data:
            return JSONResponse(
                status_code=400,
                content={"message": "No data provided"}
            )
            
        # Extraire les informations essentielles
        enterpriseId = None
        category = None
        section = None
        userId = None
        
        # Extraire enterpriseId, category, section et userId des données
        for item in data:
            item_dict = item.dict()
            if "enterpriseId" in item_dict and item_dict["enterpriseId"]:
                enterpriseId = item_dict["enterpriseId"]
            if "category" in item_dict and item_dict["category"]:
                category = item_dict["category"]
            if "section" in item_dict and item_dict["section"]:
                section = item_dict["section"]
            if "userId" in item_dict and item_dict["userId"]:
                userId = item_dict["userId"]
            break  # Un seul élément suffit pour extraire ces informations communes
            
        if not enterpriseId or not category:
            return JSONResponse(
                status_code=400,
                content={"message": "Missing enterpriseId or category in data"}
            )
            
        print(f"Sauvegarde des réponses pour entreprise={enterpriseId}, utilisateur={userId}")
            
        # Vérifier si un cas existe pour cette entreprise et le créer si nécessaire
        existing_case = await cases_collection.find_one({"enterpriseId": enterpriseId})
        if not existing_case:
            print(f"Initialisation d'un cas pour l'entreprise {enterpriseId}")
            try:
                from bson.objectid import ObjectId
                enterprise = await enterprises_collection.find_one({"_id": ObjectId(enterpriseId)})
                
                if enterprise:
                    await init_enterprise_case(
                        enterpriseId,
                        enterprise.get("company_name", "Entreprise"),
                        enterprise.get("company_size", 0),
                        enterprise.get("activity_sector", "Non spécifié"),
                        userId
                    )
                else:
                    await init_enterprise_case(
                        enterpriseId,
                        "Entreprise",
                        0,
                        "Non spécifié",
                        userId
                    )
            except Exception as e:
                print(f"Erreur lors de l'initialisation du cas: {str(e)}")
        elif userId and not existing_case.get("userId"):
            # Si le cas existe mais n'a pas de userId, l'ajouter
            print(f"Ajout du userId {userId} au cas existant")
            await cases_collection.update_one(
                {"enterpriseId": enterpriseId},
                {"$set": {"userId": userId}}
            )
        
        # Enregistrer les réponses dans results_collection
        result = await save_data(data)
        
        # Vérifier si l'une des données est un score total
        has_total_score = False
        for item in data:
            item_dict = item.dict()
            if "question" in item_dict and "Total Score" in item_dict.get("question", ""):
                has_total_score = True
                break
                
        # Ne pas mettre à jour les scores basés sur les réponses individuelles
        # Laisser le processus dans save_data gérer la détection des scores totaux
        
        return result
    except Exception as e:
        print(f"Error in save_answers: {str(e)}")
        return JSONResponse(
            status_code=500,
            content={"message": f"Error: {str(e)}"}
        )

# Fonction utilitaire pour calculer le score d'une catégorie en comptant les réponses "Yes"
async def calculate_category_score(enterprise_id: str, category: str):
    """
    Calcule le score total pour une catégorie en comptant le nombre de réponses "Yes"
    dans tous les questionnaires de cette catégorie.
    """
    try:
        # Normaliser la catégorie (minuscules pour correspondre au format de la BDD)
        category_mapping = {
            "Environmental": "environmental",
            "Social": "social",
            "Modernization": "modernization",
            "LeadTime": "leadTime",
            "Cost": "cost",
            "Quality": "quality",
            "ClientConsumer": "clientConsumer"
        }
        normalized_category = category_mapping.get(category, category.lower())
        
        print(f"Calcul du score pour la catégorie: {normalized_category} (originale: {category})")
        
        # Rechercher toutes les réponses pour cette entreprise et cette catégorie
        cursor = results_collection.find({
            "enterpriseId": enterprise_id,
            "category": normalized_category,
            # Exclure les documents qui contiennent des scores calculés
            "question": {"$not": {"$regex": "Score$"}}
        })
        
        results = await cursor.to_list(length=None)  # Récupérer toutes les réponses
        
        if not results:
            print(f"Aucune réponse trouvée pour {enterprise_id}, catégorie {normalized_category}")
            return 0
            
        # Compter les réponses "Yes"
        yes_count = 0
        total_questions = 0
        
        for result in results:
            # Format simplifié où chaque document est une réponse
            if "answer" in result and "question" in result:
                # Ne pas compter les documents de score total/partiel
                if "Score" not in result.get("question", ""):
                    total_questions += 1
                    if result["answer"] == "Yes":
                        yes_count += 1
        
        print(f"Score calculé pour {normalized_category}: {yes_count}/{total_questions} réponses Yes")
        return yes_count
        
    except Exception as e:
        print(f"Erreur lors du calcul du score pour {category}: {str(e)}")
        return 0

# Routes d'administration
@app.get("/admin/users", tags=["ADMIN"])
async def admin_get_users(request: Request):
    # Vérifier l'authentification et les droits d'admin
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    # En production, vérifiez un token JWT au lieu de cette approche simplifiée
    # Ici on suppose que l'utilisateur est déjà vérifié côté client
    users = await get_all_users()
    return users

@app.put("/admin/user/{username}/admin-status", tags=["ADMIN"])
async def admin_update_user(username: str, is_admin: bool, request: Request):
    # Vérifier l'authentification et les droits d'admin
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    result = await set_admin_status(username, is_admin)
    return result

# Route pour obtenir des statistiques pour le tableau de bord d'administration
@app.get("/admin/statistics", tags=["ADMIN"])
async def admin_statistics(request: Request):
    # Vérifier l'authentification et les droits d'admin
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    # Compter les utilisateurs
    user_count = await users_collection.count_documents({})
    
    # Compter les entreprises
    enterprise_count = await enterprises_collection.count_documents({})
    
    # Autres statistiques utiles
    return {
        "user_count": user_count,
        "enterprise_count": enterprise_count
    }

# Endpoint temporaire pour définir un utilisateur comme admin (à supprimer en production)
@app.get("/make-admin/{username}", tags=["ADMIN"])
async def make_admin(username: str):
    try:
        # Vérifier si l'utilisateur existe
        user = await users_collection.find_one({"username": username})
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        # Mettre à jour le statut admin
        result = await users_collection.update_one(
            {"username": username},
            {"$set": {"role": "admin"}}
        )
        
        if result.modified_count == 1:
            return {"message": f"User {username} is now an admin"}
        else:
            return {"message": "No changes made (user might already be an admin)"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Classe pour la réinitialisation de mot de passe
class PasswordReset(BaseModel):
    username: str
    new_password: str

# Classe pour la modification du statut d'un utilisateur
class UserStatusUpdate(BaseModel):
    username: str
    active: bool

# Routes pour la gestion avancée des utilisateurs
@app.get("/api/users/statistics", tags=["User Management"])
async def get_users_statistics():
    """
    Obtenir des statistiques générales sur les utilisateurs.
    """
    return await get_user_statistics()

@app.get("/api/users/{username}", tags=["User Management"])
async def get_single_user(username: str):
    """
    Obtenir les détails d'un utilisateur spécifique avec son historique de connexion.
    """
    return await get_user_details(username)

@app.post("/api/users/reset-password", tags=["User Management"])
async def reset_user_password(reset_data: PasswordReset):
    """
    Réinitialiser le mot de passe d'un utilisateur.
    """
    return await reset_password(reset_data.username, reset_data.new_password)

@app.post("/api/users/toggle-status", tags=["User Management"])
async def update_user_status(status_data: UserStatusUpdate):
    """
    Activer ou désactiver un compte utilisateur.
    """
    return await toggle_user_status(status_data.username, status_data.active)

@app.get("/api/enterprise/{enterprise_id}", tags=["DATA"])
async def get_enterprise_by_id(enterprise_id: str):
    try:
        # Convertir l'ID en ObjectId pour MongoDB
        from bson.objectid import ObjectId
        
        # Valider l'ID
        if not ObjectId.is_valid(enterprise_id):
            return JSONResponse(
                status_code=400,
                content={"message": "Invalid enterprise ID format"}
            )
            
        # Rechercher l'entreprise dans la base de données
        enterprise = await enterprises_collection.find_one({"_id": ObjectId(enterprise_id)})
        
        if not enterprise:
            return JSONResponse(
                status_code=404,
                content={"message": "Enterprise not found"}
            )
            
        # Convertir ObjectId en chaîne pour la sérialisation JSON
        enterprise["_id"] = str(enterprise["_id"])
        
        return enterprise
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"message": f"Error retrieving enterprise data: {str(e)}"}
        )

@app.get("/api/enterprise-scores/{enterprise_id}", tags=["DATA"])
async def get_enterprise_scores(enterprise_id: str):
    try:
        # Cache temporaire pour éviter les requêtes répétées pour un même ID
        # (À implémenter avec un vrai cache comme Redis en production)
        from bson.objectid import ObjectId
        
        # Clé de cache simple basée sur l'ID d'entreprise et l'horodatage par minute
        # Augmenter l'intervalle à 1 minute pour réduire les appels excessifs
        cache_key = f"{enterprise_id}_{int(time.time() / 60)}"
        
        # Valider l'ID d'entreprise
        if not enterprise_id:
            return JSONResponse(
                status_code=400,
                content={"message": "Enterprise ID is required"}
            )
            
        # Log pour débogage mais moins verbeux
        print(f"Recherche des scores pour l'entreprise ID: {enterprise_id}")
            
        # Rechercher le cas le plus récent pour cette entreprise
        query = {"enterpriseId": enterprise_id}
        case = await cases_collection.find_one(query, sort=[("timestamp", -1)])
        
        if not case:
            # Chercher avec le nom d'entreprise comme alternative
            enterprise = await enterprises_collection.find_one({"_id": ObjectId(enterprise_id)})
            if enterprise and "company_name" in enterprise:
                query = {"enterprise": enterprise["company_name"]}
                case = await cases_collection.find_one(query, sort=[("timestamp", -1)])
                print(f"Recherche par nom d'entreprise: {enterprise['company_name']}")
                
        if not case:
            print(f"Aucun cas trouvé pour l'entreprise ID: {enterprise_id}")
            # Retourner des scores par défaut pour éviter les erreurs d'affichage
            default_scores = {
                "environmental": 0,
                "social": 0,
                "modernization": 0,
                "leadTime": 0,
                "cost": 0,
                "quality": 0,
                "clientConsumer": 0,
                "cache_key": cache_key,
                "cached": True,
                "found": False
            }
            
            # Ajouter un champ pour indiquer qu'aucun cas n'a été trouvé
            return default_scores
        
        # Logs réduits pour éviter de surcharger les logs
        print(f"Cas trouvé pour l'entreprise ID: {enterprise_id}")
        
        # Catégories standardisées en anglais
        categories = [
            "environmental", 
            "social", 
            "modernization", 
            "leadTime", 
            "cost", 
            "quality", 
            "clientConsumer"
        ]
        
        # Extraire les scores de chaque catégorie
        scores = {}
        for category in categories:
            if category in case and isinstance(case[category], dict) and "Total" in case[category]:
                scores[category] = case[category]["Total"]
                # Logs réduits
                if scores[category] > 0:
                    print(f"Trouvé {category}: {scores[category]}")
            else:
                scores[category] = 0
        
        # Ajouter des informations de cache pour débogage
        scores["cache_key"] = cache_key
        scores["cached"] = True
        scores["found"] = True
        
        # Log final avec uniquement les scores non nuls
        nonzero_scores = {k: v for k, v in scores.items() if isinstance(v, (int, float)) and v > 0}
        print(f"Scores extraits non nuls: {nonzero_scores}")
        
        return scores
        
    except Exception as e:
        print(f"Error retrieving enterprise scores: {str(e)}")
        # Retourner des scores par défaut en cas d'erreur
        return {
            "environmental": 0,
            "social": 0,
            "modernization": 0,
            "leadTime": 0,
            "cost": 0,
            "quality": 0,
            "clientConsumer": 0,
            "error": str(e)
        }

@app.get("/debug/last-case/{enterprise_id}", tags=["DEBUG"])
async def debug_last_case(enterprise_id: str):
    """
    Route de débogage pour afficher le dernier cas enregistré pour une entreprise.
    Uniquement pour le développement.
    """
    try:
        from bson.objectid import ObjectId
        
        # Rechercher le cas le plus récent pour cette entreprise
        query = {"enterpriseId": enterprise_id}
        case = await cases_collection.find_one(query, sort=[("timestamp", -1)])
        
        if not case:
            # Chercher avec le nom d'entreprise comme alternative
            enterprise = await enterprises_collection.find_one({"_id": ObjectId(enterprise_id)})
            if enterprise and "company_name" in enterprise:
                query = {"enterprise": enterprise["company_name"]}
                case = await cases_collection.find_one(query, sort=[("timestamp", -1)])
                
        if not case:
            return {"message": "Aucun cas trouvé pour cette entreprise", "enterprise_id": enterprise_id}
        
        # Convertir ObjectId en str pour la sérialisation JSON si nécessaire
        if "_id" in case and isinstance(case["_id"], ObjectId):
            case["_id"] = str(case["_id"])
            
        return {
            "message": "Dernier cas trouvé",
            "enterprise_id": enterprise_id,
            "case": case
        }
    except Exception as e:
        return {"error": str(e)}

@app.get("/debug/all-scores", tags=["DEBUG"])
async def debug_all_scores():
    """
    Route de débogage pour lister tous les scores dans la collection cases_collection.
    """
    try:
        # Récupérer tous les documents dans cases_collection
        cursor = cases_collection.find({})
        cases = await cursor.to_list(length=100)
        
        # Convertir ObjectId en str pour la sérialisation JSON
        for case in cases:
            if "_id" in case and isinstance(case["_id"], ObjectId):
                case["_id"] = str(case["_id"])
        
        return {
            "message": f"Nombre total de cas: {len(cases)}",
            "cases": cases
        }
    except Exception as e:
        return {"error": str(e)}

@app.get("/debug/validate-case/{enterprise_id}", tags=["DEBUG"])
async def debug_validate_case(enterprise_id: str):
    """
    Route de débogage pour valider la présence de toutes les catégories dans le dernier cas d'une entreprise.
    """
    try:
        from bson.objectid import ObjectId
        
        # Rechercher le cas le plus récent pour cette entreprise
        query = {"enterpriseId": enterprise_id}
        case = await cases_collection.find_one(query, sort=[("timestamp", -1)])
        
        if not case:
            # Chercher avec le nom d'entreprise comme alternative
            enterprise = await enterprises_collection.find_one({"_id": ObjectId(enterprise_id)})
            if enterprise and "company_name" in enterprise:
                query = {"enterprise": enterprise["company_name"]}
                case = await cases_collection.find_one(query, sort=[("timestamp", -1)])
                
        if not case:
            return {"message": "Aucun cas trouvé pour cette entreprise", "enterprise_id": enterprise_id}
        
        # Convertir ObjectId en str pour la sérialisation JSON si nécessaire
        if "_id" in case and isinstance(case["_id"], ObjectId):
            case["_id"] = str(case["_id"])
        
        # Vérifier la présence de chaque catégorie
        required_categories = [
            "environmental", "social", "modernization", "leadTime", 
            "cost", "quality", "clientConsumer"
        ]
        
        # Vérifier toutes les catégories
        category_status = {}
        for cat in required_categories:
            # Vérifier le format standardisé
            if cat in case and isinstance(case[cat], dict) and "Total" in case[cat]:
                category_status[cat] = {
                    "present": True, 
                    "format": "standardized", 
                    "value": case[cat]["Total"]
                }
            else:
                category_status[cat] = {"present": False, "format": "missing"}
        
        # Résultats de la validation
        validation_result = {
            "all_categories_present": all(status["present"] for status in category_status.values()),
            "category_details": category_status,
            "case_id": case["_id"],
            "enterprise_id": enterprise_id,
            "timestamp": case.get("timestamp", "Unknown")
        }
            
        return validation_result
    except Exception as e:
        return {"error": str(e)}

@app.get("/api/raw-scores/{enterprise_id}", tags=["DATA"])
async def get_raw_enterprise_scores(enterprise_id: str):
    """
    Obtient les scores bruts d'une entreprise sans normalisation.
    Utile pour le débogage.
    """
    try:
        # Rechercher les scores dans la collection cases_collection
        from bson.objectid import ObjectId
        
        if not enterprise_id:
            return JSONResponse(
                status_code=400,
                content={"message": "Enterprise ID is required"}
            )
            
        print(f"Recherche des scores bruts pour l'entreprise ID: {enterprise_id}")
        
        # Rechercher le cas le plus récent pour cette entreprise
        query = {"enterpriseId": enterprise_id}
        case = await cases_collection.find_one(query, sort=[("timestamp", -1)])
        
        if not case:
            # Chercher avec le nom d'entreprise comme alternative
            enterprise = await enterprises_collection.find_one({"_id": ObjectId(enterprise_id)})
            if enterprise and "company_name" in enterprise:
                query = {"enterprise": enterprise["company_name"]}
                case = await cases_collection.find_one(query, sort=[("timestamp", -1)])
                
        if not case:
            return {"message": "Aucun cas trouvé", "scores": {}}
        
        # Convertir ObjectId en str pour la sérialisation JSON
        if "_id" in case:
            case["_id"] = str(case["_id"])
            
        # Liste des catégories standardisées
        standard_categories = [
            "environmental", "social", "modernization", "leadTime", 
            "cost", "quality", "clientConsumer"
        ]
        
        # Créer un dictionnaire de scores bruts
        raw_scores = {}
        for key in standard_categories:
            if key in case and isinstance(case[key], dict) and "Total" in case[key]:
                raw_scores[key] = case[key]["Total"]
                
        return {
            "message": "Scores bruts récupérés avec succès",
            "enterprise_id": enterprise_id,
            "timestamp": case.get("timestamp", "Unknown"),
            "raw_scores": raw_scores,
            "full_case": case
        }
    except Exception as e:
        print(f"Error retrieving raw scores: {str(e)}")
        return {"error": str(e)}

@app.get("/api/enterprise-results/{enterprise_id}", tags=["DATA"])
async def get_enterprise_results(enterprise_id: str, category: Optional[str] = None):
    """
    Récupère les réponses détaillées pour une entreprise spécifique.
    Optionnellement, filtre par catégorie.
    """
    try:
        from bson.objectid import ObjectId
        
        # Valider l'ID d'entreprise
        if not enterprise_id:
            return JSONResponse(
                status_code=400,
                content={"message": "Enterprise ID is required"}
            )
        
        # Construire la requête en fonction des paramètres
        query = {"enterpriseId": enterprise_id}
        if category:
            query["category"] = category
            
        print(f"Recherche des résultats pour l'entreprise ID: {enterprise_id} {', catégorie: ' + category if category else ''}")
        
        # Rechercher les résultats dans la collection
        cursor = results_collection.find(query)
        results = await cursor.to_list(length=100)  # Limiter à 100 documents
        
        # Si aucun résultat n'est trouvé
        if not results or len(results) == 0:
            return {
                "found": False,
                "message": "Aucun résultat trouvé pour cette entreprise",
                "enterprise_id": enterprise_id
            }
        
        # Convertir les ObjectId en chaînes pour la sérialisation JSON
        for result in results:
            if "_id" in result:
                result["_id"] = str(result["_id"])
        
        # Construire la réponse
        response = {
            "found": True,
            "count": len(results),
            "results": results
        }
        
        # Ajouter le résumé des catégories disponibles
        categories = {}
        for result in results:
            cat = result.get("category", "unknown")
            if cat not in categories:
                categories[cat] = []
            
            section = result.get("section", "unknown")
            if section not in categories[cat]:
                categories[cat].append(section)
        
        response["categories"] = categories
        
        return response
    except Exception as e:
        print(f"Error retrieving enterprise results: {str(e)}")
        return {
            "found": False,
            "error": str(e)
        }

@app.post("/api/refresh-scores/{enterprise_id}", tags=["DATA"])
async def refresh_enterprise_scores(enterprise_id: str):
    """
    Recalcule et met à jour les scores totaux d'une entreprise à partir des réponses stockées.
    Utile pour reconstruire les scores si la collection MSR est corrompue ou manquante.
    """
    try:
        from bson.objectid import ObjectId
        
        # Valider l'ID d'entreprise
        if not enterprise_id:
            return JSONResponse(
                status_code=400,
                content={"message": "Enterprise ID is required"}
            )
            
        print(f"Recalcul des scores pour l'entreprise ID: {enterprise_id}")
        
        # Rechercher toutes les réponses pour cette entreprise
        cursor = results_collection.find({"enterpriseId": enterprise_id})
        results = await cursor.to_list(length=None)  # Récupérer tous les documents
        
        if not results or len(results) == 0:
            return {
                "success": False,
                "message": "Aucune réponse trouvée pour cette entreprise",
                "enterprise_id": enterprise_id
            }
            
        print(f"Nombre de sections trouvées: {len(results)}")
        
        # Organiser les résultats par catégorie
        categories = {}
        for result in results:
            category = result.get("category", "unknown")
            if category not in categories:
                categories[category] = []
            categories[category].append(result)
        
        # Calculer les scores par catégorie
        scores = {
            "environmental": {"Total": 0},
            "social": {"Total": 0},
            "modernization": {"Total": 0},
            "leadTime": {"Total": 0},
            "cost": {"Total": 0},
            "quality": {"Total": 0},
            "clientConsumer": {"Total": 0},
            "timestamp": datetime.utcnow().isoformat(),
            "enterpriseId": enterprise_id
        }
        
        # Pour chaque catégorie, compter les réponses positives
        for category, results_list in categories.items():
            if category in scores:
                yes_count = 0
                total_questions = 0
                
                for result in results_list:
                    if "answers" in result and isinstance(result["answers"], list):
                        for answer in result["answers"]:
                            if "answer" in answer:
                                total_questions += 1
                                if answer["answer"] == "Yes":
                                    yes_count += 1
                
                scores[category]["Total"] = yes_count
                print(f"Catégorie {category}: {yes_count} réponses positives sur {total_questions} questions")
        
        # Vérifier si un document existe déjà pour cette entreprise
        existing_case = await cases_collection.find_one({"enterpriseId": enterprise_id})
        
        if existing_case:
            # Mettre à jour le document existant
            result = await cases_collection.update_one(
                {"enterpriseId": enterprise_id},
                {"$set": scores}
            )
            success = result.modified_count > 0
            print(f"Document MSR mis à jour pour {enterprise_id}, statut: {success}")
        else:
            # Créer un nouveau document
            result = await cases_collection.insert_one(scores)
            success = result.inserted_id is not None
            print(f"Nouveau document MSR créé pour {enterprise_id}, statut: {success}")
        
        # Récupérer le document mis à jour pour confirmer
        updated_case = await cases_collection.find_one({"enterpriseId": enterprise_id})
        if updated_case and "_id" in updated_case:
            updated_case["_id"] = str(updated_case["_id"])
        
        return {
            "success": success,
            "message": "Scores recalculés avec succès" if success else "Échec du recalcul des scores",
            "scores": updated_case if updated_case else scores
        }
        
    except Exception as e:
        print(f"Error refreshing enterprise scores: {str(e)}")
        return {
            "success": False,
            "error": str(e)
        }

@app.post("/upload", tags=["Analysing Documents"])
async def upload_file(file: UploadFile = File(...)):
    try:
        if not os.path.exists(UPLOAD_DIR):
            os.makedirs(UPLOAD_DIR)
            
        file_extension = os.path.splitext(file.filename)[1].lower()
        if file_extension not in ['.png', '.jpg', '.jpeg', '.gif', '.bmp']:
            raise HTTPException(status_code=400, detail="Le fichier doit être une image (PNG, JPG, JPEG, GIF, BMP)")
            
        file_location = os.path.join(UPLOAD_DIR, file.filename)
        
        with open(file_location, "wb+") as file_object:
            file_object.write(await file.read())
            
        return {"filename": file.filename, "success": True}
    except HTTPException as http_error:
        return JSONResponse(content={"detail": str(http_error.detail)}, status_code=http_error.status_code)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/user-cases", tags=["DATA"])
async def get_user_cases(request: Request):
    """
    Récupère tous les cas d'études créés par l'utilisateur actuellement connecté.
    """
    try:
        # Récupérer le nom d'utilisateur à partir des cookies ou headers
        authorization = request.headers.get("Authorization", "")
        token = authorization.replace("Bearer ", "") if authorization else None
        
        if not token:
            return JSONResponse(
                status_code=401,
                content={"message": "Non authentifié", "found": False}
            )
            
        # Extraire le nom d'utilisateur depuis le token
        user_id = token
        print(f"Recherche des cas pour l'utilisateur: {user_id}")
        
        # Pour le débogage, afficher tous les cas dans la collection
        cursor = cases_collection.find({})
        all_cases = await cursor.to_list(length=100)
        
        print(f"Nombre total de cas dans la collection: {len(all_cases)}")
        for case in all_cases:
            print(f"Cas trouvé: ID={case.get('_id')}, enterpriseId={case.get('enterpriseId')}, userId={case.get('userId', 'Non défini')}")
        
        # Récupérer tous les cas avec userId correspondant
        cursor = cases_collection.find({"userId": user_id})
        cases = await cursor.to_list(length=100)
        
        # Si aucun cas n'est trouvé, vérifier aussi avec le champ userId vide ou null
        if not cases:
            print("Aucun cas trouvé avec le userId exact, recherche avec l'ID mongo...")
            # Récupérer les informations de l'utilisateur
            user = await users_collection.find_one({"username": user_id})
            if user:
                user_id_obj = str(user.get("_id", ""))
                print(f"ID MongoDB de l'utilisateur: {user_id_obj}")
                cursor = cases_collection.find({"userId": user_id_obj})
                cases = await cursor.to_list(length=100)
                
                # Si toujours aucun cas, chercher par enterpriseId (si l'utilisateur a des entreprises)
                if not cases:
                    print("Recherche par entreprises associées à l'utilisateur...")
                    # Rechercher les entreprises associées à l'utilisateur
                    cursor = enterprises_collection.find({"userId": user_id_obj})
                    enterprises = await cursor.to_list(length=100)
                    
                    if enterprises:
                        # Collecter tous les IDs d'entreprise
                        enterprise_ids = [str(enterprise.get("_id", "")) for enterprise in enterprises]
                        print(f"Entreprises trouvées: {enterprise_ids}")
                        
                        # Rechercher les cas par enterpriseId
                        if enterprise_ids:
                            cursor = cases_collection.find({"enterpriseId": {"$in": enterprise_ids}})
                            cases = await cursor.to_list(length=100)
        
        # Si toujours aucun cas, renvoyer tous les cas (TEMPORAIRE, POUR DÉBOGAGE UNIQUEMENT)
        if not cases:
            print("Aucun cas trouvé, renvoi de tous les cas pour débogage")
            cases = all_cases
        
        # Convertir ObjectId en str pour la sérialisation JSON
        for case in cases:
            if "_id" in case and isinstance(case["_id"], ObjectId):
                case["_id"] = str(case["_id"])
        
        return {
            "message": f"Nombre total de cas: {len(cases)}",
            "cases": cases,
            "found": len(cases) > 0
        }
    except Exception as e:
        print(f"Error retrieving user cases: {str(e)}")
        return {"error": str(e), "found": False}

@app.get("/api/case-details/{case_id}", tags=["DATA"])
async def get_case_details(case_id: str, request: Request):
    """
    Récupère les détails d'un cas d'étude spécifique par son ID.
    Vérifie également que l'utilisateur a accès à ce cas.
    """
    try:
        from bson.objectid import ObjectId
        
        # Récupérer le nom d'utilisateur à partir des cookies ou headers
        authorization = request.headers.get("Authorization", "")
        token = authorization.replace("Bearer ", "") if authorization else None
        
        if not token:
            return JSONResponse(
                status_code=401,
                content={"message": "Non authentifié", "found": False}
            )
        
        # Extraire le nom d'utilisateur depuis le token
        user_id = token
        
        # Vérifier si l'ID du cas est valide
        try:
            case_object_id = ObjectId(case_id)
        except:
            return JSONResponse(
                status_code=400,
                content={"message": "ID de cas invalide", "found": False}
            )
        
        # Récupérer le cas
        case = await cases_collection.find_one({"_id": case_object_id})
        
        if not case:
            return JSONResponse(
                status_code=404,
                content={"message": "Cas non trouvé", "found": False}
            )
        
        # Vérifier si l'utilisateur est l'auteur du cas ou un administrateur
        user = await users_collection.find_one({"username": user_id})
        is_admin = user and user.get("role") == "admin"
        user_id_obj = str(user.get("_id", "")) if user else ""
        
        # Autoriser l'accès si l'utilisateur est admin ou propriétaire du cas
        is_owner = (case.get("userId") == user_id or case.get("userId") == user_id_obj)
        
        if not (is_admin or is_owner):
            return JSONResponse(
                status_code=403,
                content={"message": "Accès non autorisé à ce cas", "found": False}
            )
        
        # Convertir ObjectId en str pour la sérialisation JSON
        if "_id" in case:
            case["_id"] = str(case["_id"])
        
        return {
            "message": "Cas trouvé avec succès",
            "case": case,
            "found": True
        }
    except Exception as e:
        print(f"Error retrieving case details: {str(e)}")
        return {"error": str(e), "found": False}

