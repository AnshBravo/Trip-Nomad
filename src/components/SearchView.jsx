import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowLeft, Star, MapPin, X, Calendar, Compass, Share2, Utensils, CheckCircle2 } from 'lucide-react';
import { getAITravelSuggestions } from '../services/gemini';
import { getCityImage } from '../services/unsplash';

// --- CONSTANTS ---
const VIBES = [
  { label: 'All',      emoji: '✨' },
  { label: 'Nature',    emoji: '🌿' },
  { label: 'Romantic',  emoji: '💕' },
  { label: 'Adventure', emoji: '🏔️' },
  { label: 'Urban',     emoji: '🏙️' },
  { label: 'Cultural',  emoji: '🎭' },
  { label: 'Beach',     emoji: '🏖️' },
];

const CARD_HEIGHTS = [320, 260, 360, 280, 250, 340, 270, 300];

// --- SUB-COMPONENTS ---

const SkeletonCard = ({ index }) => {
  const height = CARD_HEIGHTS[index % CARD_HEIGHTS.length];
  return (
    <div className="rounded-3xl bg-zinc-200 animate-pulse break-inside-avoid mb-5" style={{ height }} />
  );
};

/**
 * Component: DestinationPage
 * Displays full-screen details for a selected city.
 */
const DestinationPage = ({ dest, onBack }) => {
  if (!dest) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="min-h-screen bg-zinc-950 text-white font-jakarta pb-20"
    >
      {/* Sticky Navigation */}
      <nav className="p-6 flex justify-between items-center border-b border-white/5 bg-zinc-900/50 backdrop-blur-md sticky top-0 z-50">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors font-bold text-xs uppercase tracking-widest"
        >
          <ArrowLeft size={18} /> Back to Search
        </button>
        <div className="flex gap-3">
          <button className="p-2.5 bg-zinc-800 rounded-xl border border-white/10 hover:bg-zinc-700 transition-all">
            <Share2 size={18} />
          </button>
          <button className="px-6 py-2.5 bg-white text-black rounded-xl font-black text-xs uppercase tracking-tighter hover:scale-105 transition-transform active:scale-95">
            Plan This Journey
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* HEADER SECTION: IMAGE LEFT, INFO RIGHT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-24 items-start">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="aspect-[4/5] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl"
          >
            <img 
              src={dest.imageUrl || "https://images.unsplash.com/photo-1488646953014-85cb44e25828"} 
              className="w-full h-full object-cover shadow-2xl transition-transform duration-1000 hover:scale-105"
              alt={dest.city}
            />
          </motion.div>

          <div className="space-y-8 lg:pt-10">
            <div>
              <span className="inline-block bg-white/5 text-zinc-400 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.3em] border border-white/10 mb-6">
                {dest.vibe} Experience
              </span>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-6">
                {dest.city}
              </h1>
              <div className="flex items-center gap-4">
                <p className="text-2xl text-zinc-500 font-medium flex items-center gap-2">
                  <MapPin className="text-zinc-400" size={24} /> {dest.country}
                </p>
                <div className="h-1 w-1 rounded-full bg-zinc-700" />
                <div className="flex items-center text-yellow-500 font-bold text-lg">
                  <Star size={20} fill="currentColor" className="mr-1.5" /> 4.9
                </div>
              </div>
            </div>

            <p className="text-xl text-zinc-400 leading-relaxed font-medium max-w-xl">
              {dest.description} This destination is perfectly curated for <strong>{dest.level}</strong> travelers seeking a high-contrast blend of relaxation and local immersion.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-zinc-900/50 border border-white/5 rounded-3xl">
                <Calendar className="text-zinc-500 mb-4" />
                <h4 className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-1">Best Season</h4>
                <p className="text-lg font-bold italic">Peak Vibes: Mar—Oct</p>
              </div>
              <div className="p-6 bg-zinc-900/50 border border-white/5 rounded-3xl">
                <Compass className="text-zinc-500 mb-4" />
                <h4 className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-1">Travel Style</h4>
                <p className="text-lg font-bold italic">{dest.level}</p>
              </div>
            </div>
          </div>
        </div>

        {/* DETAILS SECTION: ACTIVITIES & DISHES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 border-t border-white/5 pt-20">
          {/* Column 1: Activities */}
          <section className="space-y-8">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-white" size={28} />
              <h3 className="text-3xl font-black uppercase tracking-tighter">Things to do</h3>
            </div>
            <div className="space-y-4">
              {["Explore hidden local art alleys", "Sunset rooftop sessions", "Traditional private guided tour"].map((task, i) => (
                <div key={i} className="flex items-center gap-4 p-6 bg-zinc-900/30 rounded-2xl border border-white/5 hover:border-white/10 transition-all group">
                  <span className="text-zinc-700 font-black text-2xl group-hover:text-white transition-colors">0{i+1}</span>
                  <p className="text-zinc-300 font-medium text-lg">{task}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Column 2: Food */}
          <section className="space-y-8">
            <div className="flex items-center gap-3">
              <Utensils className="text-white" size={28} />
              <h3 className="text-3xl font-black uppercase tracking-tighter">Must-Try Dishes</h3>
            </div>
            <div className="space-y-4">
               {[1, 2].map((_, i) => (
                 <div key={i} className="flex gap-5 p-5 bg-zinc-900/30 rounded-2xl border border-white/5">
                    <div className="w-24 h-24 rounded-2xl bg-zinc-800 flex-shrink-0 overflow-hidden border border-white/5">
                      <img 
                        src={`https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=200&h=200`} 
                        className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all" 
                        alt="dish" 
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h4 className="font-bold text-white uppercase text-xs tracking-[0.2em] mb-2">Local Signature {i === 0 ? "Dish" : "Drink"}</h4>
                      <p className="text-zinc-500 text-sm leading-relaxed italic">A cultural staple in {dest.city}, usually prepared with locally sourced ingredients.</p>
                    </div>
                 </div>
               ))}
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  );
};

const MasonryCard = ({ dest, index, onClick }) => {
  const height = CARD_HEIGHTS[index % CARD_HEIGHTS.length];
  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, type: 'spring', stiffness: 100 }}
      whileHover={{ scale: 1.02 }}
      className="relative rounded-[2rem] overflow-hidden cursor-pointer break-inside-avoid mb-5 shadow-lg group"
      style={{ height }}
    >
      <img src={dest.imageUrl || "https://images.unsplash.com/photo-1488646953014-85cb44e25828"} alt={dest.city} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
      <div className="absolute top-5 right-5">
        <div className="bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-1.5 text-[10px] font-bold text-white uppercase">
          <Star size={10} fill="#fbbf24" className="text-yellow-400" /> 4.9
        </div>
      </div>
      <div className="absolute bottom-0 p-6 w-full">
        <p className="text-white/50 text-[10px] font-black uppercase tracking-[0.2em] mb-1">{dest.country}</p>
        <h3 className="text-white text-xl font-black tracking-tight">{dest.city}</h3>
      </div>
    </motion.div>
  );
};

