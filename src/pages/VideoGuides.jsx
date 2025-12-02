// src/pages/VideoGuides.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, MapPin, Clock, Train, Bus, Car, Footprints, Navigation, Smartphone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
const { t } = useLanguage();
export default function VideoGuides() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const categories = [
    { id: 'all', name: 'All Guides', icon: '🧭', color: 'from-blue-400 to-cyan-400' },
    { id: 'public', name: 'Public Transport', icon: '🚌', color: 'from-green-400 to-emerald-400' },
    { id: 'walking', name: 'Walking Routes', icon: '🚶', color: 'from-purple-400 to-pink-400' },
    { id: 'driving', name: 'Driving', icon: '🚗', color: 'from-orange-400 to-red-400' },
    { id: 'culture', name: 'Culture', icon: '🎭', color: 'from-amber-400 to-orange-400' }, // New Culture category
  ];

  const guides = [
    {
      id: 1,
      title: "Abu Dhabi Plaza Route",
      description: "Smart navigation to the city's tallest building with shopping and dining",
      category: 'public',
      duration: "0:38",
      transport: ['bus', 'walking'],
      landmarks: ["Abu Dhabi Plaza", "Observation Deck", "Luxury Mall"],
      difficulty: "Easy",
      aiTip: "Visit the observation deck at sunset for panoramic city views",
      estimatedTime: "30 min",
      cost: "110₸",
      videoPublicId: "AbuDhaby_tfvpi9"
    },
    {
      id: 2,
      title: "Atyrau Bridge - Central Park Access",
      description: "Scenic routes to the iconic pedestrian bridge with park connections",
      category: 'public',
      duration: "0:45",
      transport: ['bus', 'walking'],
      landmarks: ["Atyrau Bridge", "Central Park", "Fountain Square"],
      difficulty: "Easy",
      aiTip: "Best photos from the southeast corner during golden hour - perfect for silhouette shots against the city skyline",
      estimatedTime: "25 min",
      cost: "110₸",
      videoPublicId: "AtyrauBridge_i99y9q"
    },
    // CULTURE VIDEOS - 4 cultural guides
    {
      id: 3,
      title: "Astana Opera & Philharmonic",
      description: "Cultural tour of Astana's premier music venues and performing arts centers",
      category: 'culture',
      duration: "4:20",
      transport: ['walking', 'taxi'],
      landmarks: ["Astana Opera House", "Kazakhstan National Philharmonic", "Abai Square"],
      difficulty: "Easy",
      aiTip: "Check performance schedules in advance and dress smart-casual for evening shows",
      estimatedTime: "3-4 hours",
      cost: "5,000-15,000₸ (depending on show tickets)",
      videoPublicId: "Мерейка_филармони_gv4pyu"
    },
    {
      id: 4,
      title: "Traditional Kazakh Baursak",
      description: "Try Kazakh baursak - delicious fried dough pastry",
      category: 'culture',
      duration: "3:45",
      landmarks: ["Traditional Kitchen", "Local Market", "Cooking Workshop"],
      aiTip: "Serve baursak warm with kaymak (clotted cream) and homemade jam for the authentic Kazakh tea experience",
      cost: "2,000-5,000₸ (ingredients)",
      videoPublicId: "Лаура_бауырсак_uo5kbu",
      transport: ['walking'], // default transport
      difficulty: "Easy", // default difficulty
      estimatedTime: "1-2 hours" // default time
    },
    {
      id: 5,
      title: "Traditional Kazakh Kurt",
      description: "Discover kurt - traditional dried cheese balls, a staple of nomadic cuisine",
      category: 'culture',
      duration: "4:20",
      transport: ['walking', 'taxi'],
      landmarks: ["Traditional Yurt", "Dairy Workshop", "Nomadic Heritage Site"],
      difficulty: "Easy",
      aiTip: "Kurt is perfect for long journeys - it's lightweight, nutritious and doesn't spoil. Crumble it into soups or enjoy as a snack with tea",
      estimatedTime: "1-2 hours",
      cost: "1,000-3,000₸",
      videoPublicId: "Мерейка_Курт_xa1miu"
    },
    {
      id: 6,
      title: "Traditional Kazakh Kokpar",
      description: "Experience kokpar - exciting traditional horseback game with deep nomadic roots",
      category: 'culture',
      duration: "5:15",
      transport: ['car', 'taxi'],
      landmarks: ["Equestrian Center", "Traditional Arena", "Horse Stables"],
      difficulty: "Medium",
      aiTip: "Best viewed during national holidays and festivals. Arrive early to get good seating and watch the pre-game ceremonies",
      estimatedTime: "2-3 hours",
      cost: "Free to watch (tournaments may have ticket fees)",
      videoPublicId: "Kokpar_tart9k"
    },
    // Other existing guides
    {
      id: 7,
      title: "Traditional Kazakh Asyk Game",
      description: "Play asyk - ancient bone throwing game popular among Kazakh nomads",
      category: 'culture',
      duration: "2:30",
      transport: ['walking'],
      landmarks: ["Traditional Playground", "Cultural Center", "Outdoor Game Area"],
      difficulty: "Easy",
      aiTip: "Perfect for family gatherings and celebrations. The game improves hand-eye coordination and is enjoyed by all ages",
      estimatedTime: "30-60 minutes",
      cost: "500-2,000₸ (asyk set)",
      videoPublicId: "Asyk_game_crtokp"
    },
    {
      id: 8,
      title: "AULA Cafe & Historic Center",
      description: "Charming cafe experience combined with historic landmarks walk",
      category: 'cafe',
      duration: "3:45",
      transport: ['walking'],
      landmarks: ["AULA Cafe", "Bayterek Tower", "Presidential Park", "Kazakhstan History Museum"],
      difficulty: "Easy",
      aiTip: "Visit AULA Cafe in the afternoon for the best coffee and pastries, then enjoy sunset views from Bayterek",
      estimatedTime: "2-3 hours",
      cost: "4,000-8,000₸",
      videoPublicId: "Aula_cafe_dawcgs"
    },
    {
      id: 9,
      title: "Astana Light Rail Transit Tour",
      description: "Efficient city exploration using Astana's modern light rail system",
      category: 'transit',
      duration: "5:30",
      transport: ['light-rail', 'walking'],
      landmarks: ["Light Rail Stations", "Nurly Zhol Station", "Bayterek Tower Station", "EXPO Station"],
      difficulty: "Easy",
      aiTip: "Use the LRT during off-peak hours (10AM-4PM) for the most comfortable ride and best photo opportunities",
      estimatedTime: "4-5 hours",
      cost: "500₸ (LRT day pass)",
      videoPublicId: "tutorial_q0crmk"
    },
    {
      id: 10,
      title: "Astana Circus & Entertainment District",
      description: "Family-friendly entertainment featuring the stunning Astana Circus building and surrounding attractions",
      category: 'entertainment',
      duration: "4:15",
      transport: ['walking', 'taxi', 'bus'],
      landmarks: ["Astana Circus", "Circus Fountain Square", "Entertainment District", "Family Park"],
      difficulty: "Easy",
      aiTip: "Check the circus schedule for matinee shows - perfect for families with children and better pricing",
      estimatedTime: "3-4 hours",
      cost: "2,000-5,000₸ (show tickets)",
      videoPublicId: "tutorialDilnaz_hsxqky"
    },
    {
      id: 11,
      title: "National Museum of Kazakhstan",
      description: "Explore Kazakhstan's rich history and cultural heritage in the magnificent National Museum",
      category: 'public',
      duration: "4:15",
      transport: ['walking', 'metro'],
      landmarks: ["National Museum", "Bayterek Tower", "Independence Square"],
      difficulty: "Easy",
      aiTip: "Visit on weekdays to avoid crowds and take advantage of free guided tours at 11AM and 3PM. Don't miss the Hall of Gold on the 3rd floor",
      estimatedTime: "2-3 hours",
      cost: "1,500₸ (adult ticket)",
      videoPublicId: "1763065230261842_bfpmue"
    },
    {
      id: 12,
      title: "Ailand Astana",
      description: "Visit Ailand - exciting indoor entertainment and amusement center in Astana",
      category: 'culture',
      duration: "3:50",
      transport: ['bus', 'taxi', 'walking'],
      landmarks: ["Ailand Entertainment Center", "Indoor Rides", "Game Zones", "Food Court"],
      difficulty: "Easy",
      aiTip: "Perfect for families with children. Visit during weekdays for shorter queues and check their website for special family package deals",
      estimatedTime: "3-4 hours",
      cost: "5,000-15,000₸ (depending on activities)",
      videoPublicId: "Ailand_fp5jkk"
    }
  ];

  const filteredGuides = selectedCategory === 'all' 
    ? guides 
    : guides.filter(guide => guide.category === selectedCategory);

  const getTransportIcon = (transport) => {
    const icons = {
      metro: <Train className="w-4 h-4" />,
      bus: <Bus className="w-4 h-4" />,
      car: <Car className="w-4 h-4" />,
      walking: <Footprints className="w-4 h-4" />,
      'light-rail': <Train className="w-4 h-4" />,
      taxi: <Car className="w-4 h-4" />,
    };
    return icons[transport] || <Navigation className="w-4 h-4" />;
  };

  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
  };

  const handleVideoEnd = () => {
    setIsVideoPlaying(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Header with Solid Blue Box */}
      <div className="relative overflow-hidden bg-white py-20">
        {/* Solid blue background box */}
        <motion.div
          className="absolute inset-0 max-w-5xl mx-auto px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-500 rounded-3xl border border-blue-400/40 shadow-lg" />
        </motion.div>

        {/* Animated accent blobs inside box */}
        <motion.div
          className="absolute top-10 -right-20 w-64 h-64 rounded-full blur-3xl opacity-20"
          style={{ background: "linear-gradient(135deg, #06b6d4, #3b82f6)" }}
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full blur-3xl opacity-15"
          style={{ background: "linear-gradient(135deg, #a78bfa, #f472b6)" }}
          animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
        />

        <div className="relative px-6 text-center max-w-5xl mx-auto z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="heading-font text-5xl md:text-6xl font-extrabold leading-tight mb-4 text-white"
          >
            Smart{' '}
            <span className="text-cyan-200">Navigation</span>
            <br />
            <span className="text-blue-100">Guides for Astana</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-blue-50 max-w-2xl mx-auto"
          >
            AI-powered route planning with real-time insights, optimal paths, and local tips to make your journey seamless
          </motion.p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <motion.div 
          layout
          className="flex flex-wrap justify-center gap-4"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                selectedCategory === category.id 
                  ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span className="text-lg mr-2">{category.icon}</span>
              {category.name}
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Guides Grid - Proper Equal-Sized Cards */}
      <div className="max-w-6xl mx-auto px-6 pb-20">
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max"
        >
          <AnimatePresence>
            {filteredGuides.map((guide, index) => (
              <motion.div
                key={guide.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                className="group cursor-pointer h-full"
                onClick={() => setSelectedGuide(guide)}
              >
                <div className="glass rounded-2xl overflow-hidden h-full flex flex-col bg-white/80 border border-slate-200/50 hover:border-blue-200 transition-all duration-300">
                  {/* Video Thumbnail */}
                  <div className="relative h-48 bg-slate-100 flex items-center justify-center overflow-hidden rounded-t-2xl">
                    {guide.videoPublicId ? (
                      <>
                        {/* Cloudinary video thumbnail */}
                        <img 
                          src={`https://res.cloudinary.com/djwoojdrl/video/upload/c_thumb,w_400,h_225,g_auto/${guide.videoPublicId}.jpg`}
                          alt={guide.title}
                          className="w-full h-full object-cover"
                        />
                        {/* Play button overlay */}
                        <motion.div
                          className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                          whileHover={{ scale: 1.05 }}
                        >
                          <div className="bg-white/90 rounded-full p-4 shadow-lg transform group-hover:scale-110 transition-transform">
                            <Play className="w-6 h-6 text-blue-600 fill-blue-600" />
                          </div>
                        </motion.div>
                      </>
                    ) : (
                      // Fallback if no video
                      <div className="w-full h-full bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center">
                        <div className="text-center text-slate-400">
                          <Play className="w-8 h-8 mx-auto mb-2" />
                          <div className="text-xs font-medium">Video Coming Soon</div>
                        </div>
                      </div>
                    )}
                    
                    <div className="absolute top-3 right-3 flex items-center gap-1 px-3 py-1 bg-black/70 rounded-full text-xs font-semibold text-white shadow-sm">
                      <Clock className="w-3 h-3" />
                      {guide.duration}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex-grow flex flex-col">
                    <h3 className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors mb-2 line-clamp-2">
                      {guide.title}
                    </h3>
                    <p className="text-xs text-slate-600 mb-3 line-clamp-2">
                      {guide.description}
                    </p>

                    {/* Transport badges */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {guide.transport.map((transport) => (
                        <div key={transport} className="flex items-center gap-1 px-2 py-1 bg-slate-100 rounded-full text-xs text-slate-700">
                          {getTransportIcon(transport)}
                          <span className="capitalize">{transport}</span>
                        </div>
                      ))}
                    </div>

                    {/* Landmarks */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {guide.landmarks.map((landmark, idx) => (
                        <span key={idx} className="inline-flex items-center gap-0.5 px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium border border-blue-200">
                          <MapPin className="w-3 h-3" />
                          {landmark}
                        </span>
                      ))}
                    </div>

                    {/* AI Tip */}
                    <div className="p-2.5 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg border border-cyan-200 mb-3 flex-grow">
                      <div className="flex items-start gap-2">
                        <Smartphone className="w-3 h-3 text-cyan-600 mt-0.5 flex-shrink-0" />
                        <div className="text-xs text-cyan-700">
                          <div className="font-semibold mb-0.5">AI TIP</div>
                          <div>{guide.aiTip}</div>
                        </div>
                      </div>
                    </div>

                    {/* Stats Footer */}
                    <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                      <div className="flex gap-2 flex-wrap">
                        <div className="text-xs text-slate-600">
                          <div className="font-semibold text-slate-800">{guide.estimatedTime}</div>
                        </div>
                        <div className="text-xs text-slate-600">
                          <div className="font-semibold text-slate-800">{guide.cost}</div>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        guide.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                        guide.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {guide.difficulty}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Guide Detail Modal */}
      <AnimatePresence>
        {selectedGuide && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => {
              setSelectedGuide(null);
              setIsVideoPlaying(false);
            }}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl bg-gradient-to-br from-blue-50 via-white to-cyan-50/30 border border-blue-200/50"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Cloudinary Video Player */}
              <div className="relative w-full h-64 bg-black rounded-t-3xl overflow-hidden">
                {!isVideoPlaying ? (
                  // Video thumbnail with play button
                  <div 
                    className="absolute inset-0 flex items-center justify-center cursor-pointer bg-cover bg-center"
                    style={{ 
                      backgroundImage: `url(https://res.cloudinary.com/djwoojdrl/video/upload/c_thumb,w_800,h_450,g_auto/${selectedGuide.videoPublicId}.jpg)` 
                    }}
                    onClick={handleVideoPlay}
                  >
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="relative text-center z-10">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="bg-white/20 backdrop-blur-md rounded-full p-6 w-fit mx-auto mb-4 border border-white/30"
                      >
                        <Play className="w-16 h-16 text-white fill-white mx-auto" />
                      </motion.div>
                      <div className="text-sm font-semibold text-white drop-shadow-lg">Click to Play Video Guide</div>
                    </div>
                  </div>
                ) : (
                  // Actual Cloudinary video with quality optimization
                  <video
                    className="w-full h-full object-cover"
                    controls
                    autoPlay
                    onEnded={handleVideoEnd}
                    onPause={() => setIsVideoPlaying(false)}
                  >
                    <source 
                      src={`https://res.cloudinary.com/djwoojdrl/video/upload/q_auto:best/${selectedGuide.videoPublicId}.mp4`} 
                      type="video/mp4" 
                    />
                    Your browser does not support the video tag.
                  </video>
                )}
                
                {/* Video duration badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1 px-3 py-1 bg-black/70 rounded-full text-xs font-semibold text-white shadow-lg">
                  <Clock className="w-3 h-3" />
                  {selectedGuide.duration}
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-cyan-600 bg-clip-text text-transparent mb-2">
                      {selectedGuide.title}
                    </h2>
                    <p className="text-slate-600">{selectedGuide.description}</p>
                  </div>
                  <button 
                    className="text-slate-400 hover:text-blue-600 transition-colors text-2xl flex-shrink-0"
                    onClick={() => {
                      setSelectedGuide(null);
                      setIsVideoPlaying(false);
                    }}
                  >
                    ×
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Details Grid with Blue Accents */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-lg border border-blue-200/30">
                      <div className="text-xs text-blue-600 mb-1 font-semibold">Time</div>
                      <div className="font-semibold text-slate-800">{selectedGuide.estimatedTime}</div>
                    </div>
                    <div className="p-3 bg-gradient-to-br from-cyan-50 to-cyan-100/50 rounded-lg border border-cyan-200/30">
                      <div className="text-xs text-cyan-600 mb-1 font-semibold">Cost</div>
                      <div className="font-semibold text-slate-800">{selectedGuide.cost}</div>
                    </div>
                    <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-lg border border-blue-200/30">
                      <div className="text-xs text-blue-600 mb-1 font-semibold">Difficulty</div>
                      <div className="font-semibold text-slate-800">{selectedGuide.difficulty}</div>
                    </div>
                  </div>

                  {/* Transport with Blue Theme */}
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-2">🚌 Transport Options</h4>
                    <div className="flex gap-2 flex-wrap">
                      {selectedGuide.transport.map((transport) => (
                        <div key={transport} className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full text-blue-700 text-sm font-medium border border-blue-200/50">
                          {getTransportIcon(transport)}
                          <span className="capitalize">{transport}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Landmarks with Blue Theme */}
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-2">📍 Landmarks</h4>
                    <div className="flex gap-2 flex-wrap">
                      {selectedGuide.landmarks.map((landmark, idx) => (
                        <span key={idx} className="flex items-center gap-1 px-3 py-2 bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-300/50">
                          <MapPin className="w-4 h-4" />
                          {landmark}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* AI Insight with Enhanced Blue Gradient */}
                  <div className="p-4 bg-gradient-to-r from-blue-100 via-cyan-50 to-blue-50 rounded-lg border border-blue-300/50 shadow-sm">
                    <div className="flex items-start gap-3">
                      <Smartphone className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-blue-700 mb-1">💡 AI INSIGHT</div>
                        <div className="text-blue-700 text-sm">{selectedGuide.aiTip}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
