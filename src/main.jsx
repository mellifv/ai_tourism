import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/globals.css';
import { LanguageProvider } from './context/LanguageContext';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* ✅ WRAP App with LanguageProvider */}
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </React.StrictMode>
);
