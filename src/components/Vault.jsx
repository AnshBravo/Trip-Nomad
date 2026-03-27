import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // Added for navigation
import { Globe, PiggyBank, Anchor, Calendar, Plane, Hotel } from 'lucide-react';

const VaultView = () => {
  const navigate = useNavigate(); // Hook to trigger route changes

  const stats = [
    { label: "Total Countries Visited", value: "0", icon: <Globe size={18} />, color: "bg-[#4338ca]" },
    { label: "Total Savings", value: "$0", icon: <PiggyBank size={18} />, color: "bg-[#71b100]" },
    { label: "Nomad Level 1", value: "The New Sailor", icon: <Anchor size={18} />, color: "bg-[#162a1c]" },
  ];

  const upcomingTrip = {
    destination: "japan",
    status: "Planned(not booked yet)",
    budget: "$5000",
    daysLeft: 14,
    images: [
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&q=80",
      "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=400&q=80",
      "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=400&q=80",
      "https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=400&q=80"
    ]
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="p-6 md:p-12 w-full max-w-6xl mx-auto font-jakarta text-black bg-white"
    >
      <header className="mb-10 flex items-center justify-between">
        {/* Back button added for better UX in a routed app */}
        <button 
          onClick={() => navigate(-1)} 
          className="text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-black transition-colors cursor-pointer"
        >
          ← Back
        </button>
        <h1 className="text-xl md:text-2xl font-extrabold tracking-tight">Your Vault</h1>
        <div className="w-10" /> {/* Spacer for centering */}
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
        {stats.map((stat, i) => (
          <div 
            key={i}
            className={`${stat.color} p-6 rounded-xl text-white flex flex-col items-center text-center shadow-md`}
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2 opacity-80">{stat.label}</p>
            <h3 className="text-lg md:text-xl font-extrabold">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Upcoming Trip Section */}
      <section className="mb-16">
        <h3 className="text-sm font-extrabold mb-6 text-zinc-900">Upcoming Trip – in {upcomingTrip.daysLeft} days</h3>

        {/* Clicking the card could navigate to a detailed view or booking page */}
        <div 
          onClick={() => navigate('/bookings')}
          className="relative flex flex-col lg:flex-row items-stretch bg-white rounded-2xl overflow-hidden border border-zinc-200 shadow-sm min-h-[320px] cursor-pointer group"
        >
          
          {/* Details Card */}
          <div className="w-full lg:w-[45%] bg-[#262460] p-8 md:p-10 text-white space-y-6 z-10 flex flex-col justify-center transition-colors group-hover:bg-[#1e1c4d]">
            <div>
              <h4 className="text-2xl md:text-3xl font-extrabold mb-1 uppercase">
                {upcomingTrip.destination} - {upcomingTrip.status}
              </h4>
            </div>
            
            <div className="space-y-3 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2">
                 <p className="text-lg font-bold tracking-tight">budget—{upcomingTrip.budget}</p>
              </div>
              <p className="text-lg font-bold opacity-60 flex items-center gap-2"><Plane size={16}/> No booked Flights</p>
              <p className="text-lg font-bold opacity-60 flex items-center gap-2"><Hotel size={16}/> No booked Hotels</p>
            </div>
          </div>

          {/* Perfectly Centered Image Stack */}
          <div className="flex-1 relative flex items-center justify-center bg-white py-24 lg:py-0 overflow-hidden">
            <div className="relative w-full flex items-center justify-center">
              {upcomingTrip.images.map((img, idx) => (
                <motion.div
                  key={idx}
                  className="absolute w-40 h-28 md:w-52 md:h-36 rounded-xl overflow-hidden border-4 border-white shadow-2xl bg-zinc-100"
                  style={{ 
                    left: `50%`,
                    x: `calc(-50% + ${(idx - 1.5) * 45}px)`,
                    zIndex: idx,
                    rotate: idx % 2 === 0 ? -4 : 4
                  }}
                  whileHover={{ 
                    y: -15, 
                    scale: 1.05,
                    zIndex: 50,
                    rotate: 0,
                    transition: { type: 'spring', stiffness: 300 } 
                  }}
                >
                  <img src={img} className="w-full h-full object-cover grayscale-[0.1] hover:grayscale-0 transition-all duration-500" alt="trip" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="text-center py-10 border-t border-zinc-100">
        <p className="text-zinc-400 font-extrabold text-[10px] uppercase tracking-[0.3em]">No previous Trips!</p>
      </footer>
    </motion.div>
  );
};

export default VaultView;