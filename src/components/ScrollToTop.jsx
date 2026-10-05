import { useState, useEffect } from 'react';

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggle = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', toggle);
    return () => window.removeEventListener('scroll', toggle);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-24 right-6 z-40 bg-gold hover:bg-yellow-500 text-navy w-12 h-12 rounded-full shadow-2xl flex items-center justify-center text-xl font-bold transition-all duration-300 hover:scale-110"
      aria-label="Scroll to top"
    >
      ↑
    </button>
  );
};

export default ScrollToTop;