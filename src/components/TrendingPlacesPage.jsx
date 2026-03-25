import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, TrendingUp } from 'lucide-react';
import { getTrendingPlaces } from '../services/gemini';
import { getCityImage } from '../services/unsplash';

const VIBES = [
  { label: 'All',      emoji: '✨' },
  { label: 'Nature',    emoji: '🌿' },
  { label: 'Romantic',  emoji: '💕' },
  { label: 'Adventure', emoji: '🏔️' },
  { label: 'Urban',     emoji: '🏙️' },
  { label: 'Cultural',  emoji: '🎭' },
  { label: 'Beach',     emoji: '🏖️' },
];

const CARD_HEIGHTS = [320, 260, 370, 290, 250, 340, 275, 310, 360, 250, 320, 280];

const PlaceCard = ({ dest, index }) => {
  const height = CARD_HEIGHTS[index % CARD_HEIGHTS.length];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, type: 'spring', stiffness: 100 }}
      whileHover="hover"
      className="relative rounded-[2rem] overflow-hidden cursor-pointer break-inside-avoid mb-6 shadow-sm border border-gray-100 group"
      style={{ height }}
    >
      <motion.img 
        variants={{ hover: { scale: 1.08 } }}
        transition={{ duration: 0.7 }}
        src={dest.imageUrl || "https://images.unsplash.com/photo-1488646953014-85cb44e25828"} 
        alt={dest.city}
        className="absolute inset-0 w-full h-full object-cover bg-gray-200"
      />
      
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

      <div className="absolute top-5 right-5 z-20">
        <div className="flex items-center text-white font-bold text-[10px] bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-xl border border-white/10">
          <Star size={10} fill="#fbbf24" className="text-yellow-400 mr-1" /> 4.9
        </div>
      </div>

      <div className="absolute bottom-0 p-6 w-full z-20 text-white">
        <div className="flex items-center gap-1.5 mb-2 opacity-80">
          <MapPin size={10} className="text-alabaster" />
          <span className="text-[9px] font-black uppercase tracking-widest">{dest.country}</span>
        </div>
        <h3 className="text-xl font-black tracking-tight">{dest.city}</h3>
        <p className="text-white/70 text-[11px] leading-relaxed mt-2 line-clamp-2 font-medium">
          {dest.description}
        </p>
        
        <div className="mt-4 flex items-center justify-between">
          <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter border border-white/20">
            {dest.level}
          </span>
          <span className="text-white/40 text-[9px] font-black uppercase opacity-0 group-hover:opacity-100 transition-opacity">
            Details →
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const SkeletonCard = ({ index }) => {
  const height = CARD_HEIGHTS[index % CARD_HEIGHTS.length];
  return (
    <div className="rounded-[2rem] bg-gray-200 animate-pulse break-inside-avoid mb-6" style={{ height }} />
  );
};

const TrendingPlacesPage = () => {
  const [allPlaces, setAllPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeVibe, setActiveVibe] = useState('All');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // 1. Get raw places from Gemini
        const rawPlaces = await getTrendingPlaces(12);
        
        // 2. Safeguard: Ensure rawPlaces is an array
        const places = Array.isArray(rawPlaces) ? rawPlaces : [];

        // 3. Map images with safety catch
        const placesWithImages = await Promise.all(
          places.map(async (place) => {
            try {
              const img = await getCityImage(place.city);
              return { ...place, imageUrl: img };
            } catch (err) {
              return { ...place, imageUrl: null }; // Fallback handled in PlaceCard
            }
          })
        );

        setAllPlaces(placesWithImages);
      } catch (e) {
        console.error('Critical Fetch Error:', e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const filtered = activeVibe === 'All'
    ? allPlaces
    : allPlaces.filter((p) => p.vibe === activeVibe);

  return (
    <div className="min-h-screen bg-gray-50 font-jakarta p-6 pt-24 lg:p-12 overflow-x-hidden">
      <header className="mb-12 max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-3">
          <div className="p-2.5 bg-midnight rounded-2xl shadow-lg">
            <TrendingUp size={24} className="text-white" />
          </div>
          <h1 className="text-3xl font-black text-midnight uppercase tracking-tighter">
            Trending
          </h1>
        </div>
        <p className="text-gray-500 font-medium max-w-md">
          AI-curated destinations currently trending among the nomad community.
        </p>
      </header>

      {/* Filter Pills */}
      <div className="flex flex-wrap gap-3 mb-12 max-w-7xl mx-auto">
        {VIBES.map(({ label, emoji }) => (
          <button
            key={label}
            onClick={() => setActiveVibe(label)}
            className={`px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
              activeVibe === label
                ? 'bg-midnight text-white shadow-xl'
                : 'bg-white text-midnight border border-gray-100 hover:shadow-md'
            }`}
          >
            {emoji} {label}
          </button>
        ))}
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-8">
          {isLoading ? (
            Array(8).fill(0).map((_, i) => <SkeletonCard key={i} index={i} />)
          ) : filtered.length > 0 ? (
            filtered.map((dest, i) => (
              <PlaceCard key={`${dest.city}-${i}`} dest={dest} index={i} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-gray-400 font-bold uppercase tracking-widest text-xs">
              No spots found. Try a different vibe.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrendingPlacesPage;