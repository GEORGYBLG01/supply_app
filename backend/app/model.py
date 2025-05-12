from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


# Modèle de données des utilisateurs
class User(BaseModel):
    username: str
    password: str
    salt: Optional[str] = None
    is_admin: Optional[bool] = False
    role: Optional[str] = "user"
    last_login: Optional[datetime] = None
    login_count: Optional[int] = 0
    login_history: Optional[List[datetime]] = []
    is_active: Optional[bool] = True
    created_at: Optional[datetime] = None


# Modèle de données pour les points
class Data_points(BaseModel):
    enterprise: Optional[dict] = {}
    social: Optional[dict] = {"Total": 0}
    environmental: Optional[dict] = {"Total": 0}
    quality: Optional[dict] = {"Total": 0}
    cost: Optional[dict] = {"Total": 0}
    leadTime: Optional[dict] = {"Total": 0}
    modernization: Optional[dict] = {"Total": 0}
    clientConsumer: Optional[dict] = {"Total": 0}
    enterpriseId: Optional[str] = None
    timestamp: Optional[str] = None

    class Config:
        extra = "allow"  # Permet des champs supplémentaires non définis dans le modèle


# Définition de la structure de données attendue pour la requête POST
class Data_POST_request(BaseModel):
    question: str
    answer: str
    category: Optional[str] = None
    section: Optional[str] = None
    enterpriseId: Optional[str] = None
    userId: Optional[str] = None
    timestamp: Optional[str] = None
    
    class Config:
        extra = "allow"  # Permet des champs supplémentaires non définis dans le modèle


# Modèle de données pour enregistrer les donnees d'acquisition dans mongodb
class Data_enterprise(BaseModel):
    company_name: str
    company_size: int
    activity_sector: str
    date_added: Optional[str] = None  # Optionnel, sera généré côté serveur
