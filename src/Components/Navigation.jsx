import React, { useState, useEffect } from 'react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('home');
  
  // Handle scroll effect for navigation
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Navigation links
  const navLinks = [
    { id:'/', label: 'Home' },
    { id:'#services', label: 'Services' },
    { id:'/portfolio', label: 'Portfolio' },
    { id:'/aboutus', label: 'About Us' },
    { id:'/contact', label: 'Contact' }
  ];
  
  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'py-2 bg-[#0A1828]/90 backdrop-blur-md shadow-lg' 
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <a href="#" className="flex items-center">
              <div className="relative w-10 h-10 mr-3">
                {/* Animated logo */}
                <div className="absolute inset-0 bg-[#178582] rounded-lg rotate-45 transform hover:rotate-0 transition-transform duration-300"></div>
                <div className="absolute inset-0 border-2 border-[#BFA181] rounded-lg -rotate-45 transform hover:rotate-0 transition-transform duration-300 delay-75"></div>
                <div className="absolute inset-0 flex items-center justify-center text-white font-bold">
                  <span className="transform -rotate-45 hover:rotate-0 transition-transform duration-300">BS</span>
                </div>
              </div>
              <span className="text-white font-semibold text-xl tracking-tight">
                <span className="text-[#178582]">Brocode</span>
                <span className="text-[#BFA181]">Studio</span>
              </span>
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map(link => (
              <a 
                key={link.id}
                href={`${link.id}`}
                className={`relative px-1 py-2 text-sm font-medium transition-colors duration-300 group ${
                  activeLink === link.id 
                    ? 'text-[#178582]' 
                    : 'text-gray-300 hover:text-white'
                }`}
                onClick={() => setActiveLink(link.id)}
              >
                {link.label}
                <span 
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#178582] transform origin-left transition-transform duration-300 ${
                    activeLink === link.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                ></span>
              </a>
            ))}
            
            {/* CTA Button */}
            <a 
              href="#contact"
              className="ml-4 px-5 py-2 bg-[#178582] text-white rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 border border-transparent hover:border-[#BFA181]"
            >
              Get in Touch
            </a>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              className="inline-flex items-center justify-center p-2 rounded-md text-white focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <div className="w-6 h-6 relative">
                <span 
                  className={`absolute h-0.5 w-full bg-current transform transition duration-300 ease-in-out ${
                    isMobileMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'
                  }`}
                ></span>
                <span 
                  className={`absolute h-0.5 bg-current transform transition-all duration-300 ease-in-out ${
                    isMobileMenuOpen ? 'w-0 opacity-0' : 'w-full opacity-100'
                  }`}
                ></span>
                <span 
                  className={`absolute h-0.5 w-full bg-current transform transition duration-300 ease-in-out ${
                    isMobileMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div 
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pt-2 pb-4 bg-[#0A1828]/95 backdrop-blur-md space-y-1 sm:px-3 border-t border-[#178582]/20">
          {navLinks.map(link => (
            <a
              key={link.id}
              href={`${link.id}`}
              className={`block px-3 py-3 rounded-md text-base font-medium transition-colors duration-200 ${
                activeLink === link.id
                  ? 'text-[#178582] bg-[#178582]/10'
                  : 'text-gray-300 hover:text-white hover:bg-[#178582]/5'
              }`}
              onClick={() => {
                setActiveLink(link.id);
                setIsMobileMenuOpen(false);
              }}
            >
              {link.label}
            </a>
          ))}
          
          {/* Mobile CTA */}
          <div className="pt-2">
            <a
              href="#contact"
              className="block w-full text-center px-5 py-3 bg-[#178582] text-white rounded-lg shadow-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
      
      {/* Progress indicator */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#0A1828]/50">
        <div 
          className="h-full bg-gradient-to-r from-[#178582] to-[#BFA181] transition-all duration-300"
          style={{ 
            width: `${Math.min(
              (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100, 
              100
            )}%` 
          }}
        ></div>
      </div>
    </nav>
  );
};

export default Navigation;