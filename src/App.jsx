import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/sidebar';
import LandingPage from './components/LandingPage';
import TrendingPlacesPage from './components/TrendingPlacesPage';
import SearchView from './components/SearchView';
import VaultView from './components/Vault';
import FavoritePlaces from './components/FavoritePlaces';
import SettingsView from './components/Settings';
import HotelsFlightsView from './components/HotelsAndFlights';
import Footer from './components/Footer';

function App() {
  // We keep searchQuery here so it can be passed to SearchView, 
  // though later we can move this to URL params for even better persistence!
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Router>
      <div className="flex h-screen overflow-hidden bg-gray-50 font-jakarta">
        {/* Sidebar is now outside Routes so it never re-renders or disappears */}
        <Sidebar />
        
        <main className="flex-1 h-full overflow-y-auto">
          <Routes>
            {/* Home Route */}
            <Route path="/" element={
              <>
                <LandingPage setSearchQuery={setSearchQuery} />
                <Footer />
              </>
            } />

            {/* Application Routes */}
            <Route path="/search" element={<SearchView initialQuery={searchQuery} />} />
            <Route path="/trending" element={<TrendingPlacesPage />} />
            <Route path="/vault" element={<VaultView />} />
            <Route path="/favorites" element={<FavoritePlaces />} />
            <Route path="/bookings" element={<HotelsFlightsView />} />
            <Route path="/settings" element={<SettingsView />} />

            {/* Redirect any unknown routes back to Home */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;