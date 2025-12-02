import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import VideoGuides from "./pages/VideoGuides";
import Itineraries from "./pages/Itineraries";
import CityInsights from "./pages/CityInsights";
import Nav from "./components/Nav";
import { LanguageProvider } from "./context/LanguageContext";

// Create a wrapper component to conditionally show Nav
function AppContent() {
  const location = useLocation();
  
  // Show Nav on Home and VideoGuides only
  // (NOT on Itineraries or CityInsights)
  const showNav = location.pathname === "/" || location.pathname === "/videos";
  
  return (
    <>
      {showNav && <Nav />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/videos" element={<VideoGuides />} />
        <Route path="/itineraries" element={<Itineraries />} />
        <Route path="/insights" element={<CityInsights />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <Router>
        <AppContent />
      </Router>
    </LanguageProvider>
  );
}
