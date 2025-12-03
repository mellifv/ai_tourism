import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import VideoGuides from "./pages/VideoGuides";
import Itineraries from "./pages/Itineraries";
import CityInsights from "./pages/CityInsights";
import Nav from "./components/Nav";

function AppContent() {
  const location = useLocation();
  
  const showNav = location.pathname === "/" || location.pathname === "/videos" || location.pathname === "/insights";
  
  return (
    <>
      {showNav && <Nav />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/videos" element={<VideoGuides />} />
        <Route path="/itineraries" element={<Itineraries />} />
        <Route path="/insights" element={<CityInsights />} />
        {/* Add this catch-all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
