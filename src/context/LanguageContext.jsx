// src/context/LanguageContext.jsx
import React, { createContext, useState, useContext, useMemo } from 'react';

// Import ALL translations
import enTranslations from '../locales/en';
import ruTranslations from '../locales/ru';
import kkTranslations from '../locales/kz';
import video_en from '../locales/video_eng';
import video_ru from '../locales/video_rus';
import video_kk from '../locales/video_kz';
import city_en from '../locales/city_en';
import city_ru from '../locales/city_ru';
import city_kz from '../locales/city_kz';

const LanguageContext = createContext();
export const useLanguage = () => useContext(LanguageContext);

// Immutable deep merge for multiple sources
const deepMerge = (target = {}, ...sources) => {
  let output = { ...target };
  
  for (const source of sources) {
    if (!source) continue;
    
    for (const key in source) {
      if (
        source[key] &&
        typeof source[key] === 'object' &&
        !Array.isArray(source[key])
      ) {
        output[key] = deepMerge(output[key] || {}, source[key]);
      } else {
        output[key] = source[key];
      }
    }
  }
  
  return output;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  // Memoize merged translations to avoid repeated deep merges
  const mergedTranslations = useMemo(() => {
    const general = { 
      en: enTranslations, 
      ru: ruTranslations, 
      kz: kkTranslations 
    };
    const video = { 
      en: video_en, 
      ru: video_ru, 
      kz: video_kk 
    };
    const city = { 
      en: city_en, 
      ru: city_ru, 
      kz: city_kz 
    };
    
    // Merge all three translation sources
    return deepMerge(
      general[language] || general.en,
      video[language] || video.en,
      city[language] || city.en
    );
  }, [language]);

  // Translation function with dynamic placeholders
  const t = (key, vars = {}) => {
    const keys = key.split('.');
    let value = mergedTranslations;

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // fallback if key not found
      }
    }

    if (typeof value === 'string') {
      return value.replace(/{(\w+)}/g, (_, varName) => {
        if (varName in vars) return vars[varName];
        if (varName === 'year') return new Date().getFullYear();
        return `{${varName}}`; // keep placeholder if unknown
      });
    }

    return value;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
