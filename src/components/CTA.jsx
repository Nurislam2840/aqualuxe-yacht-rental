import ScrollReveal from './ScrollReveal';

const CTA = () => {
  return (
    <section className="relative py-24 px-6 md:px-12 overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070&auto=format&fit=crop')" }}>
        <div className="absolute inset-0 bg-navy/80"></div>
      </div>
      <ScrollReveal animation="fade-up">
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-playfair font-bold text-white mb-6">
            Ready for Your Next <span className="text-gold">Adventure?</span>
          </h2>
          <p className="text-gray-300 text-base md:text-lg mb-10 max-w-2xl mx-auto">
            Book your dream yacht today and explore the ocean like never before. Unforgettable memories await.
          </p>
          <a href="#boats" className="inline-block bg-gold hover:bg-yellow-500 text-navy font-bold px-10 py-4 rounded-xl transition text-lg shadow-lg shadow-gold/30">
            Book Now &rarr;
          </a>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default CTA;