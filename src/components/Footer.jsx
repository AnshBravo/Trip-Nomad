// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-alabaster text-white pt-16 pb-8 px-6 lg:px-20 font-jakarta w-full mt-auto">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row-reverse justify-between items-start gap-12 lg:gap-0">
          
          {/* Column 1: Logo & Branding (Right side on Desktop) */}
          <div className="flex flex-col lg:items-end">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-2xl font-black tracking-tighter">Trip Nomad</h2>
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
                 <span className="text-alabaster font-black text-xl">T</span>
              </div>
            </div>
            <p className="text-white/50 text-xs lg:text-right max-w-[240px] leading-relaxed">
              The ultimate workspace for modern explorers to plan, track, and elevate their journeys.
            </p>
          </div>

          {/* Column 2: Links (Left side on Desktop) */}
          <div className="grid grid-cols-2 gap-16 md:gap-32">
            <div className="flex flex-col gap-4">
              <h4 className="font-black uppercase tracking-[0.2em] text-[10px] opacity-40">Explore</h4>
              <ul className="flex flex-col gap-3 text-sm font-bold">
                <li className="hover:opacity-70 cursor-pointer">Destinations</li>
                <li className="hover:opacity-70 cursor-pointer">Itineraries</li>
                <li className="hover:opacity-70 cursor-pointer">Nomad Perks</li>
              </ul>
            </div>
            
            <div className="flex flex-col gap-4">
              <h4 className="font-black uppercase tracking-[0.2em] text-[10px] opacity-40">Support</h4>
              <ul className="flex flex-col gap-3 text-sm font-bold">
                <li className="hover:opacity-70 cursor-pointer">Help Center</li>
                <li className="hover:opacity-70 cursor-pointer">Privacy Policy</li>
                <li className="hover:opacity-70 cursor-pointer">Contact</li>
              </ul>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-30">
            © 2026 Trip Nomad — All Rights Reserved
          </p>
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest opacity-50">
            <span className="hover:opacity-100 cursor-pointer transition-all">Twitter</span>
            <span className="hover:opacity-100 cursor-pointer transition-all">Instagram</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;