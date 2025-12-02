// src/pages/VideoGuides.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, MapPin, Clock, Train, Bus, Car, Footprints, Navigation, Smartphone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext'; // Import your hook

export default function VideoGuides() {
  const { t } = useLanguage(); // Use your hook
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const categories = [
    { id: 'all', name: t('categories.allGuides'), icon: '🧭', color: 'from-blue-400 to-cyan-400' },
    { id: 'public', name: t('categories.publicTransport'), icon: '🚌', color: 'from-green-400 to-emerald-400' },
    { id: 'walking', name: t('categories.walkingRoutes'), icon: '🚶', color: 'from-purple-400 to-pink-400' },
    { id: 'driving', name: t('categories.driving'), icon: '🚗', color: 'from-orange-400 to-red-400' },
    { id: 'culture', name: t('categories.culture'), icon: '🎭', color: 'from-amber-400 to-orange-400' },
  ];

  const guides = [
    {
      id: 1,
      title: t('guides.abuDhabi.title'),
      description: t('guides.abuDhabi.description'),
      category: t('guides.abuDhabi.category'),
      duration: t('guides.abuDhabi.duration'),
      transport: ['bus', 'walking'].map(transport => t(`transport.${transport}`)),
      landmarks: [
        t('guides.abuDhabi.landmarks.0'),
        t('guides.abuDhabi.landmarks.1'),
        t('guides.abuDhabi.landmarks.2')
      ],
      difficulty: t('guides.abuDhabi.difficulty'),
      aiTip: t('guides.abuDhabi.aiTip'),
      estimatedTime: t('guides.abuDhabi.estimatedTime'),
      cost: t('guides.abuDhabi.cost'),
      videoPublicId: "AbuDhaby_tfvpi9"
    },
    {
      id: 2,
      title: t('guides.atryauBridge.title'),
      description: t('guides.atryauBridge.description'),
      category: t('guides.atryauBridge.category'),
      duration: t('guides.atryauBridge.duration'),
      transport: ['bus', 'walking'].map(transport => t(`transport.${transport}`)),
      landmarks: [
        t('guides.atryauBridge.landmarks.0'),
        t('guides.atryauBridge.landmarks.1'),
        t('guides.atryauBridge.landmarks.2')
      ],
      difficulty: t('guides.atryauBridge.difficulty'),
      aiTip: t('guides.atryauBridge.aiTip'),
      estimatedTime: t('guides.atryauBridge.estimatedTime'),
      cost: t('guides.atryauBridge.cost'),
      videoPublicId: "AtyrauBridge_i99y9q"
    },
    {
      id: 3,
      title: t('guides.operaPhilharmonic.title'),
      description: t('guides.operaPhilharmonic.description'),
      category: t('guides.operaPhilharmonic.category'),
      duration: t('guides.operaPhilharmonic.duration'),
      transport: ['walking', 'taxi'].map(transport => t(`transport.${transport}`)),
      landmarks: [
        t('guides.operaPhilharmonic.landmarks.0'),
        t('guides.operaPhilharmonic.landmarks.1'),
        t('guides.operaPhilharmonic.landmarks.2')
      ],
      difficulty: t('guides.operaPhilharmonic.difficulty'),
      aiTip: t('guides.operaPhilharmonic.aiTip'),
      estimatedTime: t('guides.operaPhilharmonic.estimatedTime'),
      cost: t('guides.operaPhilharmonic.cost'),
      videoPublicId: "Мерейка_филармони_gv4pyu"
    },
    {
      id: 4,
      title: t('guides.baursak.title'),
      description: t('guides.baursak.description'),
      category: t('guides.baursak.category'),
      duration: t('guides.baursak.duration'),
      transport: ['walking'].map(transport => t(`transport.${transport}`)),
      landmarks: [
        t('guides.baursak.landmarks.0'),
        t('guides.baursak.landmarks.1'),
        t('guides.baursak.landmarks.2')
      ],
      difficulty: t('guides.baursak.difficulty'),
      aiTip: t('guides.baursak.aiTip'),
      estimatedTime: t('guides.baursak.estimatedTime'),
      cost: t('guides.baursak.cost'),
      videoPublicId: "Лаура_бауырсак_uo5kbu"
    },
    {
      id: 5,
      title: t('guides.kurt.title'),
      description: t('guides.kurt.description'),
      category: t('guides.kurt.category'),
      duration: t('guides.kurt.duration'),
      transport: ['walking', 'taxi'].map(transport => t(`transport.${transport}`)),
      landmarks: [
        t('guides.kurt.landmarks.0'),
        t('guides.kurt.landmarks.1'),
        t('guides.kurt.landmarks.2')
      ],
      difficulty: t('guides.kurt.difficulty'),
      aiTip: t('guides.kurt.aiTip'),
      estimatedTime: t('guides.kurt.estimatedTime'),
      cost: t('guides.kurt.cost'),
      videoPublicId: "Мерейка_Курт_xa1miu"
    },
    {
      id: 6,
      title: t('guides.kokpar.title'),
      description: t('guides.kokpar.description'),
      category: t('guides.kokpar.category'),
      duration: t('guides.kokpar.duration'),
      transport: ['car', 'taxi'].map(transport => t(`transport.${transport}`)),
      landmarks: [
        t('guides.kokpar.landmarks.0'),
        t('guides.kokpar.landmarks.1'),
        t('guides.kokpar.landmarks.2')
      ],
      difficulty: t('guides.kokpar.difficulty'),
      aiTip: t('guides.kokpar.aiTip'),
      estimatedTime: t('guides.kokpar.estimatedTime'),
      cost: t('guides.kokpar.cost'),
      videoPublicId: "Kokpar_tart9k"
    },
    {
      id: 7,
      title: t('guides.asyk.title'),
      description: t('guides.asyk.description'),
      category: t('guides.asyk.category'),
      duration: t('guides.asyk.duration'),
      transport: ['walking'].map(transport => t(`transport.${transport}`)),
      landmarks: [
        t('guides.asyk.landmarks.0'),
        t('guides.asyk.landmarks.1'),
        t('guides.asyk.landmarks.2')
      ],
      difficulty: t('guides.asyk.difficulty'),
      aiTip: t('guides.asyk.aiTip'),
      estimatedTime: t('guides.asyk.estimatedTime'),
      cost: t('guides.asyk.cost'),
      videoPublicId: "Asyk_game_crtokp"
    },
    {
      id: 8,
      title: t('guides.aulaCafe.title'),
      description: t('guides.aulaCafe.description'),
      category: t('guides.aulaCafe.category'),
      duration: t('guides.aulaCafe.duration'),
      transport: ['walking'].map(transport => t(`transport.${transport}`)),
      landmarks: [
        t('guides.aulaCafe.landmarks.0'),
        t('guides.aulaCafe.landmarks.1'),
        t('guides.aulaCafe.landmarks.2'),
        t('guides.aulaCafe.landmarks.3')
      ],
      difficulty: t('guides.aulaCafe.difficulty'),
      aiTip: t('guides.aulaCafe.aiTip'),
      estimatedTime: t('guides.aulaCafe.estimatedTime'),
      cost: t('guides.aulaCafe.cost'),
      videoPublicId: "Aula_cafe_dawcgs"
    },
    {
      id: 9,
      title: t('guides.lightRail.title'),
      description: t('guides.lightRail.description'),
      category: t('guides.lightRail.category'),
      duration: t('guides.lightRail.duration'),
      transport: ['light-rail', 'walking'].map(transport => t(`transport.${transport}`)),
      landmarks: [
        t('guides.lightRail.landmarks.0'),
        t('guides.lightRail.landmarks.1'),
        t('guides.lightRail.landmarks.2'),
        t('guides.lightRail.landmarks.3')
      ],
      difficulty: t('guides.lightRail.difficulty'),
      aiTip: t('guides.lightRail.aiTip'),
      estimatedTime: t('guides.lightRail.estimatedTime'),
      cost: t('guides.lightRail.cost'),
      videoPublicId: "tutorial_q0crmk"
    },
    {
      id: 10,
      title: t('guides.circus.title'),
      description: t('guides.circus.description'),
      category: t('guides.circus.category'),
      duration: t('guides.circus.duration'),
      transport: ['walking', 'taxi', 'bus'].map(transport => t(`transport.${transport}`)),
      landmarks: [
        t('guides.circus.landmarks.0'),
        t('guides.circus.landmarks.1'),
        t('guides.circus.landmarks.2'),
        t('guides.circus.landmarks.3')
      ],
      difficulty: t('guides.circus.difficulty'),
      aiTip: t('guides.circus.aiTip'),
      estimatedTime: t('guides.circus.estimatedTime'),
      cost: t('guides.circus.cost'),
      videoPublicId: "tutorialDilnaz_hsxqky"
    },
    {
      id: 11,
      title: t('guides.nationalMuseum.title'),
      description: t('guides.nationalMuseum.description'),
      category: t('guides.nationalMuseum.category'),
      duration: t('guides.nationalMuseum.duration'),
      transport: ['walking', 'metro'].map(transport => t(`transport.${transport}`)),
      landmarks: [
        t('guides.nationalMuseum.landmarks.0'),
        t('guides.nationalMuseum.landmarks.1'),
        t('guides.nationalMuseum.landmarks.2')
      ],
      difficulty: t('guides.nationalMuseum.difficulty'),
      aiTip: t('guides.nationalMuseum.aiTip'),
      estimatedTime: t('guides.nationalMuseum.estimatedTime'),
      cost: t('guides.nationalMuseum.cost'),
      videoPublicId: "1763065230261842_bfpmue"
    },
    {
      id: 12,
      title: t('guides.ailand.title'),
      description: t('guides.ailand.description'),
      category: t('guides.ailand.category'),
      duration: t('guides.ailand.duration'),
      transport: ['bus', 'taxi', 'walking'].map(transport => t(`transport.${transport}`)),
      landmarks: [
        t('guides.ailand.landmarks.0'),
        t('guides.ailand.landmarks.1'),
        t('guides.ailand.landmarks.2'),
        t('guides.ailand.landmarks.3')
      ],
      difficulty: t('guides.ailand.difficulty'),
      aiTip: t('guides.ailand.aiTip'),
      estimatedTime: t('guides.ailand.estimatedTime'),
      cost: t('guides.ailand.cost'),
      videoPublicId: "Ailand_fp5jkk"
    }
  ];

  const filteredGuides = selectedCategory === 'all' 
    ? guides 
    : guides.filter(guide => guide.category === selectedCategory);

  const getTransportIcon = (transport) => {
    const icons = {
      bus: <Bus className="w-4 h-4" />,
      walking: <Footprints className="w-4 h-4" />,
      taxi: <Car className="w-4 h-4" />,
      car: <Car className="w-4 h-4" />,
      metro: <Train className="w-4 h-4" />,
      'light-rail': <Train className="w-4 h-4" />,
    };
    return icons[transport] || <Navigation className="w-4 h-4" />;
  };

  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
  };

  const handleVideoEnd = () => {
    setIsVideoPlaying(false);
  };

  // Update the filteredGuides logic to work with translated categories
  const getCategoryIdFromTranslation = (translatedCategory) => {
    // Map translated category back to ID
    const categoryMap = {
      [t('categories.publicTransport')]: 'public',
      [t('categories.culture')]: 'culture',
      [t('categories.walkingRoutes')]: 'walking',
      [t('categories.driving')]: 'driving',
      // Add other category mappings as needed
    };
    return categoryMap[translatedCategory] || translatedCategory;
  };

  const actuallyFilteredGuides = selectedCategory === 'all' 
    ? guides 
    : guides.filter(guide => getCategoryIdFromTranslation(guide.category) === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero section with translations */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-cyan-500 py-20">
        <div className="relative px-6 text-center max-w-5xl mx-auto z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="heading-font text-5xl md:text-6xl font-extrabold leading-tight mb-4 text-white"
          >
            {t('videoGuides.hero.title')} <br />
            <span className="text-cyan-200">{t('videoGuides.hero.subtitle')}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-blue-50 max-w-2xl mx-auto"
          >
            {t('videoGuides.hero.description')}
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
            {actuallyFilteredGuides.map((guide, index) => (
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
