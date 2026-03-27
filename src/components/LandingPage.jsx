import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // <--- ADDED
import { motion } from 'framer-motion';
import { Search, Star, MapPin } from 'lucide-react';
import ill1 from '../assets/illustrations/Illustration-diagram-1.png'
import ill2 from '../assets/illustrations/Illustration-diagram-2.png'
import ill3 from '../assets/illustrations/Illustration-diagram-3.png'
import boat from '../assets/illustrations/saild-boat.png';
import planeAccent from '../assets/illustrations/Yuppies - Airplane.png';
import bird from '../assets/illustrations/Hands - Bird.png';
import bagAccent from '../assets/illustrations/Hobbies - Suitcase.png';
import { getTrendingPlaces } from '../services/gemini';
import { getCityImage } from '../services/unsplash'; 

const TrendingCard = ({ dest, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="min-w-[280px] md:min-w-[320px] h-[380px] rounded-4xl overflow-hidden shadow-sm border border-white/10 relative cursor-pointer flex-shrink-0"
    >
      <img 
        src={dest.imageUrl || "https://images.unsplash.com/photo-1488646953014-85cb44e25828"} 
        alt={dest.city}
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      <div className="absolute inset-0 opacity-40"  />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.05) 60%, transparent 100%)' }} />
      
      <div className="absolute top-4 right-4 z-10">
        <div className="flex items-center text-white font-bold text-xs bg-black/25 backdrop-blur-sm px-2 py-1 rounded-lg">
          <Star size={11} fill="#fbbf24" className="text-yellow-400 mr-1" /> 4.9
        </div>
      </div>
      {dest.vibe && (
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest border border-white/30">
            {dest.vibe}
          </span>
        </div>
      )}
      <div className="absolute bottom-0 p-6 z-10 w-full">
        <div className="flex items-center gap-1.5 mb-1">
          <MapPin size={11} className="text-white/50" />
          <span className="text-white/60 text-[10px] font-semibold uppercase tracking-widest">{dest.country}</span>
        </div>
        <h3 className="text-white text-xl font-bold">{dest.city}</h3>
        <p className="text-white/70 text-[11px] leading-relaxed mt-1 line-clamp-2">{dest.description}</p>
        <div className="mt-3">
          <span className="bg-white/15 text-white text-[10px] font-bold px-3 py-1 rounded-full border border-white/20">
            {dest.level}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const SkeletonCard = () => (
  <div className="min-w-[280px] md:min-w-[320px] h-[380px] rounded-4xl flex-shrink-0 bg-gray-200 animate-pulse" />
);

