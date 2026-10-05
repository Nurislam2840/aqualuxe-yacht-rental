import ScrollReveal from '../components/ScrollReveal';
import Stats from '../components/Stats';
import Testimonials from '../components/Testimonials';

const AboutPage = () => {
  return (
    <div className="pt-24 min-h-screen bg-lightGray dark:bg-darkBg">
      <ScrollReveal animation="fade-up">
        <div className="text-center py-12 px-6 bg-navy dark:bg-darkCard">
          <h1 className="text-4xl md:text-6xl font-playfair font-bold text-white mb-4">About AquaLuxe</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">Crafting unforgettable ocean experiences since 2010.</p>
        </div>
      </ScrollReveal>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <ScrollReveal animation="fade-right">
            <img src="https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=2070&auto=format&fit=crop" alt="About" className="rounded-3xl shadow-2xl w-full h-96 object-cover" />
          </ScrollReveal>
          <ScrollReveal animation="fade-left">
            <div>
              <p className="text-gold font-semibold uppercase tracking-widest text-sm mb-3">Our Story</p>
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-navy dark:text-white mb-6">Redefining Luxury at Sea</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                At AquaLuxe, we believe every voyage should be extraordinary. With over a decade of experience in luxury yacht chartering, we have curated the finest fleet and destinations to create memories that last a lifetime.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                From intimate sunset cruises to grand celebrations, our team is dedicated to making every moment at sea perfect.
              </p>
              <div className="grid grid-cols-3 gap-4">
                {['Premium Fleet', 'Expert Crew', '24/7 Support'].map((item, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-3xl mb-2">✓</div>
                    <p className="text-xs font-semibold text-navy dark:text-white">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      <Stats />
      <Testimonials />
    </div>
  );
};

export default AboutPage;