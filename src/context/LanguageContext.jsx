// src/context/LanguageContext.jsx
import React, { createContext, useState, useContext } from 'react';

// Import all translations
import enTranslations from '../locales/en';
import ruTranslations from '../locales/ru';
import kkTranslations from '../locales/kz';
import video_en from '../locales/video_en';
import video_ru from '../locales/video_ru';
import video_kk from '../locales/video_kz';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  // Deep merge function
  const deepMerge = (target, source) => {
    for (const key in source) {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        if (!target[key] || typeof target[key] !== 'object') {
          target[key] = {};
        }
        deepMerge(target[key], source[key]);
      } else {
        target[key] = source[key];
      }
    }
    return target;
  };

  // Get all translations for current language
  const getTranslations = () => {
    const general = {
      en: enTranslations,
      ru: ruTranslations,
      kz: kzTranslations
    };
    
    const video = {
      en: video_en,
      ru: video_ru,
      kz: video_kz
    };
    
    // Merge general and video translations
    return deepMerge({}, general[language], video[language]);
  };

  const t = (key, defaultValue = '') => {
    const keys = key.split('.');
    let value = getTranslations();
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return defaultValue || key;
      }
    }

    if (typeof value === 'string') {
      return value.replace(/{(\w+)}/g, (match, varName) => {
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
