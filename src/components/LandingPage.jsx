// src/pages/LandingPage.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Star } from 'lucide-react';
import ill1 from '../assets/illustrations/Illustration-diagram-1.png'
import ill2 from '../assets/illustrations/Illustration-diagram-2.png'
import ill3 from '../assets/illustrations/Illustration-diagram-3.png'

// --- Import Accent Assets ---
// Assuming these are the paths, adjust if they differ
import boat from '../assets/illustrations/saild-boat.png';
import planeAccent from '../assets/illustrations/Yuppies - Airplane.png';
import bird from '../assets/illustrations/Hands - Bird.png';
import bagAccent from '../assets/illustrations/Hobbies - Suitcase.png';

const LandingPage = () => {
  return (
    <div className="flex-1 bg-gray-50 min-h-screen font-jakarta p-4 pt-24 lg:p-10 lg:pt-10 overflow-x-hidden">
      
      {/* 1. HERO / SEARCH SECTION */}
      <header className="mb-12 max-w-5xl mx-auto flex flex-col items-center relative">
        
        {/* --- ACCENT ILLUSTRATIONS --- */}
        {/* Boat (Top Left) */}
        <motion.img 
          src={boat} 
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-16 lg:-top-8 left-0 w-26 md:w-24  md:block opacity-80"
        />

        {/* Paper Plane (Top Right) */}
        <motion.img 
          src={planeAccent} 
          animate={{ x: [0, 10, 0], y: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 lg:-top-8 right-60 w-16 md:w-20  md:block opacity-80"
        />

        {/* Blue Bird (Far Right) */}
        <motion.img 
          src={bird} 
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-24 lg:top-0 -right-4 w-30 md:w-32  lg:block opacity-90"
        />

        {/* Suitcase (Bottom Left of Headline) */}
        <motion.img 
          src={bagAccent} 
          animate={{ rotate: [-2, 4, -6] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-12 left-10 w-20 md:w-28  md:block"
        />

        {/* Headline */}
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
        
        {/* Search Bar */}
        <div className="relative w-full max-w-2xl group z-10">
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
            <Search className="text-gray-400 group-focus-within:text-alabaster transition-colors" size={20} />
          </div>
          <input 
            type="text" 
            placeholder="Search destinations, hotels, or hidden gems..." 
            className="w-full bg-white border border-gray-200 py-4 lg:py-5 pl-14 pr-32 rounded-2xl shadow-sm focus:ring-4 focus:ring-alabaster/10 focus:border-alabaster outline-none transition-all text-sm font-medium"
          />
          <button className="absolute right-2.5 top-2.5 bg-midnight text-white px-6 py-2 rounded-xl font-bold text-sm hover:bg-midnight/90 transition-all shadow-md">
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
          <button className="text-alabaster font-bold text-sm hover:underline">View All</button>
        </div>

        <div className="flex space-x-6 overflow-x-auto pb-6 scrollbar-hide">
          {[1, 2, 3, 4].map((i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -8 }}
              className="min-w-70 md:min-w-[320px] h-95 bg-white rounded-4xl overflow-hidden shadow-sm border border-gray-100 relative group cursor-pointer"
            >
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent z-10" />
              <div className="w-full h-full bg-gray-200" /> 
              
              <div className="absolute bottom-0 p-6 z-20 w-full">
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest border border-white/30">
                    Must Visit
                  </span>
                  <div className="flex items-center text-white font-bold text-xs bg-black/20 backdrop-blur-sm px-2 py-1 rounded-lg">
                    <Star size={12} fill="#fbbf24" className="text-yellow-400 mr-1" /> 4.9
                  </div>
                </div>
                <h3 className="text-white text-xl font-bold">Bali, Indonesia</h3>
                <p className="text-white/70 text-xs flex items-center mt-1">
                  <MapPin size={12} className="mr-1 text-alabaster" /> Southeast Asia
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- DIAGRAM SECTION --- */}
<section className="mb-16 mt-8 max-w-5xl mx-auto px-4">
  <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-4">
    
    {/* Step 1 */}
    <div className="flex flex-col items-center">
      <div className="w-24 h-24 rounded-full bg-midnight flex items-center justify-center shadow-sm">
        <img src={ill1} alt="bag illustration" style={{transform: 'scale(1.6)'}}/>
      </div>
      <p className="mt-4 text-sm font-bold text-midnight text-center">Type your mood or a place <span className="block">you would like to go to</span></p>
    </div>

    {/* Arrow 1 - Touching Circle 1 */}
    <div className="hidden lg:flex flex-col items-center mb-10 -mx-12"> 
      <span className="text-[10px] font-black uppercase tracking-widest text-black mb-2 whitespace-nowrap text-center">
        Best places filtered only for you
      </span>
      <svg width="182" height="20" viewBox="0 0 182 20" fill="none" className="translate-x-1.25">
        <path 
          d="M0 10H172M172 10L164 2M172 10L164 18" 
          stroke="#000000" 
          strokeWidth="2" 
          strokeLinecap="round" 
        />
      </svg>
    </div>

    {/* Step 2 */}
    <div className="flex flex-col items-center">
      <div className="w-24 h-24 rounded-full flex items-center justify-center bg-midnight shadow-sm">
        <img src={ill2} alt="a hotel and a plane" style={{transform: 'scale(1.6)'}}/>
      </div>
      <p className="mt-4 text-sm font-bold text-midnight text-center">Select the best options for <span className="block">stay and flights</span></p>
    </div>

    {/* Arrow 2 - Fixed Overflow & Width */}
    <div className="hidden lg:flex flex-col items-center mb-10 -mx-12"> 
      <span className="text-[10px] font-black uppercase tracking-widest text-black mb-2 whitespace-nowrap text-center leading-tight">
        Budget Friendly Trip <br/>ready for you
      </span>
      {/* Width matched to 182 to fit the H172 path */}
      <svg width="182" height="20" viewBox="0 0 182 20" fill="none" className="-translate-x-1.25">
        <path 
          d="M0 10H172M172 10L164 2M172 10L164 18" 
          stroke="#000000" 
          strokeWidth="2" 
          strokeLinecap="round" 
        />
      </svg>
    </div>

    {/* Step 3 */}
    <div className="flex flex-col items-center">
      <div className="w-24 h-24 rounded-full flex items-center justify-center bg-midnight shadow-sm">
        <img src={ill3} alt="a packed bag ready for a trip" style={{transform: 'scale(1.6)'}}/>
      </div>
      <p className="mt-4 text-sm font-bold text-midnight text-center">Enjoy Your Trip!</p>
    </div>

  </div>
</section>

      {/* 4 YOUR STATS / TRIP PLANNER */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="bg-midnight p-8 rounded-4xl text-white shadow-xl flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-alabaster/20 rounded-full blur-3xl" />
          
          <div>
            <p className="text-alabaster font-black uppercase text-[10px] tracking-[0.2em] mb-3">Vault Status</p>
            <h2 className="text-3xl font-bold">14</h2>
            <p className="text-white/60 text-xs font-medium">Saved Locations</p>
          </div>
          <div className="mt-6">
            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '75%' }}
                className="bg-alabaster h-full" 
              />
            </div>
            <p className="text-[10px] mt-3 font-semibold text-white/40 uppercase tracking-wider">Level 2: 75% Complete</p>
          </div>
        </div>
      </section>
    </div>

  );
};

export default LandingPage;