const LandingPage = ({ setSearchQuery }) => {
  const navigate = useNavigate(); // <--- INITIALIZED
  const [localQuery, setLocalQuery] = useState('');
  const [trendingPlaces, setTrendingPlaces] = useState([]);
  const [isTrendingLoading, setIsTrendingLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        setIsTrendingLoading(true);
        const places = await getTrendingPlaces(6);
        const placesWithImages = await Promise.all(
          places.map(async (place) => {
            const imageUrl = await getCityImage(place.city);
            return { ...place, imageUrl };
          })
        );
        setTrendingPlaces(placesWithImages);
      } catch (e) {
        console.error('Trending fetch error:', e);
      } finally {
        setIsTrendingLoading(false);
      }
    };
    fetchTrending();
  }, []);

  const handleExplore = () => {
    if (localQuery.trim()) {
      setSearchQuery(localQuery); // Update global state in App.jsx
      navigate('/search'); // Navigate to the search route
    }
  };

  return (
    <div className="flex-1 bg-gray-50 min-h-screen font-jakarta p-4 pt-24 lg:p-10 lg:pt-10 overflow-x-hidden">
      
      {/* 1. HERO / SEARCH SECTION */}
      <header className="mb-12 max-w-5xl mx-auto flex flex-col items-center relative">
        <motion.img 
          src={boat} 
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-16 lg:-top-8 left-0 w-26 md:w-24 opacity-80"
        />
        <motion.img 
          src={planeAccent} 
          animate={{ x: [0, 10, 0], y: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 lg:-top-8 right-60 w-16 md:w-20 opacity-80"
        />
        <motion.img 
          src={bird} 
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-24 lg:top-0 -right-4 w-30 md:w-32 opacity-90"
        />
        <motion.img 
          src={bagAccent} 
          animate={{ rotate: [-2, 4, -6] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-12 left-10 w-20 md:w-28"
        />

        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl lg:text-5xl font-black text-midnight text-center tracking-tight mb-8 leading-tight z-10"
        >
          Make your next trip truly yours 
          <span className="block mt-2 mb-2">with</span> 
          <span className="text-white px-3 bg-alabaster py-1 rounded-2xl shadow-lg shadow-alabaster/20 inline-block">Trip Nomad</span>
        </motion.h1>
        
        <div className="relative w-full max-w-2xl group z-10">
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
            <Search className="text-gray-400 group-focus-within:text-alabaster transition-colors" size={20} />
          </div>
          <input 
            type="text" 
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleExplore()}
            placeholder="Search destinations, hotels, or hidden gems..."
            className="w-full bg-white border border-gray-200 py-4 lg:py-5 pl-14 pr-32 rounded-2xl shadow-sm focus:ring-4 focus:ring-alabaster/10 focus:border-alabaster outline-none transition-all text-sm font-medium"
          />
          <button onClick={handleExplore} className="absolute right-2.5 top-2.5 bg-midnight text-white px-6 py-2 rounded-xl font-bold text-sm hover:bg-midnight/90 transition-all shadow-md">
            Explore
          </button>
        </div>
      </header>

      {/* 2. TRENDING SECTION */}
      <section className="mb-12">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-xl font-bold text-midnight uppercase tracking-tight">Trending Destinations</h2>
            <p className="text-sm text-gray-500">Based on your Nomad Level</p>
          </div>
          <button
            onClick={() => navigate('/trending')}
            className="text-alabaster font-bold text-sm hover:underline"
          >View All</button>
        </div>

        <div className="flex space-x-6 overflow-x-auto pb-6 scrollbar-hide">
          {isTrendingLoading
            ? Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)
            : trendingPlaces.map((dest, i) => <TrendingCard key={i} dest={dest} index={i} />)
          }
        </div>
      </section>

      {/* 3. DIAGRAMS SECTION */}
      <section className="mb-16 mt-8 max-w-5xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-4">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-midnight flex items-center justify-center shadow-sm">
              <img src={ill1} alt="bag" style={{transform: 'scale(1.6)'}}/>
            </div>
            <p className="mt-4 text-sm font-bold text-midnight text-center">Type your mood or a place <span className="block">you would like to go to</span></p>
          </div>
          <div className="hidden lg:flex flex-col items-center mb-10 -mx-12"> 
            <span className="text-[10px] font-black uppercase tracking-widest text-black mb-2 whitespace-nowrap text-center">Best places filtered only for you</span>
            <svg width="182" height="20" viewBox="0 0 182 20" fill="none"><path d="M0 10H172M172 10L164 2M172 10L164 18" stroke="#000000" strokeWidth="2" strokeLinecap="round" /></svg>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full flex items-center justify-center bg-midnight shadow-sm">
              <img src={ill2} alt="hotel" style={{transform: 'scale(1.6)'}}/>
            </div>
            <p className="mt-4 text-sm font-bold text-midnight text-center">Select the best options for <span className="block">stay and flights</span></p>
          </div>
          <div className="hidden lg:flex flex-col items-center mb-10 -mx-12"> 
            <span className="text-[10px] font-black uppercase tracking-widest text-black mb-2 whitespace-nowrap text-center leading-tight">Budget Friendly Trip <br/>ready for you</span>
            <svg width="182" height="20" viewBox="0 0 182 20" fill="none"><path d="M0 10H172M172 10L164 2M172 10L164 18" stroke="#000000" strokeWidth="2" strokeLinecap="round" /></svg>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full flex items-center justify-center bg-midnight shadow-sm">
              <img src={ill3} alt="packed bag" style={{transform: 'scale(1.6)'}}/>
            </div>
            <p className="mt-4 text-sm font-bold text-midnight text-center">Enjoy Your Trip!</p>
          </div>
        </div>
      </section>

      {/* 4. STATS SECTION */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div 
          onClick={() => navigate('/vault')}
          className="bg-midnight p-8 rounded-4xl text-white shadow-xl flex flex-col justify-between relative overflow-hidden cursor-pointer"
        >
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-alabaster/20 rounded-full blur-3xl" />
          <div>
            <p className="text-alabaster font-black uppercase text-[10px] tracking-[0.2em] mb-3">Vault Status</p>
            <h2 className="text-3xl font-bold">14</h2>
            <p className="text-white/60 text-xs font-medium">Saved Locations</p>
          </div>
          <div className="mt-6">
            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: '75%' }} className="bg-alabaster h-full" />
            </div>
            <p className="text-[10px] mt-3 font-semibold text-white/40 uppercase tracking-wider">Level 2: 75% Complete</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;