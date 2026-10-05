import { useState } from 'react';
import ScrollReveal from './ScrollReveal';

const faqs = [
  { q: 'How do I book a yacht?', a: 'Simply browse our fleet, click "Book Now" on the yacht of your choice, fill in your details, and confirm. Our team will reach out within 24 hours.' },
  { q: 'What is included in the rental price?', a: 'Every rental includes a professional captain, crew, fuel for standard routes, and basic amenities. Extras like private chefs and premium drinks are available as add-ons.' },
  { q: 'Can I cancel my booking?', a: 'Yes, free cancellation up to 7 days before your trip. Cancellations within 7 days are subject to a 50% fee.' },
  { q: 'Are pets allowed on board?', a: 'Small, well-behaved pets are welcome on most of our yachts. Please mention this at the time of booking.' },
  { q: 'Do you offer customized itineraries?', a: 'Absolutely! Our team specializes in creating bespoke experiences. Contact us after booking to customize your route.' },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-24 px-6 md:px-12 bg-lightGray dark:bg-darkBg transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-navy dark:text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-500 dark:text-gray-400">Everything you need to know before your journey.</p>
          </div>
        </ScrollReveal>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <ScrollReveal key={idx} animation="fade-up" delay={idx * 80}>
              <div className="bg-white dark:bg-darkCard rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700">
                <button onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)} className="w-full flex justify-between items-center p-6 text-left">
                  <span className="font-bold text-navy dark:text-white text-base md:text-lg pr-4">{faq.q}</span>
                  <span className={`text-gold text-2xl transition-transform duration-300 shrink-0 ${openIndex === idx ? 'rotate-45' : ''}`}>+</span>
                </button>
                <div className={`transition-all duration-300 overflow-hidden ${openIndex === idx ? 'max-h-40' : 'max-h-0'}`}>
                  <p className="px-6 pb-6 text-gray-600 dark:text-gray-400 leading-relaxed text-sm md:text-base">{faq.a}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;