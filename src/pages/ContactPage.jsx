import { useState } from 'react';
import ScrollReveal from '../components/ScrollReveal';

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you, ${formData.name}! We will contact you at ${formData.email} shortly.`);
    setFormData({ name: '', email: '', message: '' });
  };

  const contactInfo = [
    { icon: '📞', title: 'Call Us', value: '+1 (234) 567-890', subtitle: 'Mon-Sun, 24/7' },
    { icon: '✉️', title: 'Email', value: 'hello@aqualuxe.com', subtitle: 'Replies within 2 hours' },
    { icon: '📍', title: 'Visit Us', value: 'Marina Bay, Dubai', subtitle: 'United Arab Emirates' },
  ];

  return (
    <div className="pt-24 min-h-screen bg-lightGray dark:bg-darkBg">
      <ScrollReveal animation="fade-up">
        <div className="text-center py-12 px-6 bg-navy dark:bg-darkCard">
          <h1 className="text-4xl md:text-6xl font-playfair font-bold text-white mb-4">Get in Touch</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">Have questions? We'd love to hear from you.</p>
        </div>
      </ScrollReveal>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {contactInfo.map((info, idx) => (
            <ScrollReveal key={idx} animation="fade-up" delay={idx * 100}>
              <div className="bg-white dark:bg-darkCard p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 text-center">
                <div className="text-4xl mb-4">{info.icon}</div>
                <h3 className="text-lg font-bold text-navy dark:text-white mb-2">{info.title}</h3>
                <p className="text-gold font-semibold mb-1">{info.value}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{info.subtitle}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Contact Form */}
        <ScrollReveal animation="fade-up">
          <div className="max-w-2xl mx-auto bg-white dark:bg-darkCard p-8 md:p-12 rounded-3xl shadow-xl">
            <h2 className="text-3xl font-playfair font-bold text-navy dark:text-white mb-8 text-center">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm text-gray-600 dark:text-gray-300 font-medium block mb-1">Your Name</label>
                  <input required type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full bg-lightGray dark:bg-darkBg border border-gray-300 dark:border-gray-700 text-navy dark:text-white rounded-lg p-3 outline-none focus:border-gold" placeholder="John Doe" />
                </div>
                <div>
                  <label className="text-sm text-gray-600 dark:text-gray-300 font-medium block mb-1">Your Email</label>
                  <input required type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full bg-lightGray dark:bg-darkBg border border-gray-300 dark:border-gray-700 text-navy dark:text-white rounded-lg p-3 outline-none focus:border-gold" placeholder="john@example.com" />
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-300 font-medium block mb-1">Message</label>
                <textarea required rows="5" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full bg-lightGray dark:bg-darkBg border border-gray-300 dark:border-gray-700 text-navy dark:text-white rounded-lg p-3 outline-none focus:border-gold resize-none" placeholder="Tell us how we can help..."></textarea>
              </div>
              <button type="submit" className="w-full bg-gold hover:bg-yellow-500 text-navy font-bold py-3.5 rounded-xl transition">Send Message</button>
            </form>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default ContactPage;