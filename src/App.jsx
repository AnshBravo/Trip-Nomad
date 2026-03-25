import React, { useState } from 'react';
import Sidebar from './components/sidebar';
import LandingPage from './components/LandingPage';
import TrendingPlacesPage from './components/TrendingPlacesPage';
import SearchView from './components/SearchView';
import Footer from './components/Footer';

function App() {
  const [activePage, setActivePage] = useState('Home');
  const [searchQuery, setSearchQuery] = useState('');

  // navigateTo('Search', query) or navigateTo('Home') etc.
  const navigateTo = (page, query = '') => {
    setActivePage(page);
    if (query !== undefined) setSearchQuery(query);
  };

  const renderPage = () => {
    switch (activePage) {
      case 'Search':
        return <SearchView initialQuery={searchQuery} onNavigate={navigateTo} />;
      case 'Trending Places':
        return <TrendingPlacesPage onNavigate={navigateTo} />;
      default:
        return (
          <>
            <LandingPage onNavigate={navigateTo} />
            <Footer />
          </>
        );
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar activePage={activePage} onNavigate={navigateTo} />
      <main className="flex-1 h-full overflow-y-auto">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
