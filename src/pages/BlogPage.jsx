import ScrollReveal from '../components/ScrollReveal';

const blogPosts = [
  {
    id: 1,
    title: 'Top 10 Yacht Destinations for 2026',
    excerpt: 'Discover the most breathtaking destinations for your next luxury yacht adventure — from the Maldives to the Amalfi Coast.',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=800&auto=format&fit=crop',
    category: 'Destinations',
    date: 'Oct 5, 2026',
    readTime: '5 min read',
  },
  {
    id: 2,
    title: 'A Beginner\'s Guide to Yacht Chartering',
    excerpt: 'Everything you need to know before booking your first yacht charter — from choosing the right vessel to planning your itinerary.',
    image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=800&auto=format&fit=crop',
    category: 'Guides',
    date: 'Sep 28, 2026',
    readTime: '8 min read',
  },
  {
    id: 3,
    title: 'The Ultimate Luxury: Private Chef on Board',
    excerpt: 'Experience culinary excellence at sea. Learn how our private chefs create unforgettable dining experiences.',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=800&auto=format&fit=crop',
    category: 'Lifestyle',
    date: 'Sep 20, 2026',
    readTime: '6 min read',
  },
  {
    id: 4,
    title: 'Eco-Friendly Sailing: Sustainable Yachting',
    excerpt: 'How the yachting industry is going green. Explore sustainable sailing options for the eco-conscious traveler.',
    image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=800&auto=format&fit=crop',
    category: 'Sustainability',
    date: 'Sep 12, 2026',
    readTime: '7 min read',
  },
  {
    id: 5,
    title: 'Best Time to Charter a Yacht in the Mediterranean',
    excerpt: 'Planning a Mediterranean voyage? Here is a month-by-month guide to help you choose the perfect time.',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=800&auto=format&fit=crop',
    category: 'Destinations',
    date: 'Sep 5, 2026',
    readTime: '4 min read',
  },
  {
    id: 6,
    title: 'Family-Friendly Yacht Vacations: A Complete Guide',
    excerpt: 'Traveling with kids? Discover the best family-friendly yachts and activities for an unforgettable family adventure.',
    image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=800&auto=format&fit=crop',
    category: 'Guides',
    date: 'Aug 30, 2026',
    readTime: '9 min read',
  },
];

const BlogPage = () => {
  return (
    <div className="pt-24 min-h-screen bg-lightGray dark:bg-darkBg">
      <ScrollReveal animation="fade-up">
        <div className="text-center py-12 px-6 bg-navy dark:bg-darkCard">
          <h1 className="text-4xl md:text-6xl font-playfair font-bold text-white mb-4">AquaLuxe Journal</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">Stories, guides, and inspiration from the world of luxury yachting.</p>
        </div>
      </ScrollReveal>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        {/* Featured Post */}
        <ScrollReveal animation="fade-up">
          <div className="bg-white dark:bg-darkCard rounded-3xl overflow-hidden shadow-xl mb-12 grid md:grid-cols-2">
            <div className="relative h-64 md:h-auto">
              <img src={blogPosts[0].image} alt={blogPosts[0].title} className="w-full h-full object-cover" />
              <span className="absolute top-4 left-4 bg-gold text-navy text-xs font-bold px-3 py-1 rounded-full uppercase">
                Featured
              </span>
            </div>
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <p className="text-gold text-xs font-semibold uppercase tracking-wider mb-2">{blogPosts[0].category}</p>
              <h2 className="text-2xl md:text-4xl font-playfair font-bold text-navy dark:text-white mb-4">{blogPosts[0].title}</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">{blogPosts[0].excerpt}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
                <span>📅 {blogPosts[0].date}</span>
                <span>⏱️ {blogPosts[0].readTime}</span>
              </div>
              <button onClick={() => alert('Full article coming soon!')} className="bg-gold hover:bg-yellow-500 text-navy font-bold px-6 py-3 rounded-xl w-fit transition">
                Read Article →
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(1).map((post, idx) => (
            <ScrollReveal key={post.id} animation="fade-up" delay={idx * 100}>
              <article className="bg-white dark:bg-darkCard rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 h-full flex flex-col">
                <div className="relative h-52">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                  <span className="absolute top-4 left-4 bg-gold text-navy text-xs font-bold px-3 py-1 rounded-full uppercase">{post.category}</span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-navy dark:text-white mb-3 hover:text-gold cursor-pointer transition">{post.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed flex-1">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
                    <span>📅 {post.date}</span>
                    <span>⏱️ {post.readTime}</span>
                  </div>
                  <button onClick={() => alert('Full article coming soon!')} className="text-gold font-semibold text-sm hover:underline self-start">Read More →</button>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;