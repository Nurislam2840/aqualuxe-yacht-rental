import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import WishlistModal from './WishlistModal';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const { theme, toggleTheme, currency, setCurrency, wishlist } = useApp();
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/boats', label: 'Boats' },
    { path: '/blog', label: 'Blog' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <header className="bg-navy dark:bg-darkCard py-4 px-4 md:px-12 flex justify-between items-center sticky top-0 z-50 shadow-md transition-colors duration-300">
        <Link to="/" className="text-white text-2xl font-bold font-playfair">AquaLuxe</Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 text-white text-sm font-medium">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} className={`transition ${isActive(link.path) ? 'text-gold font-semibold' : 'hover:text-gold'}`}>
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 md:gap-3">
          <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="hidden sm:block bg-white/10 text-white text-xs px-2 py-1.5 rounded-lg outline-none border border-white/20 cursor-pointer">
            <option value="USD" className="text-navy">USD $</option>
            <option value="EUR" className="text-navy">EUR €</option>
            <option value="GBP" className="text-navy">GBP £</option>
            <option value="BDT" className="text-navy">BDT ৳</option>
          </select>

          <button onClick={toggleTheme} className="text-white text-base w-9 h-9 rounded-full bg-white/10 hover:bg-gold hover:text-navy transition flex items-center justify-center">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          <button onClick={() => setIsWishlistOpen(true)} className="text-white text-base w-9 h-9 rounded-full bg-white/10 hover:bg-gold hover:text-navy transition relative flex items-center justify-center">
            ❤️
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-gold text-navy text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">{wishlist.length}</span>
            )}
          </button>

          <Link to="/dashboard" className="text-white text-base w-9 h-9 rounded-full bg-white/10 hover:bg-gold hover:text-navy transition flex items-center justify-center" title="Dashboard">
            👤
          </Link>

          <Link to="/boats" className="hidden md:block bg-gold hover:bg-yellow-500 text-navy font-semibold px-5 py-2 rounded-full transition">
            Book Now
          </Link>

          <button className="md:hidden text-white text-2xl w-9 h-9 flex items-center justify-center" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-navy dark:bg-darkCard text-white p-6 flex flex-col gap-4 shadow-lg border-t border-white/10">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)} className={`text-left ${isActive(link.path) ? 'text-gold font-semibold' : 'hover:text-gold'}`}>
                {link.label}
              </Link>
            ))}
            <Link to="/dashboard" onClick={() => setIsOpen(false)} className="hover:text-gold">My Dashboard</Link>

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <span className="text-sm text-gray-300">Currency:</span>
              <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="bg-white/10 text-white text-sm px-3 py-1.5 rounded-lg outline-none border border-white/20">
                <option value="USD" className="text-navy">USD $</option>
                <option value="EUR" className="text-navy">EUR €</option>
                <option value="GBP" className="text-navy">GBP £</option>
                <option value="BDT" className="text-navy">BDT ৳</option>
              </select>
            </div>
          </div>
        )}
      </header>

      <WishlistModal isOpen={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} onSelectYacht={() => {}} />
    </>
  );
};

export default Header;