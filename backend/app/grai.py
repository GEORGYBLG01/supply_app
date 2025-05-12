import pytesseract
from PIL import Image
import os
import re
from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
from io import BytesIO

# Chemin vers l'exécutable Tesseract
pytesseract.pytesseract.tesseract_cmd = r"C:/Program Files/Tesseract-OCR/tesseract.exe"

app = FastAPI()

# Dossier d'uploads
UPLOAD_DIR = "uploads"

# Classe GRAIRules pour la validation des règles GRAI
class GRAIRules:
    def __init__(self, grid):
        self.grid = grid

    def check_rules(self):
        errors = []
        if self.grid.get('received_by_self'):
            errors.append("CMG1: Erreur de syntaxe - Un cadre de décision ne peut être reçu par ce même centre.")
        if self.grid.get('from_external_to_internal'):
            errors.append("CMG2: Erreur de syntaxe - Un cadre de décision ne peut être émis d’une pseudo-fonction vers une autre.")
        if self.grid['external_info_function']['column'] != 2:
            errors.append("CMG3: Erreur de syntaxe - La fonction ‘informations externes’ est placée exclusivement en colonne 2.")
        if self.grid.get('from_internal_to_external'):
            errors.append("CMG4: Erreur de syntaxe - Un cadre de décision ne peut être émis d’une pseudo-fonction à une autre.")
        if self.grid['internal_info_function']['column'] != self.grid['total_columns']:
            errors.append("CMG5: Erreur de syntaxe - La fonction ‘informations internes’ est placée exclusivement en dernière colonne.")
        if not self.grid['manage_products_function']:
            errors.append("CMG6: Erreur de syntaxe - La fonction ‘gérer les produits’ ne peut être absente de la grille.")
        if not self.grid['manage_resources_function']:
            errors.append("CMG7: Erreur de syntaxe - La fonction ‘gérer les ressources’ ne peut être absente de la grille.")
        if not self.grid['planning_function']:
            errors.append("CMG8: Erreur de syntaxe - La fonction ‘planifier’ ne peut être absente de la grille.")
        if not self.is_periods_descending(self.grid['decision_periods']):
            errors.append("CMG9: Erreur de syntaxe - Les périodes des niveaux décisionnels doivent être classées par ordre décroissant.")
        if len(self.grid['decision_levels']) < 3:
            errors.append("CMG10: Erreur de syntaxe - Les niveaux décisionnels ne peuvent être moins de trois dans une grille GRAI.")
        if any(level['column'] != 1 for level in self.grid['decision_levels']):
            errors.append("CMG11: Erreur de syntaxe - Un niveau décisionnel ne peut être placé que dans la première colonne.")
        if self.grid['internal_info_function']['count'] > 1:
            errors.append("CMG12: Erreur de syntaxe - Une grille GRAI ne peut contenir qu’une seule fonction ‘informations internes’.")
        if self.grid['external_info_function']['count'] > 1:
            errors.append("CMG13: Erreur de syntaxe - Une grille GRAI ne peut contenir qu’une seule fonction ‘informations externes’.")
        if self.grid['well_defined_functions'] and self.grid['decision_center_added']:
            errors.append("CMG14: Erreur de syntaxe - Les centres de décision n’ont d’existence qu’à travers les niveaux décisionnels et les fonctions.")
        return errors

    def is_periods_descending(self, periods):
        return all(periods[i] >= periods[i + 1] for i in range(len(periods) - 1))

# Fonction pour extraire les informations de la grille à partir d'une image
def extract_grid_info(image_path):
    if os.path.exists(image_path):
        img = preprocess_image(image_path)
        extracted_text = pytesseract.image_to_string(img, lang='fra')
        return parse_extracted_text(extracted_text)
    else:
        print("L'image spécifiée n'existe pas.")
        return None

# Prétraitement de l'image (conversion en niveaux de gris et binarisation)
def preprocess_image(image_path):
    img = Image.open(image_path)
    gray = img.convert('L')
    threshold = 150
    binary_image = gray.point(lambda p: p > threshold and 255)
    return binary_image

# Parsing du texte extrait pour obtenir les informations nécessaires à la validation
def parse_extracted_text(text):
    grid_info = {
        'received_by_self': False,
        'from_external_to_internal': False,
        'external_info_function': {'column': None, 'count': 0},
        'internal_info_function': {'column': None, 'count': 0},
        'manage_products_function': 'gérer les produits' in text,
        'manage_resources_function': 'gérer les ressources' in text,
        'planning_function': 'planifier' in text,
        'decision_periods': parse_decision_periods(text),
        'decision_levels': parse_decision_levels(text),
        'well_defined_functions': True,
        'decision_center_added': False,
        'total_columns': None
    }
    return grid_info

# Extraction des périodes de décision à partir du texte
def parse_decision_periods(text):
    periods = re.findall(r'\d+', text)
    return list(map(int, periods)) if periods else []

# Extraction des niveaux décisionnels à partir du texte
def parse_decision_levels(text):
    levels = re.findall(r'Niveau \d+', text)
    return [{'column': i + 1} for i in range(len(levels))] if levels else []

# Route FastAPI pour analyser l'image et renvoyer les erreurs
@app.post("/validate_grid/")
async def validate_grid(file: UploadFile = File(...)):
    # Sauvegarder l'image dans le dossier "uploads"
    file_location = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_location, "wb") as f:
        f.write(file.file.read())

    # Extraire les informations de la grille et vérifier les règles
    grid_info = extract_grid_info(file_location)
    if grid_info:
        rules_checker = GRAIRules(grid_info)
        validation_errors = rules_checker.check_rules()
        if validation_errors:
            return JSONResponse(content={"errors": validation_errors}, status_code=400)
        else:
            return JSONResponse(content={"message": "La grille GRAI respecte toutes les règles."}, status_code=200)
    else:
        return JSONResponse(content={"error": "Erreur d'extraction des informations de la grille."}, status_code=500)

# Lancer l'application FastAPI avec Uvicorn
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
