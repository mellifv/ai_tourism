import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import VideoGuides from "./pages/VideoGuides";
import Itineraries from "./pages/Itineraries";
import CityInsights from "./pages/CityInsights";
import Login from "./components/Login"; // ← Add this import
import Registration from "./components/Registration"; // ← Add this import
import Nav from "./components/Nav";

function AppContent() {
  const location = useLocation();
  
  // Show Nav on ALL pages EXCEPT Itineraries
  const showNav = !location.pathname.startsWith("/itineraries");
  
  return (
    <>
      {showNav && <Nav />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/videos" element={<VideoGuides />} />
        <Route path="/itineraries" element={<Itineraries />} />
        <Route path="/insights" element={<CityInsights />} />
        {/* ADD THESE TWO ROUTES: */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
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
