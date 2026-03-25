import { motion } from "motion/react";
import { X, MapPin, Calendar, Star } from "lucide-react";

const LocationDetail = ({ location, onClose }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-zinc-900 border border-zinc-800 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl relative"
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-2 bg-black/50 hover:bg-black/80 rounded-full text-white transition-colors"
        >
          <X size={24} />
        </button>

        {/* Hero Image */}
        <div className="h-80 w-full relative">
          <img 
            src={`https://source.unsplash.com/featured/?${location.city},${location.vibe}`} 
            className="w-full h-full object-cover"
            alt={location.city}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
          <div className="absolute bottom-8 left-8">
            <h2 className="text-5xl font-bold text-white tracking-tighter">{location.city}</h2>
            <p className="text-zinc-400 flex items-center gap-2 mt-2">
              <MapPin size={18} className="text-blue-500" /> {location.country}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <section>
              <h3 className="text-xl font-semibold text-white mb-3">About this journey</h3>
              <p className="text-zinc-400 leading-relaxed text-lg">
                {location.description} This destination perfectly matches your interest in <strong>{location.vibe}</strong> travel.
              </p>
            </section>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-zinc-800/50 rounded-2xl border border-zinc-700/50">
                <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">Expertise Level</p>
                <p className="text-white font-medium">{location.level}</p>
              </div>
              <div className="p-4 bg-zinc-800/50 rounded-2xl border border-zinc-700/50">
                <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">Vibe Category</p>
                <p className="text-white font-medium">{location.vibe}</p>
              </div>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-4">
             <button className="w-full py-4 bg-white text-black font-bold rounded-2xl hover:bg-zinc-200 transition-all active:scale-95">
               Book Trip Now
             </button>
             <button className="w-full py-4 bg-zinc-800 text-white font-bold rounded-2xl border border-zinc-700 hover:bg-zinc-700 transition-all">
               Save to Vault
             </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LocationDetail;