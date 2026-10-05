import { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import MultiStepBookingModal from './MultiStepBookingModal';
import YachtDetailsModal from './YachtDetailsModal';
import ScrollReveal from './ScrollReveal';
import TiltCard from './TiltCard';

const allYachts = [
  { id: 1, name: 'Azimut 55 Fly', category: 'Luxury', image: 'https://images.unsplash.com/photo-1559599238-308793637427?q=80&w=2069&auto=format&fit=crop', guests: 12, length: 55, cabins: 3, price: 2500, priceNum: 2500, tag: 'Popular', rating: 4.9 },
  { id: 2, name: 'Princess 62', category: 'Luxury', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070&auto=format&fit=crop', guests: 10, length: 62, cabins: 4, price: 3800, priceNum: 3800, tag: 'New', rating: 5.0 },
  { id: 3, name: 'Sunseeker Manhattan 52', category: 'Luxury', image: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=2070&auto=format&fit=crop', guests: 8, length: 52, cabins: 3, price: 2200, priceNum: 2200, tag: null, rating: 4.7 },
  { id: 4, name: 'Ferretti 720', category: 'Luxury', image: 'https://picsum.photos/seed/yacht-ferretti/800/600', guests: 14, length: 72, cabins: 4, price: 4500, priceNum: 4500, tag: 'Premium', rating: 4.8 },
  { id: 5, name: 'Speedster 40', category: 'Speed', image: 'https://images.unsplash.com/photo-1540946485063-a40da27545f8?q=80&w=2070&auto=format&fit=crop', guests: 6, length: 40, cabins: 2, price: 1200, priceNum: 1200, tag: 'Fast', rating: 4.6 },
  { id: 6, name: 'Ocean Sail 45', category: 'Sailing', image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=2070&auto=format&fit=crop', guests: 8, length: 45, cabins: 3, price: 900, priceNum: 900, tag: 'Eco', rating: 4.5 },
];

const categories = ['All', 'Luxury', 'Speed', 'Sailing'];
const priceRanges = [
  { label: 'All Prices', min: 0, max: 99999 },
  { label: 'Under $1,500', min: 0, max: 1500 },
  { label: '$1,500 - $3,000', min: 1500, max: 3000 },
  { label: '$3,000 - $5,000', min: 3000, max: 5000 },
];

const FeaturedYachts = () => {
  const { convertPrice, isInWishlist, toggleWishlist } = useApp();
  const [selectedYacht, setSelectedYacht] = useState(null);
  const [detailYacht, setDetailYacht] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [activePrice, setActivePrice] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const filteredYachts = useMemo(() => {
    return allYachts.filter((y) => {
      const matchCat = activeCategory === 'All' || y.category === activeCategory;
      const range = priceRanges[activePrice];
      const matchPrice = y.priceNum >= range.min && y.priceNum <= range.max;
      const matchSearch = y.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCat && matchPrice && matchSearch;
    });
  }, [activeCategory, activePrice, searchTerm]);

  const resetFilters = () => {
    setActiveCategory('All');
    setActivePrice(0);
    setSearchTerm('');
  };

  return (
    <section className="py-24 px-6 md:px-12 bg-white dark:bg-darkBg mt-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal animation="fade-up">
          <div className="flex flex-col md:flex-row justify-between md:items-end gap-4 mb-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-playfair font-bold text-navy dark:text-white mb-2">Featured Yachts</h2>
              <p className="text-gray-500 dark:text-gray-400">Handpicked luxury yachts for your perfect journey.</p>
            </div>
            <button onClick={() => setShowFilters(!showFilters)} className="bg-navy dark:bg-gold text-white dark:text-navy font-semibold px-5 py-2.5 rounded-lg text-sm self-start md:self-auto hover:opacity-90 transition">
              {showFilters ? '✕ Close Filters' : '⚙ Filters & Search'}
            </button>
          </div>
        </ScrollReveal>

        {showFilters && (
          <div className="bg-lightGray dark:bg-darkCard rounded-2xl p-5 mb-8 border border-gray-200 dark:border-gray-700">
            <div className="mb-5">
              <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 block">Search</label>
              <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="🔍 Search yachts by name..." className="w-full bg-white dark:bg-darkBg border border-gray-300 dark:border-gray-700 text-navy dark:text-white rounded-lg px-4 py-3 outline-none focus:border-gold" />
            </div>
            <div className="mb-5">
              <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 block">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${activeCategory === cat ? 'bg-gold text-navy shadow-md' : 'bg-white dark:bg-darkBg text-navy dark:text-white border border-gray-200 dark:border-gray-700 hover:border-gold'}`}>{cat}</button>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 block">Price Range</label>
              <div className="flex flex-wrap gap-2">
                {priceRanges.map((range, idx) => (
                  <button key={idx} onClick={() => setActivePrice(idx)} className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${activePrice === idx ? 'bg-gold text-navy shadow-md' : 'bg-white dark:bg-darkBg text-navy dark:text-white border border-gray-200 dark:border-gray-700 hover:border-gold'}`}>{range.label}</button>
                ))}
              </div>
            </div>
            <button onClick={resetFilters} className="text-sm text-gray-500 dark:text-gray-400 hover:text-gold underline">Reset all filters</button>
          </div>
        )}

        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Showing <strong className="text-navy dark:text-white">{filteredYachts.length}</strong> of {allYachts.length} yacht{allYachts.length !== 1 ? 's' : ''}
        </p>

        {filteredYachts.length === 0 ? (
          <div className="text-center py-16 bg-lightGray dark:bg-darkCard rounded-2xl">
            <div className="text-5xl mb-3">🔍</div>
            <p className="text-navy dark:text-white font-semibold mb-2">No yachts found</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">Try adjusting your filters.</p>
            <button onClick={resetFilters} className="bg-gold text-navy font-semibold px-5 py-2 rounded-lg text-sm">Reset Filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredYachts.map((yacht, index) => (
              <ScrollReveal key={yacht.id} animation="fade-up" delay={(index % 3) * 100}>
                <TiltCard intensity={5} className="h-full">
                  <div className="bg-white dark:bg-darkCard rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition duration-300 h-full">
                    <div className="relative h-64 cursor-pointer" onClick={() => setDetailYacht(yacht)}>
                      <img src={yacht.image} alt={yacht.name} className="w-full h-full object-cover" />
                      {yacht.tag && (<span className="absolute top-4 left-4 bg-gold text-navy text-xs font-bold px-3 py-1 rounded-full uppercase">{yacht.tag}</span>)}
                      <button onClick={(e) => { e.stopPropagation(); toggleWishlist(yacht); }} className="absolute top-4 right-4 bg-white/90 w-10 h-10 rounded-full flex items-center justify-center text-lg hover:bg-white transition">
                        {isInWishlist(yacht.id) ? '❤️' : '🤍'}
                      </button>
                      <div className="absolute bottom-4 right-4 bg-black/50 text-white text-xs font-bold px-2 py-1 rounded">★ {yacht.rating}</div>
                    </div>
                    <div className="p-6">
                      <p className="text-gold text-xs font-semibold uppercase tracking-wider mb-1">{yacht.category}</p>
                      <h3 onClick={() => setDetailYacht(yacht)} className="text-xl font-bold text-navy dark:text-white mb-4 cursor-pointer hover:text-gold transition">{yacht.name}</h3>
                      <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">
                        <span>👥 {yacht.guests}</span><span>📏 {yacht.length} ft</span><span>🛏️ {yacht.cabins}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-2xl font-bold text-navy dark:text-white">{convertPrice(yacht.price)}</span>
                          <span className="text-gray-500 dark:text-gray-400 text-sm"> /day</span>
                        </div>
                        <button onClick={() => setSelectedYacht(yacht)} className="bg-navy dark:bg-gold hover:opacity-90 text-white dark:text-navy font-semibold px-5 py-2 rounded-lg transition text-sm">Book Now</button>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
      <MultiStepBookingModal yacht={selectedYacht} onClose={() => setSelectedYacht(null)} />
      <YachtDetailsModal yacht={detailYacht} onClose={() => setDetailYacht(null)} onBookNow={setSelectedYacht} isInWishlist={isInWishlist} toggleWishlist={toggleWishlist} />
    </section>
  );
};

export default FeaturedYachts;