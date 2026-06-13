import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '#' },
    { name: 'Our Programs', path: '#' },
    { name: 'Get Involved', path: '#' },
    { name: 'Gallery', path: '#' },
    { name: 'Contact Us', path: '#' },
    { name: 'Admin', path: '/admin' },
  ];

  const isActive = (path) => {
    return location.pathname === path && path !== '#';
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <img src="/logo.png" alt="NayePankh Logo" className="h-10 w-auto object-contain" />
              <div>
                <span className="font-bold text-xl text-gray-900 block leading-none">NayePankh</span>
                <span className="text-sm text-gray-500 font-medium">Foundation</span>
              </div>
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(link.path) || (link.name === 'Get Involved' && location.pathname === '/register') ? 'text-primary border-b-2 border-primary py-1' : 'text-gray-700'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/register"
              className="ml-8 inline-flex items-center justify-center px-6 py-2.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark transition-colors"
            >
              Volunteer Registration
            </Link>
          </div>

          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/register"
              className="block w-full text-center mt-4 px-4 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary hover:bg-primary-dark"
              onClick={() => setIsOpen(false)}
            >
              Volunteer Registration
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
