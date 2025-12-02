import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function LanguageSelector() {
  const { lang, setLang } = useLanguage();

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
          onClick={() => setLang(l.code)}
          className={`px-2 py-1 rounded text-sm font-medium ${
            lang === l.code ? 'bg-blue-600 text-white' : 'text-slate-200 hover:bg-white/5'
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
