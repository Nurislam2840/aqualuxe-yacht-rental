import ScrollReveal from './ScrollReveal';

const Testimonials = () => {
  return (
    <section className="py-24 px-6 md:px-12 bg-white dark:bg-darkBg transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-navy dark:text-white mb-4">What Our Clients Say</h2>
            <p className="text-gray-500 dark:text-gray-400">Real stories from real adventurers.</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((item, idx) => (
            <ScrollReveal key={item} animation="fade-up" delay={idx * 150}>
              <div className="bg-lightGray dark:bg-darkCard p-8 rounded-2xl h-full">
                <div className="flex gap-1 mb-6 text-gold text-lg">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 italic mb-8 leading-relaxed">
                  "An incredible experience! The yacht was luxurious and the crew was professional. AquaLuxe made our vacation truly unforgettable."
                </p>
                <div className="flex items-center gap-4">
                  <img src={`https://i.pravatar.cc/150?img=${item + 10}`} alt="Client" className="w-12 h-12 rounded-full object-cover border-2 border-gold" />
                  <div>
                    <h4 className="font-bold text-navy dark:text-white">Sarah M.</h4>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">United States</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;