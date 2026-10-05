import { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = () => {
    if (!email) {
      alert("Please enter your email address.");
      return;
    }
    alert(`Thank you! ${email} has been subscribed to our newsletter.`);
    setEmail('');
  };

  return (
    <footer className="bg-navy pt-20 pb-10 px-6 md:px-12 text-gray-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        
        <div>
          <h2 className="text-3xl font-playfair font-bold text-white mb-6">AquaLuxe</h2>
          <p className="mb-6 leading-relaxed">Luxury yacht rentals and charters for unforgettable ocean experiences.</p>
          <div className="flex gap-4 text-2xl">
            <span className="cursor-pointer hover:text-gold transition">📘</span>
            <span className="cursor-pointer hover:text-gold transition">📷</span>
            <span className="cursor-pointer hover:text-gold transition">🐦</span>
            <span className="cursor-pointer hover:text-gold transition">▶️</span>
          </div>
        </div>

        <div>
          <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
          <ul className="space-y-3">
            <li><a href="#home" className="hover:text-gold transition">Home</a></li>
            <li><a href="#boats" className="hover:text-gold transition">Boats</a></li>
            <li><a href="#destinations" className="hover:text-gold transition">Destinations</a></li>
            <li><a href="#testimonials" className="hover:text-gold transition">About</a></li>
            <li><a href="#contact" className="hover:text-gold transition">Contact</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold text-lg mb-6">Support</h3>
          <ul className="space-y-3">
            {['FAQ', 'Terms & Conditions', 'Privacy Policy', 'Help Center'].map((link) => (
              <li key={link}><a href="#" className="hover:text-gold transition">{link}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold text-lg mb-6">Subscribe to Our Newsletter</h3>
          <p className="mb-4">Get the latest updates and offers directly in your inbox.</p>
          <div className="flex bg-white/10 rounded-lg overflow-hidden">
            <input 
              type="email" 
              placeholder="Your email address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent px-4 py-3 w-full outline-none text-white placeholder-gray-400" 
            />
            <button onClick={handleSubscribe} className="bg-gold text-navy px-4 font-bold hover:bg-yellow-500 transition">→</button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-white/10 pt-8 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} AquaLuxe. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;