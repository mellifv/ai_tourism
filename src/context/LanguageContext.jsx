import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [translations, setTranslations] = useState({});

  // Load saved language on start
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language when changed
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Load translations
  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const translationModule = await import(`../locales/${language}.json`);
        setTranslations(translationModule.default || translationModule);
      } catch (error) {
        console.error('Failed to load translations:', error);
        // Fallback to English
        try {
          const englishModule = await import('../locales/en.json');
          setTranslations(englishModule.default || englishModule);
        } catch (e) {
          setTranslations({});
        }
      }
    };

    loadTranslations();
  }, [language]);

  const t = (key, defaultValue = '') => {
    const keys = key.split('.');
    let value = translations;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return defaultValue || key;
      }
    }

    if (typeof value === 'string') {
      // Replace variables like {year}
      return value.replace(/{(\w+)}/g, (match, varName) => {
        // You can add variables here if needed
        if (varName === 'year') return new Date().getFullYear();
        return match;
      });
    }
    
    return value || defaultValue || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
