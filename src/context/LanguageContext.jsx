import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [translations, setTranslations] = useState({});

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const translationModule = await import(`../locales/${language}.json`);
        setTranslations(translationModule.default || translationModule);
      } catch (error) {
        console.error('Failed to load translations:', error);
        // Fallback to English
        const englishModule = await import('../locales/en.json');
        setTranslations(englishModule.default || englishModule);
      }
    };

    loadTranslations();
  }, [language]);

  // Get translation with key path (e.g., "header.title")
  const t = (key, variables = {}) => {
    const keys = key.split('.');
    let value = translations;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }

    // Replace variables like {year}
    if (typeof value === 'string') {
      return Object.keys(variables).reduce(
        (str, varKey) => str.replace(`{${varKey}}`, variables[varKey]),
        value
      );
    }
    
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
