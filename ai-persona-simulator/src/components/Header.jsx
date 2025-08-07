import React from 'react'
import { FireIcon, ToolsIcon } from './Icons'

const Header = ({ setPage }) => {
  const navItems = ['Home', 'Tools', 'About', 'Contact'];
  
  return (
    <header className="sticky top-0 z-50 glass-nav fade-in">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="flex items-center cursor-pointer" onClick={() => setPage('Home')}>
          <FireIcon />
          <span className="text-2xl font-bold text-white">Matchbox Labs</span>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map(item => (
            <a 
              key={item} 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                setPage(item);
              }} 
              className="text-gray-300 hover:text-white transition-colors duration-300 relative group"
            >
              {item}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
            </a>
          ))}
        </div>
        <div className="md:hidden">
          <button 
            onClick={() => alert('Mobile menu coming soon!')} 
            className="text-white focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header
