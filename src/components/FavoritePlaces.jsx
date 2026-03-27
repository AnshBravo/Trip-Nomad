import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // Added for navigation
import { Heart, MapPin, Trash2, ExternalLink } from 'lucide-react';

const FavoritePlaces = () => {
  const navigate = useNavigate(); // Hook for routing

  // Japan as the default entry
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      city: "Kyoto",
      country: "Japan",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80",
      description: "Timeless temples, traditional teahouses, and sublime gardens.",
      vibe: "Zen"
    },
    {
      id: 2,
      city: "Tokyo",
      country: "Japan",
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80",
      description: "Neon-lit skyscrapers meeting historic shrines in a high-tech sprawl.",
      vibe: "Futuristic"
    }
  ]);

  const removeFavorite = (id) => {
    setFavorites(favorites.filter(place => place.id !== id));
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="p-6 md:p-12 w-full max-w-7xl mx-auto font-jakarta bg-white min-h-screen pt-24"
    >
      <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tighter mb-2">Favorite Places</h1>
          <p className="text-zinc-400 font-bold text-sm uppercase tracking-widest">Your curated travel collection</p>
        </div>
        <div className="flex items-center gap-2 text-rose-500 bg-rose-50 px-4 py-2 rounded-full">
          <Heart size={16} fill="currentColor" />
          <span className="text-xs font-black uppercase tracking-tighter">{favorites.length} Saved</span>
        </div>
      </header>

      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {favorites.map((place) => (
              <motion.div
                key={place.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="group relative bg-white border border-zinc-100 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
              >
                {/* Image Container */}
                <div className="aspect-[4/5] overflow-hidden relative">
                  <img 
                    src={place.image} 
                    alt={place.city} 
                    className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  
                  {/* Action Buttons */}
                  <div className="absolute top-6 right-6 flex flex-col gap-3 translate-x-12 group-hover:translate-x-0 transition-transform duration-500">
                    <button 
                      onClick={() => removeFavorite(place.id)}
                      className="p-3 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-2xl hover:bg-rose-500 hover:border-rose-500 transition-all cursor-pointer"
                    >
                      <Trash2 size={18} />
                    </button>
                    <button 
                      // Navigates to search page and passes the city as state
                      onClick={() => navigate('/search', { state: { query: place.city } })}
                      className="p-3 bg-white text-black rounded-2xl hover:bg-zinc-100 transition-all cursor-pointer"
                    >
                      <ExternalLink size={18} />
                    </button>
                  </div>

                  <div className="absolute bottom-8 left-8 text-white">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] mb-2 block opacity-80">{place.vibe}</span>
                    <h2 className="text-3xl font-extrabold tracking-tighter leading-none">{place.city}</h2>
                    <p className="flex items-center gap-1.5 text-sm font-bold opacity-80 mt-1">
                      <MapPin size={14} /> {place.country}
                    </p>
                  </div>
                </div>

                {/* Description info */}
                <div className="p-8">
                  <p className="text-zinc-500 text-sm font-medium leading-relaxed italic">
                    "{place.description}"
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-40 border-2 border-dashed border-zinc-100 rounded-[3rem]">
          <Heart size={48} className="text-zinc-200 mb-6" />
          <p className="text-zinc-400 font-extrabold uppercase tracking-widest text-sm">Your list is currently empty</p>
          <button 
            onClick={() => navigate('/trending')}
            className="mt-6 px-8 py-3 bg-black text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-zinc-800 transition-all cursor-pointer"
          >
            Explore Destinations
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default FavoritePlaces;