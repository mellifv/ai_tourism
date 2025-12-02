import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'kk', name: 'Қазақша', flag: '🇰🇿' }
  ];

  const currentLang = languages.find(l => l.code === language);

  return (
    <div className="relative">
      {/* Language selector button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
      >
        <span className="text-lg">{currentLang?.flag}</span>
        <span className="text-sm hidden sm:inline">{currentLang?.name}</span>
        <svg 
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 py-2 bg-gray-900/95 backdrop-blur-sm rounded-lg shadow-xl border border-white/10 z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setIsOpen(false);
              }}
              className={`flex items-center gap-3 w-full px-4 py-2 text-left hover:bg-white/10 transition-colors ${
                language === lang.code ? 'text-cyan-400' : 'text-white'
              }`}
            >
              <span className="text-lg">{lang.flag}</span>
              <span className="flex-1">{lang.name}</span>
              {language === lang.code && (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
      
      {/* Close dropdown when clicking outside */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
