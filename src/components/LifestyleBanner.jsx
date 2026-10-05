import ScrollReveal from './ScrollReveal';

const LifestyleBanner = () => {
  return (
    <section className="py-20 px-6 md:px-12 bg-lightGray dark:bg-darkBg transition-colors duration-300">
      <ScrollReveal animation="zoom-in">
        <div className="max-w-7xl mx-auto bg-navy rounded-3xl overflow-hidden flex flex-col lg:flex-row shadow-2xl">
          <div className="lg:w-1/2 relative min-h-[300px] md:min-h-[400px]">
            <img src="https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=2070&auto=format&fit=crop" alt="Yacht Lifestyle" className="absolute inset-0 w-full h-full object-cover" />
          </div>
          <div className="lg:w-1/2 p-8 md:p-16 flex flex-col justify-center">
            <span className="text-gold font-semibold tracking-widest uppercase text-xs md:text-sm mb-4">The Ultimate on Water</span>
            <h2 className="text-3xl md:text-5xl font-playfair font-bold text-white mb-6 leading-tight">
              More Than a Trip, <br /> It's a <span className="text-gold">Lifestyle</span>
            </h2>
            <p className="text-gray-300 mb-8 leading-relaxed text-sm md:text-base">
              From private getaways to special celebrations, AquaLuxe gives you access to the world's most beautiful yachts and destinations.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {['Private Chefs', 'Custom Itineraries', 'World-Class Crew'].map((feature, idx) => (
                <span key={idx} className="bg-white/10 text-white text-xs md:text-sm px-4 py-2 rounded-full border border-white/20">{feature}</span>
              ))}
            </div>
            <button onClick={() => alert("Our Experiences page is coming soon! Stay tuned.")} className="bg-gold hover:bg-yellow-500 text-navy font-semibold px-8 py-4 rounded-xl transition w-fit">Explore Experiences</button>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default LifestyleBanner;