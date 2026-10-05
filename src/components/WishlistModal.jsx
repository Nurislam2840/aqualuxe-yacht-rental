import { useApp } from '../context/AppContext';

const WishlistModal = ({ isOpen, onClose, onSelectYacht }) => {
  const { wishlist, toggleWishlist, convertPrice } = useApp();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-darkCard rounded-2xl w-full max-w-md overflow-hidden shadow-2xl max-h-[85vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-navy p-4 flex justify-between items-center">
          <h3 className="text-white font-bold text-lg">❤️ My Wishlist ({wishlist.length})</h3>
          <button onClick={onClose} className="text-white text-2xl hover:text-gold">&times;</button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto flex-1">
          {wishlist.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-5xl mb-4">🤍</div>
              <p className="text-navy dark:text-white font-semibold mb-2">Your wishlist is empty</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Tap the heart icon on any yacht to save it.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {wishlist.map((yacht) => (
                <div key={yacht.id} className="bg-lightGray dark:bg-darkBg rounded-xl p-3 flex gap-3 items-center">
                  <img src={yacht.image} alt={yacht.name} className="w-20 h-20 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-navy dark:text-white text-sm truncate">{yacht.name}</h4>
                    <p className="text-gold font-semibold text-sm">{convertPrice(yacht.price)} <span className="text-gray-500 text-xs">/day</span></p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button 
                      onClick={() => { onSelectYacht(yacht); onClose(); }}
                      className="bg-navy dark:bg-gold text-white dark:text-navy text-xs font-bold px-3 py-1.5 rounded"
                    >
                      View
                    </button>
                    <button 
                      onClick={() => toggleWishlist(yacht)}
                      className="text-red-500 text-xs font-semibold hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WishlistModal;