import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './components/HomePage'
import ToolsPage from './components/ToolsPage'
import AboutPage from './components/AboutPage'
import ContactPage from './components/ContactPage'

function App() {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState('Home');

  useEffect(() => {
    const timer = setTimeout(() => {
      const loader = document.getElementById('boot-loader');
      if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
          loader.style.display = 'none';
          setLoading(false);
        }, 800);
      }
    }, 2500); // Boot animation duration

    return () => clearTimeout(timer);
  }, []);
  
  const renderPage = () => {
    switch (page) {
      case 'Home':
        return <HomePage setPage={setPage} />;
      case 'Tools':
        return <ToolsPage />;
      case 'About':
        return <AboutPage />;
      case 'Contact':
        return <ContactPage />;
      default:
        return <HomePage setPage={setPage} />;
    }
  };

  if (loading) {
    return null; // The boot loader is handled in HTML
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header setPage={setPage} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}

export default App
