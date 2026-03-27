import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import logo from '../assets/Trip Nomad logo.png';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Trending Places', path: '/trending' },
    { name: 'Your Vault', path: '/vault' },
    { name: 'Favorite Places', path: '/favorites' },
    { name: 'Hotels & Flights', path: '/bookings' },
    { name: 'Settings', path: '/settings' },
  ];

  // We pass isMobile to avoid LayoutID conflicts between Desktop and Mobile Sidebar
  const SidebarContent = ({ isMobile = false }) => (
    <div className="flex flex-col w-64 h-screen bg-white border-r border-gray-200 font-jakarta overflow-y-auto overflow-x-hidden relative z-40">
      <img src={logo} alt="Trip Nomad Logo" className='w-full pt-8 pb-4 px-4' />

      <div className="mx-4 mb-8 p-4 bg-zinc-50 rounded-2xl text-black flex items-center space-x-4 shadow-sm border border-zinc-100">
        <div className="w-12 h-12 rounded-full bg-zinc-200 shrink-0 border border-zinc-300 overflow-hidden" />
        <div>
          <p className="text-sm font-black tracking-tight text-midnight">Alex</p>
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Nomad Level-1</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => setIsOpen(false)}
            className={({ isActive }) => `
              relative flex items-center px-6 py-4 text-sm font-bold transition-all duration-300
              ${isActive ? 'text-white' : 'text-zinc-500 hover:bg-zinc-50 hover:text-black'}
            `}
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div 
                    layoutId={isMobile ? "activeTabMobile" : "activeTabDesktop"}
                    className="absolute inset-y-2 left-3 right-3 bg-black rounded-xl z-[-1]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{item.name}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-6 border-t border-gray-100">
        <button className="w-full text-left px-4 py-3 text-xs font-black uppercase tracking-widest text-red-500 hover:bg-red-50 rounded-xl transition-all cursor-pointer">
          Log Out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* 1. MOBILE HAMBURGER TOGGLE */}
      <div className="lg:hidden fixed top-2 left-3 z-[70]">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={`flex flex-col justify-center items-center w-12 h-12 space-y-1.5 focus:outline-none cursor-pointer transition-all duration-300 ${isOpen ? 'bg-transparent shadow-none' : 'bg-white shadow-xl rounded-full border border-zinc-100'}`}
        >
          <motion.span
            animate={{ 
              rotate: isOpen ? 45 : 0, 
              y: isOpen ? 4 : 0,
              width: "24px", 
              backgroundColor: isOpen ? '#ef4444' : '#71717a' // Red when open

            }}
            className="h-0.5 rounded-full block"
          />
          <motion.span
            animate={{ 
              rotate: isOpen ? -45 : 0, 
              y: isOpen ? -4 : 0,
              width: "24px",
              backgroundColor: isOpen ? '#ef4444' : '#71717a' // Red when open
            }}
            className="h-0.5 rounded-full block"
          />
        </button>
      </div>

      {/* 2. MOBILE DRAWER */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <div key="mobile-container">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-md z-50 lg:hidden cursor-pointer"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-[60] lg:hidden"
            >
              <SidebarContent isMobile={true} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. DESKTOP VIEW */}
      <div className="hidden lg:block sticky top-0 h-screen">
        <SidebarContent isMobile={false} />
      </div>
    </>
  );
};

export default Sidebar;