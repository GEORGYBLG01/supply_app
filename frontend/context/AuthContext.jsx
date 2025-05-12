import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Vérifier si l'utilisateur est déjà authentifié dans localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });
  
  // Ajouter le statut d'administrateur
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('isAdmin') === 'true';
  });

  // Mettre à jour localStorage lorsque isAuthenticated change
  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
    console.log("État d'authentification mis à jour:", isAuthenticated);
  }, [isAuthenticated]);
  
  // Mettre à jour localStorage lorsque isAdmin change
  useEffect(() => {
    localStorage.setItem('isAdmin', isAdmin);
    console.log("État d'administrateur mis à jour:", isAdmin);
  }, [isAdmin]);

  const login = (adminStatus = false) => {
    console.log("Fonction login appelée - authentification de l'utilisateur");
    setIsAuthenticated(true);
    setIsAdmin(adminStatus);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('isAdmin', adminStatus.toString());
  };

  const logout = () => {
    console.log("Fonction logout appelée - déconnexion de l'utilisateur");
    setIsAuthenticated(false);
    setIsAdmin(false);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('isAdmin');
    localStorage.setItem('isAuthenticated', 'false');
    localStorage.setItem('isAdmin', 'false');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};