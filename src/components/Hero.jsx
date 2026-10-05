import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import CustomDatePicker from './CustomDatePicker';

const Hero = () => {
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [duration, setDuration] = useState('');
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = () => {
    if (!location || !date || !duration) {
      alert('Please fill in all fields to search for yachts.');
      return;
    }
    alert(`Searching for yachts in ${location} on ${date} for ${duration}...`);
    document.getElementById('boats')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={heroRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Parallax Video Background */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      >
        <video autoPlay loop muted playsInline
          poster="https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=2070&auto=format&fit=crop"
          className="absolute inset-0 w-full h-full object-cover">
          <source src="https://videos.pexels.com/video-files/2169880/2169880-uhd_2560_1440_30fps.mp4" type="video/mp4" />
          <source src="https://videos.pexels.com/video-files/3576378/3576378-uhd_2560_1440_30fps.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/70 to-navy/30"></div>

      <div
        className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pt-20"
        style={{ transform: `translateY(${scrollY * 0.15}px)`, opacity: Math.max(0, 1 - scrollY / 700) }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-2xl"
        >
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gold font-semibold tracking-widest uppercase mb-4 text-sm"
          >
            Premium Yacht Rentals
          </motion.h3>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl font-playfair font-bold text-white leading-tight mb-6"
          >
            Explore the <span className="text-gold">Ocean</span> Your Way
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-gray-200 text-lg mb-8 max-w-lg"
          >
            Luxury yachts. Breathtaking destinations. Unforgettable experiences.
          </motion.p>
        </motion.div>

        {/* Desktop Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="absolute -bottom-20 left-6 right-6 md:left-12 md:right-12 max-w-5xl mx-auto bg-white dark:bg-darkCard rounded-2xl shadow-2xl p-4 md:p-6 hidden md:block"
        >
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex-1 w-full border-r border-gray-200 dark:border-gray-700 px-4">
              <label className="text-xs text-gray-500 dark:text-gray-400 block">Location</label>
              <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Choose Location" className="w-full outline-none text-navy dark:text-white font-medium bg-transparent" />
            </div>
            <div className="flex-1 w-full border-r border-gray-200 dark:border-gray-700 px-4">
              <label className="text-xs text-gray-500 dark:text-gray-400 block">Date</label>
              <button type="button" onClick={() => setIsDateOpen(true)} className="w-full text-left outline-none">
                <span className={`font-medium text-sm ${date ? 'text-navy dark:text-white' : 'text-gray-400'}`}>{date || 'Select date'}</span>
              </button>
            </div>
            <div className="flex-1 w-full px-4">
              <label className="text-xs text-gray-500 dark:text-gray-400 block">Duration</label>
              <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="e.g. 2 Days" className="w-full outline-none text-navy dark:text-white font-medium bg-transparent" />
            </div>
            <button onClick={handleSearch} className="bg-gold hover:bg-yellow-500 text-navy font-semibold px-8 py-4 rounded-xl w-full md:w-auto transition">Search Boats</button>
          </div>
        </motion.div>

        {/* Mobile Search Bar */}
        <div className="md:hidden absolute -bottom-32 left-4 right-4 bg-white dark:bg-darkCard rounded-2xl shadow-2xl p-4">
          <div className="space-y-3">
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="📍 Choose Location" className="w-full bg-lightGray dark:bg-darkBg text-navy dark:text-white rounded-lg px-4 py-3 outline-none" />
            <button type="button" onClick={() => setIsDateOpen(true)} className="w-full text-left bg-lightGray dark:bg-darkBg text-navy dark:text-white rounded-lg px-4 py-3">📅 {date || 'Select Date'}</button>
            <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="⏱️ Duration (e.g. 2 Days)" className="w-full bg-lightGray dark:bg-darkBg text-navy dark:text-white rounded-lg px-4 py-3 outline-none" />
            <button onClick={handleSearch} className="w-full bg-gold hover:bg-yellow-500 text-navy font-semibold py-3 rounded-xl transition">Search Boats</button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center"
      >
        <span className="text-white/70 text-xs uppercase tracking-widest mb-2">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-1 h-8 bg-gold/60 rounded-full"
        />
      </motion.div>

      {isDateOpen && (
        <CustomDatePicker selectedDate={date} onDateChange={(d) => setDate(d)} onClose={() => setIsDateOpen(false)} />
      )}
    </section>
  );
};

export default Hero;