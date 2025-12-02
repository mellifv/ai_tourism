// src/pages/VideoGuides.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, MapPin, Clock, Train, Bus, Car, Footprints, Navigation, Smartphone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function VideoGuides() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const categories = [
    { id: 'all', name: t('categories.allGuides', 'All Guides'), icon: '🧭', color: 'from-blue-400 to-cyan-400' },
    { id: 'public', name: t('categories.publicTransport', 'Public Transport'), icon: '🚌', color: 'from-green-400 to-emerald-400' },
    { id: 'walking', name: t('categories.walkingRoutes', 'Walking Routes'), icon: '🚶', color: 'from-purple-400 to-pink-400' },
    { id: 'driving', name: t('categories.driving', 'Driving'), icon: '🚗', color: 'from-orange-400 to-red-400' },
    { id: 'culture', name: t('categories.culture', 'Culture'), icon: '🎭', color: 'from-amber-400 to-orange-400' },
  ];

  const guides = [
    {
      id: 1,
      title: t('guides.abuDhabi.title', 'Abu Dhabi Plaza Navigation'),
      description: t('guides.abuDhabi.description', 'How to navigate the largest mall in Central Asia'),
      category: 'public',
      duration: "0:38",
      transport: ['bus', 'walking'],
      landmarks: [
        t('guides.abuDhabi.landmarks.0', 'Main Entrance'),
        t('guides.abuDhabi.landmarks.1', 'Food Court'),
        t('guides.abuDhabi.landmarks.2', 'Cinema')
      ],
      difficulty: "Easy",
      aiTip: t('guides.abuDhabi.aiTip', 'Visit during weekdays to avoid crowds'),
      estimatedTime: "30 min",
      cost: "110₸",
      videoPublicId: "AbuDhaby_tfvpi9"
    },
    // Add more guides here following the same structure
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
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-cyan-500 py-20">
        <div className="relative px-6 text-center max-w-5xl mx-auto z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="heading-font text-5xl md:text-6xl font-extrabold leading-tight mb-4 text-white"
          >
            {t('videoGuides.hero.title', 'Astana Video Guides')} <br />
            <span className="text-cyan-200">{t('videoGuides.hero.subtitle', 'See Before You Go')}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-blue-50 max-w-2xl mx-auto"
          >
            {t('videoGuides.hero.description', 'Visual guides to navigate Astana like a local')}
          </motion.p>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <motion.div layout className="flex flex-wrap justify-center gap-4">
          {categories.map(category => (
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

      {/* Guides Grid */}
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
                        <img 
                          src={`https://res.cloudinary.com/djwoojdrl/video/upload/c_thumb,w_400,h_225,g_auto/${guide.videoPublicId}.jpg`}
                          alt={guide.title}
                          className="w-full h-full object-cover"
                        />
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
                  {/* Details Grid */}
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

                  {/* Transport */}
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

                  {/* Landmarks */}
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

                  {/* AI Insight */}
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
