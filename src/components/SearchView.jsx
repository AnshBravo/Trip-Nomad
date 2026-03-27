import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom'; // Added Router hooks
import { Search, ArrowLeft, MapPin, Share2, Utensils, CheckCircle2, Bookmark, PlusCircle, Loader2 } from 'lucide-react';
import { getAITravelSuggestions, getSpecificPlacesInCountry } from '../services/gemini';
import { getCityImage } from '../services/unsplash';

// --- SUB-COMPONENTS ---

const SkeletonCard = ({ index }) => (
  <div className="rounded-[2.5rem] bg-zinc-100 animate-pulse break-inside-avoid mb-6 shadow-sm border border-zinc-100" style={{ height: [320, 260, 360, 280][index % 4] }} />
);

const DestinationPage = ({ dest, onBack }) => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const rawPlaces = await getSpecificPlacesInCountry(dest.country || dest.city);
        const placesWithImages = await Promise.all(
          rawPlaces.map(async (place) => {
            const placeImg = await getCityImage(`${place.name} ${dest.country}`);
            const foodImg = await getCityImage(`${place.food} dish`);
            return { 
              ...place, 
              imageUrl: placeImg ? `${placeImg}&w=600&q=80` : null, 
              foodImageUrl: foodImg ? `${foodImg}&w=200&h=200&fit=crop` : null 
            };
          })
        );
        setPlaces(placesWithImages);
      } catch (e) {
        console.error("Error fetching place details:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [dest]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="min-h-screen bg-white text-zinc-950 font-jakarta pb-24"
    >
      <nav className="p-6 flex justify-between items-center border-b border-zinc-100 bg-white/70 backdrop-blur-xl sticky top-0 z-50">
        <button onClick={onBack} className="flex items-center gap-2.5 text-zinc-600 hover:text-black transition-colors font-extrabold text-[10px] uppercase tracking-[0.2em] cursor-pointer">
          <ArrowLeft size={16} /> Close explore
        </button>
        <button className="p-3 bg-white rounded-2xl border border-zinc-200 hover:bg-zinc-100 transition-all cursor-pointer">
          <Share2 size={18} className="text-zinc-700" />
        </button>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 mb-20 items-center">
          <div className="order-2 md:order-1 space-y-6">
            <div>
              <span className="inline-block bg-zinc-100 text-zinc-600 text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.25em] border border-zinc-100 mb-6">
                {dest.vibe} Experience
              </span>
              <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-tight mb-3">
                {dest.city}
              </h1>
              <p className="text-xl text-zinc-400 font-bold flex items-center gap-2">
                <MapPin size={22} className="text-zinc-300" /> {dest.country}
              </p>
            </div>
            
            <p className="text-xl text-zinc-600 leading-relaxed max-w-lg font-medium">
              {dest.description} High-end travel for <strong>{dest.level}</strong> nomads seeking immersive {dest.vibe} environments.
            </p>

            <div className="flex flex-wrap gap-3.5 pt-6">
              <button className="flex items-center gap-2 px-8 py-4 bg-black text-white rounded-2xl font-black text-xs uppercase tracking-tighter hover:bg-zinc-800 transition-all active:scale-95 shadow-md cursor-pointer">
                <PlusCircle size={16} /> Add to Vault
              </button>
              <button className="flex items-center gap-2 px-8 py-4 bg-white border border-zinc-200 text-zinc-900 rounded-2xl font-black text-xs uppercase tracking-tighter hover:bg-zinc-100 transition-all active:scale-95 shadow-sm cursor-pointer">
                <Bookmark size={16} /> Add to favorites
              </button>
            </div>
          </div>

          <motion.div className="order-1 md:order-2 aspect-video md:aspect-[5/6] rounded-[3.5rem] overflow-hidden border border-zinc-100 shadow-xl">
            <img src={dest.imageUrl} className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-1000" alt={dest.city} />
          </motion.div>
        </div>

        <section className="border-t border-zinc-100 pt-20">
          <div className="flex items-center justify-between mb-16">
            <h3 className="text-4xl font-black uppercase tracking-tighter italic">Places in {dest.country}</h3>
            {loading && <Loader2 className="animate-spin text-zinc-300" size={28} />}
          </div>

          <div className="space-y-12">
            {loading ? (
              <div className="text-zinc-400 font-extrabold animate-pulse text-sm uppercase tracking-widest text-center py-20 bg-zinc-50 rounded-3xl border border-zinc-100">Consulting AI for destinations...</div>
            ) : (
              places.map((place, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  viewport={{ once: true }}
                  key={place.name} 
                  className="group bg-zinc-50 border border-zinc-100/70 rounded-[2.5rem] p-6 md:p-9 hover:bg-white hover:border-zinc-200 transition-all shadow-sm hover:shadow-lg flex flex-col gap-8"
                >
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="w-full md:w-48 h-48 rounded-[1.5rem] overflow-hidden flex-shrink-0 border border-zinc-200 shadow-sm">
                       <img src={place.imageUrl || "https://images.unsplash.com/photo-1488646953014-85cb44e25828"} className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all" alt={place.name} />
                    </div>

                    <div className="flex-1 space-y-4">
                      <div className="flex items-center gap-4">
                        <span className="text-4xl font-black text-zinc-200 group-hover:text-black transition-colors tracking-tighter">0{i + 1}</span>
                        <h4 className="text-3xl font-black tracking-tighter">{place.name}</h4>
                      </div>
                      <p className="text-zinc-600 text-lg leading-relaxed max-w-2xl font-medium">{place.description}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-zinc-100/50">
                    <div className="space-y-4">
                      <span className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400 flex items-center gap-2">
                        <CheckCircle2 size={13} /> Activities
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {place.activities?.map((act) => (
                          <span key={act} className="text-[11px] font-bold bg-white border border-zinc-200 px-3 py-1.5 rounded-full text-zinc-700">
                            {act}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <span className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400 flex items-center gap-2">
                        <Utensils size={13} /> Local Flavor
                      </span>
                      <div className="flex items-center gap-4 bg-white p-3 rounded-2xl border border-zinc-100">
                        <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-zinc-100">
                          <img src={place.foodImageUrl} className="w-full h-full object-cover" alt={place.food} />
                        </div>
                        <div>
                          <p className="text-xs text-black font-extrabold italic tracking-tight">{place.food}</p>
                          <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Must try dish</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </section>
      </div>
    </motion.div>
  );
};

// MASONRY CARD
const MasonryCard = ({ dest, index, onClick }) => (
  <motion.div
    onClick={onClick}
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.04, type: 'spring', stiffness: 90 }}
    whileHover={{ scale: 1.02 }}
    className="relative rounded-[2.5rem] overflow-hidden cursor-pointer break-inside-avoid mb-6 shadow-sm border border-zinc-100 group"
    style={{ height: [320, 260, 360, 280, 250, 340, 270, 300][index % 8] }}
  >
    <img src={dest.imageUrl} alt={dest.city} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
    <div className="absolute bottom-0 p-8 w-full">
      <p className="text-white/60 text-[10px] font-black uppercase tracking-[0.25em] mb-1.5">{dest.country}</p>
      <h3 className="text-white text-2xl font-black tracking-tighter leading-none">{dest.city}</h3>
    </div>
  </motion.div>
);

// --- MAIN SEARCH VIEW ---
const SearchView = () => {
  const navigate = useNavigate(); // Hook for navigation
  const [searchParams, setSearchParams] = useSearchParams(); // Hook for URL params
  
  const initialQuery = searchParams.get('q') || 'top travel destinations';
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Trigger search on mount or when URL param 'q' changes
  useEffect(() => { 
    fetchResults(initialQuery); 
  }, [searchParams]);

  const fetchResults = async (searchTerm) => {
    setIsLoading(true);
    setResults([]); 
    try {
      const data = await getAITravelSuggestions(searchTerm);
      const resultsWithImages = await Promise.all(
        data.map(async (dest) => ({ ...dest, imageUrl: await getCityImage(dest.city) }))
      );
      setResults(resultsWithImages);
    } catch (e) { 
      console.error(e); 
    } finally { 
      setIsLoading(false); 
    }
  };

  const handleSearch = () => { 
    if (query.trim()) {
      setSearchParams({ q: query }); // Update URL, which triggers the useEffect
    }
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
        <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen bg-white text-black p-6 lg:p-12">
          
          <div className="max-w-4xl mb-16">
            {/* Navigates back to home page */}
            <button onClick={() => navigate('/')} className="mb-10 flex items-center gap-2.5 text-zinc-400 font-extrabold text-[11px] uppercase tracking-widest hover:text-black transition-colors cursor-pointer">
              <ArrowLeft size={16} /> Exit search
            </button>
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-10 leading-none">Find your next vibe.</h2>
            <div className="relative group max-w-2xl">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-black transition-colors" size={22} />
              <input 
                value={query} 
                onChange={e => setQuery(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSearch()}
                className="w-full bg-zinc-100 border-none rounded-[1.8rem] py-6 pl-16 pr-8 font-extrabold text-xl focus:ring-4 focus:ring-black/5 focus:border-black outline-none transition-all placeholder:text-zinc-400"
                placeholder="Search by city, country or vibe..."
              />
            </div>
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6">
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