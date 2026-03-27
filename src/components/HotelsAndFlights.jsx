import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // Added for navigation
import { Plane, Hotel, X, ExternalLink, ArrowRight, ExternalLinkIcon, ArrowLeft } from 'lucide-react';

const HotelsFlightsView = () => {
  const navigate = useNavigate(); // Hook for routing
  const [selectedBundle, setSelectedBundle] = useState(null);
  
  // State to track "Booked/Visited" links for the quick-access bar
  const [activeBookings, setActiveBookings] = useState([
    { id: 'f1', type: 'flight', name: 'JAL Flight 004', link: 'https://expedia.com' },
    { id: 'h1', type: 'hotel', name: 'Park Hyatt Tokyo', link: 'https://booking.com' }
  ]);

  const bundles = [
    {
      id: 1,
      destination: "Tokyo, Japan",
      image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&q=80",
      flight: { airline: "Japan Airlines", price: "$840", link: "https://expedia.com" },
      hotels: [
        { name: "Park Hyatt Tokyo", price: "$450/night", link: "https://booking.com" },
        { name: "Trunk Hotel", price: "$280/night", link: "https://booking.com" }
      ]
    }
  ];

  return (
    <div className="p-4 md:p-12 w-full max-w-5xl mx-auto font-jakarta bg-white min-h-screen relative pt-24">
      <header className="mb-12 flex items-center justify-between">
        <div>
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-black transition-colors mb-4 cursor-pointer"
          >
            <ArrowLeft size={14} /> Back
          </button>
          <h1 className="text-3xl font-extrabold tracking-tighter">Bookings</h1>
          <p className="text-zinc-400 font-bold text-[10px] uppercase tracking-[0.3em]">Affiliate Curations</p>
        </div>
      </header>

      {/* 1. QUICK ACCESS BAR */}
      <AnimatePresence>
        {activeBookings.length > 0 && (
          <motion.section 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex items-center justify-between mb-4">
               <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 italic">Currently Booking</h3>
               <button onClick={() => setActiveBookings([])} className="text-[9px] font-bold text-zinc-300 hover:text-rose-500 transition-colors cursor-pointer">Clear All</button>
            </div>
            
            <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
              {activeBookings.map((item) => (
                <a 
                  key={item.id}
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-shrink-0 flex items-center gap-3 bg-zinc-50 border border-zinc-100 px-5 py-4 rounded-2xl hover:bg-black hover:text-white transition-all group shadow-sm"
                >
                  <div className={`p-2 rounded-lg ${item.type === 'flight' ? 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-500 group-hover:text-white' : 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white'}`}>
                    {item.type === 'flight' ? <Plane size={14} /> : <Hotel size={14} />}
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-black uppercase leading-none mb-1 opacity-50">{item.type}</p>
                    <p className="text-xs font-extrabold whitespace-nowrap">{item.name}</p>
                  </div>
                  <ExternalLinkIcon size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* 2. BUNDLE LIST */}
      <div className="grid grid-cols-1 gap-6">
        {bundles.map((bundle) => (
          <motion.div 
            key={bundle.id}
            whileHover={{ scale: 1.01 }}
            className="group bg-zinc-50 border border-zinc-100 rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row cursor-pointer"
            onClick={() => setSelectedBundle(bundle)}
          >
            <div className="w-full md:w-64 h-48 md:h-auto overflow-hidden">
              <img src={bundle.image} className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-500" />
            </div>
            <div className="p-8 flex-1 flex items-center justify-between">
              <div>
                <h2 className="text-xl md:text-2xl font-black tracking-tighter">{bundle.destination}</h2>
                <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mt-1">Starting from {bundle.flight.price}</p>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-black text-white rounded-full flex items-center justify-center group-hover:bg-indigo-600 transition-all">
                <ArrowRight size={20} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 3. MODAL (Detail View) */}
      <AnimatePresence>
        {selectedBundle && (
          <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setSelectedBundle(null)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm cursor-pointer"
            />
            
            <motion.div 
              initial={{ y: 50, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              exit={{ y: 50, opacity: 0 }}
              onClick={(e) => e.stopPropagation()} 
              className="relative w-full max-w-2xl bg-white rounded-[2.5rem] overflow-hidden shadow-2xl z-10 max-h-[85vh] overflow-y-auto no-scrollbar"
            >
              <div className="relative h-44">
                <img src={selectedBundle.image} className="w-full h-full object-cover" alt="destination" />
                <button 
                  onClick={() => setSelectedBundle(null)} 
                  className="absolute top-4 right-4 z-20 p-2 bg-black/50 text-white rounded-full backdrop-blur-md hover:bg-black transition-all cursor-pointer"
                >
                  <X size={20} />
                </button>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <h2 className="absolute bottom-6 left-8 text-2xl font-black text-white tracking-tighter">
                  {selectedBundle.destination}
                </h2>
              </div>

              <div className="p-8 space-y-8">
                <div className="flex items-center justify-between bg-zinc-50 p-6 rounded-2xl">
                  <div className="flex items-center gap-4">
                    <Plane className="text-indigo-600" size={20} />
                    <div>
                      <p className="font-extrabold text-sm">{selectedBundle.flight.airline}</p>
                      <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                        Best Connection • {selectedBundle.flight.price}
                      </p>
                    </div>
                  </div>
                  <a 
                    href={selectedBundle.flight.link} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="bg-black text-white px-5 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 transition-all cursor-pointer"
                  >
                    Book
                  </a>
                </div>

                <div className="space-y-3">
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-300">Curated Stays</p>
                  {selectedBundle.hotels.map((hotel, i) => (
                    <div key={i} className="flex items-center justify-between p-5 border border-zinc-100 rounded-2xl group/hotel hover:border-black transition-all">
                      <div className="flex items-center gap-4">
                        <Hotel className="text-emerald-600" size={18} />
                        <div>
                          <p className="font-extrabold text-sm">{hotel.name}</p>
                          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{hotel.price}</p>
                        </div>
                      </div>
                      <a 
                        href={hotel.link} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="p-3 bg-zinc-100 rounded-xl group-hover/hotel:bg-black group-hover/hotel:text-white transition-all cursor-pointer"
                      >
                        <ExternalLink size={16} />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HotelsFlightsView;