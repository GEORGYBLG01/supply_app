import pytesseract
from PIL import Image
import os
import re

# Chemin vers l'exécutable Tesseract
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

# Fonction pour extraire les informations de la grille à partir d'une image
def extract_grid_info(image_path):
    try:
        if os.path.exists(image_path):
            img = preprocess_image(image_path)
            extracted_text = pytesseract.image_to_string(img, lang='fra')
            return parse_extracted_text(extracted_text)
        else:
            print("L'image spécifiée n'existe pas.")
            return None
    except Exception as e:
        print(f"Erreur lors de l'extraction des informations: {str(e)}")
        # Retourne une structure de base pour éviter les erreurs 500
        return get_default_grid_info()

# Prétraitement de l'image (conversion en niveaux de gris et binarisation)
def preprocess_image(image_path):
    try:
        img = Image.open(image_path)
        gray = img.convert('L')
        threshold = 150
        binary_image = gray.point(lambda p: p > threshold and 255)
        return binary_image
    except Exception as e:
        print(f"Erreur lors du prétraitement de l'image: {str(e)}")
        raise

# Parsing du texte extrait pour obtenir les informations nécessaires à la validation
def parse_extracted_text(text):
    try:
        grid_info = {
            'received_by_self': False,
            'from_external_to_internal': False,
            'from_internal_to_external': False,  # Ajout de cette propriété manquante
            'external_info_function': {'column': 2, 'count': 0},  # Valeur par défaut 2
            'internal_info_function': {'column': 3, 'count': 0},  # Valeur par défaut 3
            'manage_products_function': 'gérer les produits' in text.lower(),
            'manage_resources_function': 'gérer les ressources' in text.lower(),
            'planning_function': 'planifier' in text.lower(),
            'decision_periods': parse_decision_periods(text),
            'decision_levels': parse_decision_levels(text),
            'well_defined_functions': True,
            'decision_center_added': False,
            'total_columns': 3  # Valeur par défaut
        }
        return grid_info
    except Exception as e:
        print(f"Erreur lors du parsing du texte: {str(e)}")
        return get_default_grid_info()

# Fonction pour créer une structure par défaut
def get_default_grid_info():
    return {
        'received_by_self': False,
        'from_external_to_internal': False,
        'from_internal_to_external': False,
        'external_info_function': {'column': 2, 'count': 0},
        'internal_info_function': {'column': 3, 'count': 0},
        'manage_products_function': False,
        'manage_resources_function': False,
        'planning_function': False,
        'decision_periods': [30, 7, 1],  # Valeurs par défaut
        'decision_levels': [{'column': 1}, {'column': 1}, {'column': 1}],
        'well_defined_functions': True,
        'decision_center_added': False,
        'total_columns': 3
    }

# Extraction des périodes de décision à partir du texte
def parse_decision_periods(text):
    try:
        periods = re.findall(r'\d+', text)
        result = list(map(int, periods)) if periods else []
        # Assurer un minimum de 3 périodes
        return result if len(result) >= 3 else [30, 7, 1]
    except Exception as e:
        print(f"Erreur lors de l'extraction des périodes: {str(e)}")
        return [30, 7, 1]  # Valeurs par défaut

# Extraction des niveaux décisionnels à partir du texte
def parse_decision_levels(text):
    try:
        levels = re.findall(r'Niveau \d+', text)
        result = [{'column': 1} for i in range(len(levels))] if levels else []
        # Assurer un minimum de 3 niveaux
        return result if len(result) >= 3 else [{'column': 1}, {'column': 1}, {'column': 1}]
    except Exception as e:
        print(f"Erreur lors de l'extraction des niveaux: {str(e)}")
        return [{'column': 1}, {'column': 1}, {'column': 1}]  # Valeurs par défaut

# Classe GRAIRules pour la validation des règles GRAI
class GRAIRules:
    def __init__(self, grid):
        self.grid = grid if grid else get_default_grid_info()

    def check_rules(self):
        try:
            errors = []
            if self.grid.get('received_by_self'):
                errors.append("CMG1: Erreur de syntaxe - Un cadre de décision ne peut être reçu par ce même centre.")
            if self.grid.get('from_external_to_internal'):
                errors.append("CMG2: Erreur de syntaxe - Un cadre de décision ne peut être émis d'une pseudo-fonction vers une autre.")
            if self.grid['external_info_function'].get('column') != 2:
                errors.append("CMG3: Erreur de syntaxe - La fonction 'informations externes' est placée exclusivement en colonne 2.")
            if self.grid.get('from_internal_to_external'):
                errors.append("CMG4: Erreur de syntaxe - Un cadre de décision ne peut être émis d'une pseudo-fonction à une autre.")
            
            # Vérification de la valeur total_columns avant de faire la comparaison
            total_cols = self.grid.get('total_columns', 3)
            if self.grid['internal_info_function'].get('column') != total_cols:
                errors.append("CMG5: Erreur de syntaxe - La fonction 'informations internes' est placée exclusivement en dernière colonne.")
            
            if not self.grid.get('manage_products_function', False):
                errors.append("CMG6: Erreur de syntaxe - La fonction 'gérer les produits' ne peut être absente de la grille.")
            if not self.grid.get('manage_resources_function', False):
                errors.append("CMG7: Erreur de syntaxe - La fonction 'gérer les ressources' ne peut être absente de la grille.")
            if not self.grid.get('planning_function', False):
                errors.append("CMG8: Erreur de syntaxe - La fonction 'planifier' ne peut être absente de la grille.")
            
            # Vérifier les périodes si elles existent
            periods = self.grid.get('decision_periods', [])
            if periods and not self.is_periods_descending(periods):
                errors.append("CMG9: Erreur de syntaxe - Les périodes des niveaux décisionnels doivent être classées par ordre décroissant.")
            
            # Vérifier les niveaux si ils existent
            levels = self.grid.get('decision_levels', [])
            if len(levels) < 3:
                errors.append("CMG10: Erreur de syntaxe - Les niveaux décisionnels ne peuvent être moins de trois dans une grille GRAI.")
            
            if levels and any(level.get('column') != 1 for level in levels):
                errors.append("CMG11: Erreur de syntaxe - Un niveau décisionnel ne peut être placé que dans la première colonne.")
            
            if self.grid['internal_info_function'].get('count', 0) > 1:
                errors.append("CMG12: Erreur de syntaxe - Une grille GRAI ne peut contenir qu'une seule fonction 'informations internes'.")
            if self.grid['external_info_function'].get('count', 0) > 1:
                errors.append("CMG13: Erreur de syntaxe - Une grille GRAI ne peut contenir qu'une seule fonction 'informations externes'.")
            
            well_defined = self.grid.get('well_defined_functions', True)
            decision_added = self.grid.get('decision_center_added', False)
            if well_defined and decision_added:
                errors.append("CMG14: Erreur de syntaxe - Les centres de décision n'ont d'existence qu'à travers les niveaux décisionnels et les fonctions.")
            
            return errors
        except Exception as e:
            print(f"Erreur lors de la vérification des règles: {str(e)}")
            return ["Erreur système: Impossible de vérifier les règles en raison d'une erreur interne."]

    def is_periods_descending(self, periods):
        if not periods or len(periods) < 2:
            return True
        return all(periods[i] >= periods[i + 1] for i in range(len(periods) - 1))
