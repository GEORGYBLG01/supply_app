// responsive-fix.js - Script pour forcer la responsivité

document.addEventListener('DOMContentLoaded', function() {
  // Ajuster toutes les largeurs fixes
  function fixFixedWidths() {
    // Sélectionner tous les éléments avec une largeur fixe dans le style inline
    const elementsWithStyle = document.querySelectorAll('[style*="width"]');
    
    elementsWithStyle.forEach(function(element) {
      // Obtenir la largeur actuelle
      const computedStyle = window.getComputedStyle(element);
      const parentWidth = element.parentElement.clientWidth;
      
      // Si la largeur est fixe en pixels et dépasse la largeur du parent
      if (computedStyle.width.includes('px')) {
        const widthValue = parseFloat(computedStyle.width);
        if (widthValue > parentWidth) {
          element.style.width = '100%';
          element.style.maxWidth = '100%';
        }
      }
    });
  }
  
  // Corriger les éléments en position absolue qui sortent de leur conteneur
  function fixAbsoluteElements() {
    // Sélectionner tous les éléments en position absolue
    const absoluteElements = document.querySelectorAll('[style*="position: absolute"], [style*="position:absolute"]');
    
    absoluteElements.forEach(function(element) {
      const rect = element.getBoundingClientRect();
      const parentRect = element.parentElement.getBoundingClientRect();
      
      // Vérifier si l'élément dépasse son parent
      if (rect.right > parentRect.right || rect.left < parentRect.left) {
        if (window.innerWidth <= 768) {
          element.style.position = 'relative';
          element.style.top = 'auto';
          element.style.left = 'auto';
          element.style.right = 'auto';
        }
      }
    });
  }
  
  // Ajuster les tailles de polices trop grandes
  function fixFontSizes() {
    const allElements = document.querySelectorAll('*');
    
    allElements.forEach(function(element) {
      const computedStyle = window.getComputedStyle(element);
      const fontSize = parseFloat(computedStyle.fontSize);
      
      // Si la taille de police est supérieure à 24px sur mobile
      if (fontSize > 24 && window.innerWidth <= 768) {
        element.style.fontSize = 'clamp(16px, 5vw, 24px)';
      }
    });
  }
  
  // Fixer les conteneurs qui débordent
  function fixOverflowingContainers() {
    const containers = document.querySelectorAll('.container, .wrapper, .section, .content, .row, [class*="container"]');
    
    containers.forEach(function(container) {
      container.style.maxWidth = '100%';
      container.style.overflowX = 'hidden';
    });
  }
  
  // Ajuster les images trop grandes
  function fixImages() {
    const images = document.querySelectorAll('img, svg');
    
    images.forEach(function(img) {
      img.style.maxWidth = '100%';
      img.style.height = 'auto';
    });
  }
  
  // Exécuter toutes les fonctions de correction
  function applyAllFixes() {
    fixFixedWidths();
    fixAbsoluteElements();
    fixFontSizes();
    fixOverflowingContainers();
    fixImages();
  }
  
  // Appliquer les corrections au chargement
  applyAllFixes();
  
  // Réappliquer lors du redimensionnement de la fenêtre
  window.addEventListener('resize', applyAllFixes);
  
  // Réappliquer après un délai pour capturer les éléments chargés dynamiquement
  setTimeout(applyAllFixes, 1000);
  setTimeout(applyAllFixes, 2000);
}); 