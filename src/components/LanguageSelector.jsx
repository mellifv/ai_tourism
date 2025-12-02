import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function LanguageSelector() {
  // Use the correct variable names from LanguageContext
  const { language, setLanguage, t } = useLanguage(); // Changed from lang/setLang

  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'ru', label: 'RU' },
    { code: 'kz', label: 'KZ' },
  ];

  return (
    <div className="flex gap-1">
      {languages.map((l) => (
        <button
          key={l.code}
          onClick={() => setLanguage(l.code)} // Changed from setLang
          className={`px-2 py-1 rounded text-sm font-medium ${
            language === l.code ? 'bg-blue-600 text-white' : 'text-slate-200 hover:bg-white/5' // Changed from lang
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
