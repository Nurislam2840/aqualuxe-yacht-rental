import FeaturedYachts from '../components/FeaturedYachts';
import ScrollReveal from '../components/ScrollReveal';

const BoatsPage = () => {
  return (
    <div className="pt-24">
      <ScrollReveal animation="fade-up">
        <div className="text-center py-12 px-6 bg-navy dark:bg-darkCard">
          <h1 className="text-4xl md:text-6xl font-playfair font-bold text-white mb-4">Our Fleet</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">Browse our complete collection of luxury yachts, speed boats, and catamarans.</p>
        </div>
      </ScrollReveal>
      <FeaturedYachts />
    </div>
  );
};

export default BoatsPage;