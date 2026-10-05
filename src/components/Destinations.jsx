import { useState } from 'react';
import DestinationModal from './DestinationModal';
import ScrollReveal from './ScrollReveal';

const destinations = [
  { name: 'Maldives', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=2065&auto=format&fit=crop', tag: 'Tropical Paradise' },
  { name: 'Santorini', image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=2000&auto=format&fit=crop', tag: 'Greek Isles' },
  { name: 'Dubai', image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=2070&auto=format&fit=crop', tag: 'Luxury & Glamour' },
  { name: 'Miami', image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=2068&auto=format&fit=crop', tag: 'Coastal Vibes' },
];

const Destinations = () => {
  const [selectedDestination, setSelectedDestination] = useState(null);

  return (
    <section className="py-24 px-6 md:px-12 bg-white dark:bg-darkBg transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal animation="fade-up">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-playfair font-bold text-navy dark:text-white mb-4">Discover Amazing Places by the Sea</h2>
              <p className="text-gray-500 dark:text-gray-400">From tropical islands to iconic coastlines, choose your next destination.</p>
            </div>
            <a href="#destinations" className="hidden md:block text-gold font-semibold hover:underline">Explore Destinations &rarr;</a>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((dest, idx) => (
            <ScrollReveal key={idx} animation="zoom-in" delay={idx * 100}>
              <div onClick={() => setSelectedDestination(dest)} className="relative h-80 rounded-2xl overflow-hidden group cursor-pointer">
                <img src={dest.image} alt={dest.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <p className="text-gold text-sm font-semibold mb-1">{dest.tag}</p>
                  <h3 className="text-2xl font-bold text-white">{dest.name}</h3>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
      <DestinationModal destination={selectedDestination} onClose={() => setSelectedDestination(null)} />
    </section>
  );
};

export default Destinations;