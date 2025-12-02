import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import ThreeScene from '../components/ThreeScene';
import LanguageSelector from '../components/LanguageSelector';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useLanguage } from '../context/LanguageContext';

// Fix for Leaflet icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const customIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const touristPlaces = [
  {
    id: 1,
    name: "Bayterek Tower",
    description: "Iconic monument and observation tower offering panoramic views of Astana",
    position: [51.1282, 71.4305],
    hours: "10:00 AM - 9:00 PM",
    price: "700₸"
  },
  {
    id: 2,
    name: "Khan Shatyr",
    description: "Giant transparent tent housing a shopping and entertainment center",
    position: [51.1471, 71.4278],
    hours: "10:00 AM - 10:00 PM",
    price: "Free entry"
  },
  {
    id: 3,
    name: "Nur-Astana Mosque",
    description: "One of the largest mosques in Central Asia with stunning architecture",
    position: [51.1268, 71.4170],
    hours: "Open 24/7 for visitors",
    price: "Free entry"
  },
  {
    id: 4,
    name: "National Museum of Kazakhstan",
    description: "World-class museum showcasing Kazakhstan's history and culture",
    position: [51.0989, 71.4074],
    hours: "10:00 AM - 6:00 PM",
    price: "1500₸"
  },
  {
    id: 5,
    name: "Astana Opera",
    description: "Magnificent opera house with world-class performances",
    position: [51.1236, 71.4383],
    hours: "Box office: 10:00 AM - 7:00 PM",
    price: "2000-15000₸"
  },
  {
    id: 6,
    name: "Palace of Peace and Reconciliation",
    description: "Pyramid-shaped palace hosting the Congress of World Religions",
    position: [51.1296, 71.4385],
    hours: "9:00 AM - 6:00 PM",
    price: "1000₸"
  },
  {
    id: 7,
    name: "Abu Dhabi Plaza",
    description: "Tallest building in Central Asia with shopping and observation deck",
    position: [51.1391, 71.4136],
    hours: "10:00 AM - 10:00 PM",
    price: "Free entry (mall)"
  },
  {
    id: 8,
    name: "Atameken Ethno-Memorial Map",
    description: "Outdoor park featuring miniature landmarks of Kazakhstan",
    position: [51.1265, 71.4481],
    hours: "10:00 AM - 8:00 PM",
    price: "500₸"
  },
  {
    id: 9,
    name: "Kazakhstan Central Concert Hall",
    description: "Modern concert venue shaped like a flower",
    position: [51.0901, 71.4139],
    hours: "Box office: 10:00 AM - 7:00 PM",
    price: "1500-5000₸"
  },
  {
    id: 10,
    name: "Astana Ballet",
    description: "State-of-the-art ballet theater with innovative performances",
    position: [51.1187, 71.4210],
    hours: "Box office: 10:00 AM - 7:00 PM",
    price: "2000-10000₸"
  }
];

const CityInsights = () => {
  const { t } = useLanguage();
  const [selectedPlace, setSelectedPlace] = useState(null);

  const handleGetDirections = (placeName) => {
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(placeName + ' Astana, Kazakhstan')}`;
    window.open(mapsUrl, '_blank');
  };

  return (
    <div className="min-h-screen text-white bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">


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
          <h1 className="text-4xl md:text-6xl font-bold mb-4 heading-font">{t('cityInsights.title', 'Astana City Insights')}</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            {t('cityInsights.subtitle', 'Discover the hidden gems and must-visit spots in Kazakhstan\'s capital')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 h-[600px]">
              <h2 className="text-2xl font-bold mb-6 text-center">
                {t('cityInsights.interactiveMap', 'Interactive City Map')}
              </h2>
              <MapContainer center={[51.1694, 71.4491]} zoom={12} style={{ height: '90%', width: '100%', borderRadius: '10px' }} className="z-0">
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
                {touristPlaces.map((place) => (
                  <Marker key={place.id} position={place.position} icon={customIcon} eventHandlers={{ click: () => setSelectedPlace(place) }}>
                    <Popup>
                      <div className="text-black">
                        <h3 className="font-bold text-lg">{place.name}</h3>
                        <p className="text-sm">{place.description}</p>
                        <button 
                          onClick={() => handleGetDirections(place.name)} 
                          className="mt-2 bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                        >
                          {t('cityInsights.getDirections', 'Get Directions')}
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
              <h3 className="text-xl font-bold mb-4 text-center">
                {t('cityInsights.yourGuide', 'Your AI Guide')}
              </h3>
              <div className="flex justify-center items-center h-64">
                <ThreeScene />
              </div>
              <motion.p 
                className="text-center mt-4 text-slate-300 italic" 
                animate={{ opacity: [0.7, 1, 0.7] }} 
                transition={{ duration: 2, repeat: Infinity }}
              >
                {t('cityInsights.exploreWithMe', 'Explore Astana with me!')}
              </motion.p>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold mb-4">
                {selectedPlace ? selectedPlace.name : t('cityInsights.selectLocation', 'Select a Location')}
              </h3>
              {selectedPlace ? (
                <motion.div key={selectedPlace.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <p className="text-slate-300 mb-3">{selectedPlace.description}</p>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-slate-400">{t('cityInsights.hours', 'Opening Hours')}:</span>
                      <span className="text-white">{selectedPlace.hours}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">{t('cityInsights.entryPrice', 'Entry Price')}:</span>
                      <span className="text-green-300">{selectedPlace.price}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleGetDirections(selectedPlace.name)} 
                    className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold py-2 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                  >
                    {t('cityInsights.getDirections', 'Get Directions')} ↗
                  </button>
                </motion.div>
              ) : (
                <p className="text-slate-400 text-center py-8">
                  {t('cityInsights.clickMarker', 'Click on any marker on the map to see details')}
                </p>
              )}
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold mb-4">{t('cityInsights.travelTips', 'Travel Tips')}</h3>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  {t('cityInsights.bestTime', 'Best time to visit: May-September for pleasant weather')}
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  {t('cityInsights.tryCuisine', 'Try traditional Kazakh cuisine: beshbarmak, kazy, baursak')}
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  {t('cityInsights.useTransport', 'Use the Astana LRT (Light Rail) for efficient travel')}
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  {t('cityInsights.englishSpoken', 'English is widely spoken in tourist areas')}
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  {t('cityInsights.nightIllumination', 'Visit landmarks at night for spectacular illumination')}
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityInsights;
