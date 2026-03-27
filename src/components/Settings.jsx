import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Palette, Database, Save, ArrowLeft, CheckCircle2 } from 'lucide-react';

const SettingsView = () => {
  const navigate = useNavigate();
  
  // Persistence Logic: Pull from localStorage on mount
  const [userName, setUserName] = useState(() => localStorage.getItem('nomad_name') || 'Ansh Bravo');
  const [darkMode, setDarkMode] = useState(() => JSON.parse(localStorage.getItem('nomad_dark_mode')) || false);
  const [showSavedToast, setShowSavedToast] = useState(false);

  const handleSave = () => {
    // Save to local storage
    localStorage.setItem('nomad_name', userName);
    localStorage.setItem('nomad_dark_mode', JSON.stringify(darkMode));
    
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 2500);
  };

  const handleClearData = () => {
    if (window.confirm("Are you sure? This will wipe your curated vault and preferences.")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="p-6 md:p-12 w-full max-w-4xl mx-auto font-jakarta bg-white min-h-screen pt-24 relative">
      
      {/* Success Toast */}
      <AnimatePresence>
        {showSavedToast && (
          <motion.div 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-10 left-1/2 -translate-x-1/2 z-[100] bg-black text-white px-6 py-4 rounded-2xl flex items-center gap-3 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/10"
          >
            <CheckCircle2 size={18} className="text-emerald-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Profile Synchronized</span>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="mb-12">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-black transition-colors mb-6 cursor-pointer group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Return to Vault
        </button>
        <h1 className="text-3xl font-extrabold tracking-tighter">Settings</h1>
        <p className="text-zinc-400 font-bold text-sm uppercase tracking-widest">Global Preferences</p>
      </header>

      <div className="space-y-12">
        {/* Section: Account */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center gap-3 md:flex-col md:items-start">
            <User className="text-zinc-900" size={20} />
            <h2 className="font-extrabold text-sm uppercase tracking-widest">Account</h2>
          </div>
          <div className="md:col-span-2 space-y-6 bg-zinc-50 p-8 rounded-[2rem] border border-zinc-100 shadow-sm">
            <div>
              <label className="block text-[10px] font-black uppercase mb-2 text-zinc-400">Display Name</label>
              <input 
                type="text" 
                value={userName} 
                onChange={(e) => setUserName(e.target.value)} 
                className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 font-bold focus:ring-2 focus:ring-black outline-none transition-all" 
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase mb-2 text-zinc-400">Current Rank</label>
              <select className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 font-bold outline-none cursor-pointer">
                <option>The New Sailor (Level 1)</option>
                <option disabled>Zen Explorer (Locked)</option>
              </select>
            </div>
          </div>
        </section>

        {/* Section: Experience */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center gap-3 md:flex-col md:items-start">
            <Palette className="text-zinc-900" size={20} />
            <h2 className="font-extrabold text-sm uppercase tracking-widest">Experience</h2>
          </div>
          <div className="md:col-span-2 bg-zinc-50 p-8 rounded-[2rem] border border-zinc-100 space-y-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold">Dark Aesthetic</p>
                <p className="text-xs text-zinc-400 font-medium">Toggle high-contrast dark mode</p>
              </div>
              <div 
                onClick={() => setDarkMode(!darkMode)}
                className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors duration-300 ${darkMode ? 'bg-black' : 'bg-zinc-200'}`}
              >
                 <motion.div 
                    animate={{ x: darkMode ? 24 : 4 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm" 
                 />
              </div>
            </div>
          </div>
        </section>

        {/* Section: System */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center gap-3 md:flex-col md:items-start">
            <Database className="text-zinc-900" size={20} />
            <h2 className="font-extrabold text-sm uppercase tracking-widest">System</h2>
          </div>
          <div className="md:col-span-2">
            <button 
              onClick={handleClearData}
              className="w-full text-left p-6 border border-rose-100 rounded-[2rem] hover:bg-rose-50 transition-colors group cursor-pointer"
            >
              <p className="font-bold text-rose-600">Clear All Vault Data</p>
              <p className="text-xs text-rose-400 font-medium">Wipe cache and local trip history.</p>
            </button>
          </div>
        </section>

        <footer className="pt-12 flex justify-end">
           <button 
            onClick={handleSave}
            className="flex items-center gap-3 bg-black text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-zinc-800 transition-all shadow-2xl cursor-pointer active:scale-95"
           >
             <Save size={16} /> Save Changes
           </button>
        </footer>
      </div>
    </div>
  );
};

export default SettingsView;