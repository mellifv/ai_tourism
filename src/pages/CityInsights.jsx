import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import ThreeScene from '../components/ThreeScene';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSelect from '../components/LanguageSelect';

// Leaflet marker fix omitted for brevity...
// Custom icon and touristPlaces array remain the same

const CityInsights = () => {
  const { t } = useLanguage();
  const [selectedPlace, setSelectedPlace] = useState(null);

  const handleGetDirections = (placeName) => {
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(placeName + ' Astana, Kazakhstan')}`;
    window.open(mapsUrl, '_blank');
  };

  return (
    <div className="min-h-screen text-white bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <div className="fixed top-4 right-4 z-50">
        <LanguageSelect />
      </div>

      <motion.img
        src="/kazakh_guide.png"
        alt="Kazakh Guide"
        initial={{ y: -10, opacity: 1 }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
        className="fixed top-9 left-4 w-24 md:w-28 drop-shadow-xl pointer-events-none select-none z-50"
      />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 heading-font">{t.cityInsights}</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">{t.discover}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 h-[600px]">
              <h2 className="text-2xl font-bold mb-6 text-center">{t.interactiveMap}</h2>
              <MapContainer center={[51.1694, 71.4491]} zoom={12} style={{ height: '90%', width: '100%', borderRadius: '10px' }} className="z-0">
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
                {touristPlaces.map((place) => (
                  <Marker key={place.id} position={place.position} icon={customIcon} eventHandlers={{ click: () => setSelectedPlace(place) }}>
                    <Popup>
                      <div className="text-black">
                        <h3 className="font-bold text-lg">{place.name}</h3>
                        <p className="text-sm">{place.description}</p>
                        <button onClick={() => handleGetDirections(place.name)} className="mt-2 bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600">
                          {t.getDirections}
                        </button>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </motion.div>
          </div>

          {/* Character and Info Section */}
          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold mb-4 text-center">{t.yourGuide}</h3>
              <div className="flex justify-center items-center h-64"><ThreeScene /></div>
              <motion.p className="text-center mt-4 text-slate-300 italic" animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 2, repeat: Infinity }}>
                {t.exploreWithMe}
              </motion.p>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold mb-4">{selectedPlace ? selectedPlace.name : t.selectLocation}</h3>
              {selectedPlace ? (
                <motion.div key={selectedPlace.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <p className="text-slate-300 mb-3">{selectedPlace.description}</p>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-slate-400">{t.hours}:</span>
                      <span className="text-white">{selectedPlace.hours}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">{t.entryPrice}:</span>
                      <span className="text-green-300">{selectedPlace.price}</span>
                    </div>
                  </div>
                  <button onClick={() => handleGetDirections(selectedPlace.name)} className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold py-2 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                    {t.getDirections} ↗
                  </button>
                </motion.div>
              ) : (
                <p className="text-slate-400 text-center py-8">Click on any marker on the map to see details</p>
              )}
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold mb-4">{t.travelTips}</h3>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-center gap-2"><span className="text-green-400">✓</span>{t.bestTime}</li>
                <li className="flex items-center gap-2"><span className="text-green-400">✓</span>{t.tryCuisine}</li>
                <li className="flex items-center gap-2"><span className="text-green-400">✓</span>{t.useTransport}</li>
                <li className="flex items-center gap-2"><span className="text-green-400">✓</span>{t.englishSpoken}</li>
                <li className="flex items-center gap-2"><span className="text-green-400">✓</span>{t.nightIllumination}</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityInsights;
