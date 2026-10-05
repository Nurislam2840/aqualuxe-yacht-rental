const YachtDetailsModal = ({ yacht, onClose, onBookNow, isInWishlist, toggleWishlist }) => {
  if (!yacht) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white dark:bg-darkCard rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto">

        {/* Header Image */}
        <div className="relative h-64 md:h-80">
          <img src={yacht.image} alt={yacht.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/90 w-10 h-10 rounded-full text-navy font-bold flex items-center justify-center hover:bg-white text-xl"
          >
            &times;
          </button>

          <button
            onClick={() => toggleWishlist(yacht)}
            className="absolute top-4 left-4 bg-white/90 w-10 h-10 rounded-full flex items-center justify-center text-xl hover:bg-white"
          >
            {isInWishlist(yacht.id) ? '❤️' : '🤍'}
          </button>

          {yacht.tag && (
            <span className="absolute bottom-4 left-4 bg-gold text-navy text-xs font-bold px-3 py-1 rounded-full uppercase">
              {yacht.tag}
            </span>
          )}

          <div className="absolute bottom-4 right-4 text-white bg-black/50 px-3 py-1 rounded-full text-sm font-bold">
            ★ {yacht.rating}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-6">
            <div>
              <p className="text-gold font-semibold uppercase text-xs tracking-widest mb-1">
                {yacht.category}
              </p>
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-navy dark:text-white">
                {yacht.name}
              </h2>
            </div>
            <div className="text-left md:text-right">
              <span className="text-3xl font-bold text-navy dark:text-white">
                ${yacht.price}
              </span>
              <span className="text-gray-500 dark:text-gray-400 text-sm"> /day</span>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6 bg-lightGray dark:bg-darkBg p-4 rounded-xl">
            <div className="text-center">
              <div className="text-2xl mb-1">👥</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Capacity</p>
              <p className="font-bold text-navy dark:text-white text-sm">
                {yacht.guests} Guests
              </p>
            </div>
            <div className="text-center border-x border-gray-200 dark:border-gray-700">
              <div className="text-2xl mb-1">📏</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Length</p>
              <p className="font-bold text-navy dark:text-white text-sm">
                {yacht.length} ft
              </p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-1">🛏️</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Cabins</p>
              <p className="font-bold text-navy dark:text-white text-sm">
                {yacht.cabins} Cabins
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="mb-8">
            <h3 className="font-bold text-navy dark:text-white mb-3">
              Included Features
            </h3>
            <div className="flex flex-wrap gap-2">
              {['WiFi', 'Air Conditioning', 'Sun Deck', 'Sound System', 'Snorkel Gear'].map((feature, idx) => (
                <span
                  key={idx}
                  className="bg-gold/10 text-gold border border-gold/30 text-xs font-semibold px-3 py-1.5 rounded-full"
                >
                  ✓ {feature}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={() => toggleWishlist(yacht)}
              className="flex-1 md:flex-none md:px-6 py-3 border-2 border-navy dark:border-gold text-navy dark:text-gold rounded-xl font-semibold hover:bg-navy hover:text-white dark:hover:bg-gold dark:hover:text-navy transition"
            >
              {isInWishlist(yacht.id) ? '❤️ Saved' : '🤍 Save'}
            </button>
            <button
              onClick={() => { onClose(); onBookNow(yacht); }}
              className="flex-1 bg-gold hover:bg-yellow-500 text-navy font-bold py-3 rounded-xl transition"
            >
              Book This Yacht →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YachtDetailsModal;