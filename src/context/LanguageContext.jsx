import React, { createContext, useContext, useState, useEffect } from 'react';
import en from '../locales/en.json';
import ru from '../locales/ru.json';
import kz from '../locales/kz.json';

const languages = { en, ru, kz };

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('en');
  const [translations, setTranslations] = useState(languages['en']);

  useEffect(() => {
    const savedLang = localStorage.getItem('lang');
    if (savedLang && languages[savedLang]) setLang(savedLang);
  }, []);

  useEffect(() => {
    setTranslations(languages[lang]);
    localStorage.setItem('lang', lang);
  }, [lang]);

  const t = (key, fallback = '') => {
    const keys = key.split('.');
    let value = translations;
    for (let k of keys) {
      value = value[k];
      if (!value) return fallback;
    }
    return value;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
