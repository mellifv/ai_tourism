import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import VideoGuides from "./pages/VideoGuides";
import Itineraries from "./pages/Itineraries";
import CityInsights from "./pages/CityInsights";
import Nav from "./components/Nav";
// Remove LanguageProvider import from here since it's already in main.jsx

function AppContent() {
  const location = useLocation();
  
  // Show Nav on Home and VideoGuides only
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
    // Remove LanguageProvider wrapper here
    <Router>
      <AppContent />
    </Router>
  );
}