// --- MAIN SEARCH VIEW ---
const SearchView = ({ initialQuery, onBack }) => {
  const [query, setQuery] = useState(initialQuery || '');
  const [activeVibe, setActiveVibe] = useState('All');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    fetchResults(initialQuery || 'top travel destinations');
  }, []);

  const fetchResults = async (searchTerm) => {
    setIsLoading(true);
    try {
      const data = await getAITravelSuggestions(searchTerm);
      const resultsWithImages = await Promise.all(
        data.map(async (dest) => {
          const imageUrl = await getCityImage(dest.city);
          return { ...dest, imageUrl };
        })
      );
      setResults(resultsWithImages);
    } catch (e) { 
      console.error(e); 
    } finally { 
      setIsLoading(false); 
    }
  };

  const handleSearch = () => { 
    if (query.trim()) fetchResults(query); 
  };

  return (
    <AnimatePresence mode="wait">
      {selectedLocation ? (
        <DestinationPage 
          key="detail"
          dest={selectedLocation} 
          onBack={() => setSelectedLocation(null)} 
        />
      ) : (
        <motion.div
          key="grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="min-h-screen bg-white font-jakarta p-6 lg:p-12"
        >
          {/* Header & Search */}
          <div className="max-w-4xl mb-12">
            <button onClick={onBack} className="mb-8 flex items-center gap-2 text-zinc-400 font-bold text-xs uppercase tracking-widest hover:text-black">
              <ArrowLeft size={16} /> Exit Search
            </button>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-8">Where to next?</h2>
            <div className="relative group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-black transition-colors" size={20} />
              <input 
                value={query} 
                onChange={e => setQuery(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSearch()}
                className="w-full bg-zinc-100 border-none rounded-[1.5rem] py-5 pl-14 pr-6 font-bold text-lg focus:ring-4 focus:ring-black/5 outline-none transition-all"
                placeholder="Search by city, vibe, or country..."
              />
            </div>
          </div>

          {/* Vibes Filter */}
          <div className="flex flex-wrap gap-2 mb-12">
            {VIBES.map(v => (
              <button 
                key={v.label}
                onClick={() => { setActiveVibe(v.label); fetchResults(v.label + ' travel'); }}
                className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-widest border transition-all ${activeVibe === v.label ? 'bg-black text-white border-black' : 'bg-white border-zinc-200 text-zinc-400 hover:border-black hover:text-black'}`}
              >
                {v.emoji} {v.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-5">
            {isLoading ? Array(8).fill(0).map((_, i) => <SkeletonCard key={i} index={i} />) 
              : results.map((dest, i) => (
                <MasonryCard key={i} dest={dest} index={i} onClick={() => setSelectedLocation(dest)} />
              ))
            }
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchView;