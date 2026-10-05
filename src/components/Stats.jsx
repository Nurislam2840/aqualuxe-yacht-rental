import ScrollReveal from './ScrollReveal';
import AnimatedCounter from './AnimatedCounter';

const Stats = () => {
  const stats = [
    { value: '500+', label: 'Yachts Available' },
    { value: '120+', label: 'Destinations' },
    { value: '98%', label: 'Happy Clients' },
  ];

  return (
    <section className="py-16 px-6 md:px-12 bg-navy dark:bg-darkCard transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-around items-center gap-8">
        {stats.map((stat, idx) => (
          <ScrollReveal key={idx} animation="zoom-in" delay={idx * 150}>
            <div className="text-center">
              <h3 className="text-5xl font-playfair font-bold text-gold mb-2">
                <AnimatedCounter value={stat.value} duration={2} />
              </h3>
              <p className="text-gray-300 font-medium">{stat.label}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

export default Stats;