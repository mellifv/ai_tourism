// src/pages/CityInsights.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Nav from '../components/Nav';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import ThreeScene from '../components/ThreeScene'; // Import the 3D component
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icon for tourist places
const customIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Tourist places data
const touristPlaces = [
  { id: 1, name: 'Bayterek Tower', position: [51.1283, 71.4305], description: 'Iconic monument and observation tower offering panoramic city views', type: 'landmark', hours: '10:00 AM - 9:00 PM', price: '2,000₸' },
  { id: 2, name: 'Khan Shatyr', position: [51.1242, 71.4300], description: 'Giant transparent tent with shopping, entertainment and beach resort', type: 'shopping', hours: '10:00 AM - 10:00 PM', price: 'Free entry' },
  { id: 3, name: 'Nur-Astana Mosque', position: [51.1469, 71.4111], description: 'One of the largest mosques in Central Asia with stunning architecture', type: 'religious', hours: '5:00 AM - 10:00 PM', price: 'Free' },
  { id: 4, name: 'EXPO 2017', position: [51.0914, 71.4169], description: 'Futuristic expo center and energy museum with interactive exhibits', type: 'cultural', hours: '10:00 AM - 8:00 PM', price: '1,500₸' },
  { id: 5, name: 'National Museum', position: [51.1475, 71.4736], description: 'Museum of Kazakh history, culture, and modern art exhibitions', type: 'museum', hours: '10:00 AM - 6:00 PM', price: '1,000₸' },
  { id: 6, name: 'Ishim River Embankment', position: [51.1500, 71.4400], description: 'Scenic river with walking paths, bridges and boat tours', type: 'nature', hours: '24/7', price: 'Free' },
  { id: 7, name: 'Nurly Zhol Boulevard', position: [51.1386, 71.4133], description: 'Modern pedestrian boulevard with fountains and city landmarks', type: 'park', hours: '24/7', price: 'Free' },
  { id: 8, name: 'Astana Opera', position: [51.1428, 71.4192], description: 'World-class opera and ballet theater with magnificent architecture', type: 'cultural', hours: '10:00 AM - 7:00 PM', price: 'From 3,000₸' }
];

const CityInsights = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);

  const handleGetDirections = (placeName) => {
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(placeName + ' Astana, Kazakhstan')}`;
    window.open(mapsUrl, '_blank');
  };

  return (
    <div className="min-h-screen text-white bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      {/* Floating Guide Character (Top-Left) */}
        <motion.img
          src="/kazakh_guide.png"
          alt="Kazakh Guide"
          initial={{ y: -10, opacity: 1 }}
          animate={{ y: [0, -8, 0] }}  // no opacity animation
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut"
          }}
          className="
            fixed 
            top-9 
            left-4 
            w-24 
            md:w-28 
            drop-shadow-xl 
            pointer-events-none 
            select-none
            z-50
          "
        />


      <div className="max-w-7xl mx-auto px-6 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 heading-font">Astana City Insights</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">Discover the best tourist spots with our interactive map and friendly Kazakh guide</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 h-[600px]">
              <h2 className="text-2xl font-bold mb-6 text-center">Interactive Astana Map</h2>
              <MapContainer center={[51.1694, 71.4491]} zoom={12} style={{ height: '90%', width: '100%', borderRadius: '10px' }} className="z-0">
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {touristPlaces.map((place) => (
                  <Marker key={place.id} position={place.position} icon={customIcon} eventHandlers={{ click: () => setSelectedPlace(place) }}>
                    <Popup>
                      <div className="text-black">
                        <h3 className="font-bold text-lg">{place.name}</h3>
                        <p className="text-sm">{place.description}</p>
                        <button onClick={() => handleGetDirections(place.name)} className="mt-2 bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600">
                          Get Directions
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
            {/* 3D Kazakh Character */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
            >
              <h3 className="text-xl font-bold mb-4 text-center">Your Kazakh Guide</h3>
              <div className="flex justify-center items-center h-64">
                <ThreeScene />
              </div>
              <motion.p 
                className="text-center mt-4 text-slate-300 italic"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                "Sálem! Explore Astana with me!"
              </motion.p>
            </motion.div>

            {/* Place Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
            >
              <h3 className="text-xl font-bold mb-4">
                {selectedPlace ? selectedPlace.name : 'Select a Location'}
              </h3>
              
              {selectedPlace ? (
                <motion.div
                  key={selectedPlace.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <p className="text-slate-300 mb-3">{selectedPlace.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Hours:</span>
                      <span className="text-white">{selectedPlace.hours}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Entry Price:</span>
                      <span className="text-green-300">{selectedPlace.price}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <span className={`px-2 py-1 rounded text-xs ${
                      selectedPlace.type === 'landmark' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' :
                      selectedPlace.type === 'cultural' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' :
                      selectedPlace.type === 'museum' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                      selectedPlace.type === 'nature' ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
                      selectedPlace.type === 'shopping' ? 'bg-red-500/20 text-red-300 border border-red-500/30' :
                      'bg-gray-500/20 text-gray-300 border border-gray-500/30'
                    }`}>
                      {selectedPlace.type.toUpperCase()}
                    </span>
                  </div>
                  
                  <button 
                    onClick={() => handleGetDirections(selectedPlace.name)}
                    className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold py-2 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                  >
                    Get Directions ↗
                  </button>
                </motion.div>
              ) : (
                <p className="text-slate-400 text-center py-8">
                  Click on any marker on the map to see details
                </p>
              )}
            </motion.div>

            {/* Quick Tips */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
            >
              <h3 className="text-xl font-bold mb-4">Travel Tips</h3>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  Best time to visit: May to September
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  Try traditional Kazakh cuisine
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  Use public transport - it's efficient
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  English is widely spoken in tourist areas
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  Don't miss the night illumination
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