// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext"; // Add this
import Home from "./pages/Home";
import VideoGuides from "./pages/VideoGuides";
import Nav from "./components/Nav";
import Itineraries from "./pages/Itineraries";
import CityInsights from "./pages/CityInsights";

export default function App() {
  return (
    <LanguageProvider> {/* Wrap everything with LanguageProvider */}
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/videos" element={<VideoGuides />} />
          <Route path="/itineraries" element={<Itineraries />} />
          <Route path="/insights" element={<CityInsights />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}
