import React, { createContext, useState, useContext } from 'react';

// Simple hardcoded translations
const translations = {
  en: {
    header: { title: "Astana AI Trips", subtitle: "Future-ready travel planning" },
    nav: { home: "Home", videoGuides: "Video Guides", itineraries: "Itineraries", cityInsights: "City Insights" },
    hero: { title: "Explore Astana", subtitle: "AI-generated travel plans", inputPlaceholder: "Describe your perfect day", generateButton: "Generate", generating: "Planning..." }
  },
  ru: {
    header: { title: "Astana AI Trips", subtitle: "Планирование путешествий" },
    nav: { home: "Главная", videoGuides: "Видеогиды", itineraries: "Маршруты", cityInsights: "Инсайты" },
    hero: { title: "Исследуйте Астану", subtitle: "Планы от ИИ", inputPlaceholder: "Опишите ваш день", generateButton: "Создать", generating: "Планирование..." }
  },
  kk: {
    header: { title: "Astana AI Trips", subtitle: "Саяхат жоспарлау" },
    nav: { home: "Басты", videoGuides: "Бейнелер", itineraries: "Маршруттар", cityInsights: "Мәліметтер" },
    hero: { title: "Астананы зерттеңіз", subtitle: "ЖИ жоспарлары", inputPlaceholder: "Күніңізді сипаттаңыз", generateButton: "Жасау", generating: "Жоспарлау..." }
  }
};

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const t = (key, defaultValue = '') => {
    const keys = key.split('.');
    let value = translations[language] || translations.en;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return defaultValue || key;
      }
    }
    
    return value || defaultValue || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
