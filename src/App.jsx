import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import VideoGuides from "./pages/VideoGuides";
import Itineraries from "./pages/Itineraries";
import CityInsights from "./pages/CityInsights";
import Nav from "./components/Nav";
import { LanguageProvider } from "./context/LanguageContext";

export default function App() {
  return (
    <LanguageProvider>
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
