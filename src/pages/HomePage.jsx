import Hero from '../components/Hero';
import FeaturedYachts from '../components/FeaturedYachts';
import LifestyleBanner from '../components/LifestyleBanner';
import Destinations from '../components/Destinations';
import DestinationsMap from '../components/DestinationsMap';
import BoatCategories from '../components/BoatCategories';
import Stats from '../components/Stats';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import CTA from '../components/CTA';
import ScrollReveal from '../components/ScrollReveal';

const HomePage = () => {
  return (
    <>
      <div id="home"><Hero /></div>
      <div id="boats"><FeaturedYachts /></div>
      <div id="lifestyle"><LifestyleBanner /></div>
      <div id="destinations"><Destinations /></div>

      {/* Interactive Map Section */}
      <section className="py-24 px-6 md:px-12 bg-lightGray dark:bg-darkBg transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal animation="fade-up">
            <div className="text-center mb-12">
              <p className="text-gold font-semibold uppercase tracking-widest text-sm mb-3">Explore The World</p>
              <h2 className="text-4xl md:text-5xl font-playfair font-bold text-navy dark:text-white mb-4">
                Where Will The Ocean Take You?
              </h2>
              <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                Click on any marker to discover our most popular yacht destinations around the globe.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="zoom-in">
            <DestinationsMap />
          </ScrollReveal>
        </div>
      </section>

      <div id="categories"><BoatCategories /></div>
      <div id="stats"><Stats /></div>
      <div id="testimonials"><Testimonials /></div>
      <div id="faq"><FAQ /></div>
      <div id="contact"><CTA /></div>
    </>
  );
};

export default HomePage;