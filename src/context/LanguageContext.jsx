// In LanguageContext.jsx
import enTranslations from '../locales/en.json';
import ruTranslations from '../locales/ru.json';
import kkTranslations from '../locales/kk.json';

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  
  const translations = {
    en: enTranslations,
    ru: ruTranslations,
    kk: kkTranslations
  };

  const t = (key, defaultValue = '') => {
    const keys = key.split('.');
    let value = translations[language];
    
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
