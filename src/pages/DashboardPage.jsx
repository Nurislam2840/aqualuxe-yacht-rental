import { useState } from 'react';
import { useApp } from '../context/AppContext';
import ScrollReveal from '../components/ScrollReveal';

const DashboardPage = () => {
  const { wishlist, toggleWishlist, convertPrice } = useApp();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('bookings');
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [user, setUser] = useState({ name: '', email: '' });

  const handleLogin = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      alert('Please enter email and password.');
      return;
    }
    setUser({ name: formData.email.split('@')[0], email: formData.email });
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setFormData({ email: '', password: '' });
    setUser({ name: '', email: '' });
  };

  // Mock booking history
  const bookings = [
    { id: 'BK-101', yacht: 'Azimut 55 Fly', date: '2026-10-15', status: 'Confirmed', price: 2500 },
    { id: 'BK-102', yacht: 'Princess 62', date: '2026-11-22', status: 'Pending', price: 3800 },
    { id: 'BK-103', yacht: 'Sunseeker Manhattan 52', date: '2026-09-08', status: 'Completed', price: 2200 },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed': return 'bg-green-100 text-green-700';
      case 'Pending': return 'bg-yellow-100 text-yellow-700';
      case 'Completed': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  // Not logged in
  if (!isLoggedIn) {
    return (
      <div className="pt-24 min-h-screen bg-lightGray dark:bg-darkBg flex items-center justify-center px-6 py-16">
        <ScrollReveal animation="zoom-in">
          <div className="bg-white dark:bg-darkCard rounded-3xl shadow-2xl p-8 md:p-12 w-full max-w-md">
            <div className="text-center mb-8">
              <div className="text-5xl mb-4">🛥️</div>
              <h2 className="text-3xl font-playfair font-bold text-navy dark:text-white mb-2">Welcome Back</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Sign in to manage your bookings and wishlist.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-300 font-medium block mb-1">Email Address</label>
                <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="john@example.com" className="w-full bg-white dark:bg-darkBg border border-gray-300 dark:border-gray-700 text-navy dark:text-white rounded-lg p-3 outline-none focus:border-gold" />
              </div>
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-300 font-medium block mb-1">Password</label>
                <input type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} placeholder="••••••••" className="w-full bg-white dark:bg-darkBg border border-gray-300 dark:border-gray-700 text-navy dark:text-white rounded-lg p-3 outline-none focus:border-gold" />
              </div>
              <button type="submit" className="w-full bg-gold hover:bg-yellow-500 text-navy font-bold py-3 rounded-xl transition">Sign In</button>
            </form>

            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
              Don't have an account? <span className="text-gold font-semibold cursor-pointer hover:underline" onClick={() => alert('Sign up coming soon!')}>Sign Up</span>
            </p>
          </div>
        </ScrollReveal>
      </div>
    );
  }

  // Logged in dashboard
  return (
    <div className="pt-24 min-h-screen bg-lightGray dark:bg-darkBg px-6 md:px-12 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <ScrollReveal animation="fade-up">
          <div className="bg-navy dark:bg-darkCard rounded-3xl p-8 md:p-10 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gold flex items-center justify-center text-navy text-2xl font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-gold text-xs font-semibold uppercase tracking-widest">Welcome Back</p>
                <h1 className="text-2xl md:text-3xl font-playfair font-bold text-white capitalize">{user.name}</h1>
                <p className="text-gray-300 text-sm">{user.email}</p>
              </div>
            </div>
            <button onClick={handleLogout} className="bg-red-500/20 text-red-300 border border-red-500/30 font-semibold px-5 py-2 rounded-lg hover:bg-red-500/30 transition">
              Sign Out
            </button>
          </div>
        </ScrollReveal>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Bookings', value: bookings.length, icon: '🎫' },
            { label: 'Wishlist', value: wishlist.length, icon: '❤️' },
            { label: 'Completed Trips', value: 1, icon: '✅' },
            { label: 'Member Since', value: '2026', icon: '⭐' },
          ].map((stat, idx) => (
            <ScrollReveal key={idx} animation="fade-up" delay={idx * 100}>
              <div className="bg-white dark:bg-darkCard p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="text-2xl mb-2">{stat.icon}</div>
                <p className="text-2xl font-bold text-navy dark:text-white">{stat.value}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">{stat.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
          {[
            { id: 'bookings', label: 'My Bookings', icon: '🎫' },
            { id: 'wishlist', label: 'Wishlist', icon: '❤️' },
            { id: 'settings', label: 'Settings', icon: '⚙️' },
          ].map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-5 py-3 text-sm font-semibold whitespace-nowrap transition border-b-2 ${activeTab === tab.id ? 'border-gold text-gold' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-navy dark:hover:text-white'}`}>
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="space-y-4">
            {bookings.map((b, idx) => (
              <ScrollReveal key={b.id} animation="fade-up" delay={idx * 80}>
                <div className="bg-white dark:bg-darkCard p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col md:flex-row justify-between md:items-center gap-4">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{b.id}</p>
                    <h3 className="font-bold text-navy dark:text-white">{b.yacht}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">📅 {b.date}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${getStatusColor(b.status)}`}>{b.status}</span>
                    <span className="font-bold text-navy dark:text-white">{convertPrice(b.price)}</span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}

        {/* Wishlist Tab */}
        {activeTab === 'wishlist' && (
          <div>
            {wishlist.length === 0 ? (
              <div className="text-center py-16 bg-white dark:bg-darkCard rounded-2xl">
                <div className="text-5xl mb-3">🤍</div>
                <p className="text-navy dark:text-white font-semibold mb-2">Your wishlist is empty</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Browse yachts and tap the heart to save them.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlist.map((yacht) => (
                  <div key={yacht.id} className="bg-white dark:bg-darkCard rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700">
                    <img src={yacht.image} alt={yacht.name} className="w-full h-40 object-cover" />
                    <div className="p-5">
                      <h3 className="font-bold text-navy dark:text-white mb-2">{yacht.name}</h3>
                      <p className="text-gold font-semibold mb-4">{convertPrice(yacht.price)} /day</p>
                      <button onClick={() => toggleWishlist(yacht)} className="text-red-500 text-sm font-semibold hover:underline">Remove from Wishlist</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="bg-white dark:bg-darkCard p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-xl font-bold text-navy dark:text-white mb-6">Profile Settings</h3>
            <div className="space-y-4 max-w-md">
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-300 font-medium block mb-1">Display Name</label>
                <input type="text" defaultValue={user.name} className="w-full bg-lightGray dark:bg-darkBg border border-gray-300 dark:border-gray-700 text-navy dark:text-white rounded-lg p-3 outline-none focus:border-gold" />
              </div>
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-300 font-medium block mb-1">Email</label>
                <input type="email" defaultValue={user.email} className="w-full bg-lightGray dark:bg-darkBg border border-gray-300 dark:border-gray-700 text-navy dark:text-white rounded-lg p-3 outline-none focus:border-gold" />
              </div>
              <button onClick={() => alert('Settings saved!')} className="bg-gold hover:bg-yellow-500 text-navy font-bold px-6 py-2.5 rounded-lg transition">Save Changes</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;