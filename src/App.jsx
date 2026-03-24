import React from 'react';
import Sidebar from './components/sidebar';
import LandingPage from './components/LandingPage';
import Footer from './components/Footer'
function App() {
  return (
<div className="flex h-screen overflow-hidden bg-gray-50">
  <Sidebar />
  <main className="flex-1 h-full overflow-y-auto">
    <LandingPage />
    <Footer/>
  </main>
  
</div>
  );
}

export default App;
