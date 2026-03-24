import { React, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/Trip Nomad logo.png';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: 'Home', active: true },
    { name: 'Trending Places', active: false },
    { name: 'Your Vault', active: false },
    { name: 'Saved Places', active: false },
    { name: 'Hotels', active: false },
    { name: 'Settings', active: false },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col w-64 h-screen bg-white border-r border-gray-200 font-jakarta overflow-y-auto overflow-x-hidden relative z-40">
      {/* Logo Area */}
      <img src={logo} alt="Trip Nomad Logo" className='w-full pt-8 pb-4' />

      {/* Profile Card */}
      <div className="mx-4 mb-8 p-4 bg-alabaster rounded-xl text-blush flex items-center space-x-4 shadow-lg">
        <div className="w-12 h-12 rounded-full bg-blush/20 shrink-0 border border-blush/30" />
        <div>
          <p className="text-sm font-bold">Alex</p>
          <p className="text-[10px] opacity-70 uppercase tracking-widest">Nomad Level-1</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => (
          <motion.button
            key={item.name}
            whileHover={{ x: item.active ? 0 : 4 }}
            className={`w-full text-left px-4 py-3 text-sm font-semibold transition-colors ${
              item.active
                ? 'bg-midnightFade text-white shadow-md border-l-8 border-midnight'
                : 'text-gray-500 hover:bg-gray-100 hover:text-midnight'
            }`}
          >
            {item.name}
          </motion.button>
        ))}
      </nav>

      {/* Log Out */}
      <div className="p-4 border-t border-gray-100">
        <button className="w-full text-left px-4 py-2 text-sm font-bold text-red-500 hover:bg-red-100 rounded-lg transition-colors">
          Log Out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* 1. CUSTOM TWO-BAR HAMBURGER */}
      <motion.div animate ={{
        backgroundColor: isOpen ? 'black' : 'transparent',
        paddingRight: isOpen ? '215px' : "0px" 
      }} 
      className={isOpen ? "lg:hidden fixed z-70 bg-black pr-54" : "lg:hidden fixed z-70 "}>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="flex flex-col justify-center items-center w-10 h-10 space-y-1.5 focus:outline-none"
        >
          <motion.span
            animate={{ 
              rotate: isOpen ? 45 : 0, 
              y: isOpen ? 4 : 0,
              width: isOpen ? "20px" : "24px", 
              backgroundColor: isOpen ? 'white' : 'black'
            }}
            className="h-0.5 bg-white rounded-full block"
          />
          <motion.span
            animate={{ 
              rotate: isOpen ? -45 : 0, 
              y: isOpen ? -4 : 0,
              width: "20px" ,
              backgroundColor: isOpen ? 'white' : 'black'
            }}
            className="h-0.5 bg-white rounded-full block"
          />

          
        </button>
      </motion.div>

      {/* 2. MOBILE DRAWER */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 lg:hidden "
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-60 lg:hidden"
            >
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 3. DESKTOP VIEW */}
      <div className="hidden lg:block sticky top-0 h-screen">
        <SidebarContent />
      </div>
    </>
  );
};

export default Sidebar;