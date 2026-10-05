import { useState } from 'react';
import CategoryGalleryModal from './CategoryGalleryModal';
import ScrollReveal from './ScrollReveal';

const categories = [
  { name: 'Speed Boats', icon: '🚤', count: 45, key: 'speed' },
  { name: 'Luxury Yachts', icon: '🛥️', count: 120, key: 'luxury' },
  { name: 'Sailing Boats', icon: '⛵', count: 30, key: 'sailing' },
  { name: 'Catamarans', icon: '⚓', count: 25, key: 'catamaran' },
];

const BoatCategories = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <section className="py-20 px-6 md:px-12 bg-lightGray dark:bg-darkCard transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-navy dark:text-white mb-4">Explore Our Boat Categories</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">Find the perfect boat for your next adventure. Tap any category to explore.</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((cat, idx) => (
            <ScrollReveal key={idx} animation="fade-up" delay={idx * 100}>
              <button onClick={() => setSelectedCategory(cat)} className="w-full bg-white dark:bg-darkBg p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center group cursor-pointer">
                <div className="bg-navy/5 dark:bg-white/5 p-4 rounded-full mb-4 md:mb-6 group-hover:bg-gold/15 transition-all duration-300 group-hover:scale-110">
                  <span className="text-4xl md:text-5xl">{cat.icon}</span>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-navy dark:text-white mb-2">{cat.name}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">{cat.count}+ Boats</p>
                <span className="text-gold text-xs font-semibold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">View All →</span>
              </button>
            </ScrollReveal>
          ))}
        </div>
      </div>
      <CategoryGalleryModal category={selectedCategory} onClose={() => setSelectedCategory(null)} />
    </section>
  );
};

export default BoatCategories;