import { useState, useMemo } from 'react';

// নির্ভরযোগ্য ইয়টের ছবির পুল (এগুলো আগে কাজ করেছিল)
const imagePool = [
  'https://images.unsplash.com/photo-1559599238-308793637427?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1605281317010-fe5ffe3cf69c?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1540946485063-a40da27545f8?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1552071380-e0ba9be78bfc?q=80&w=600&auto=format&fit=crop',
];

// প্রতিটি ক্যাটাগরির জন্য দামের রেঞ্জ
const priceRanges = {
  'Speed Boats': [800, 2200],
  'Luxury Yachts': [2500, 15000],
  'Sailing Boats': [600, 1600],
  'Catamarans': [1000, 3200],
};

// প্রতিটি ক্যাটাগরির নামের প্রিফিক্স
const namePool = {
  'Speed Boats': ['Speedster', 'JetRunner', 'AquaBlaze', 'WindRider', 'ThunderCat', 'Veloce'],
  'Luxury Yachts': ['Azimut', 'Princess', 'Sunseeker', 'Ferretti', 'Pershing', 'Benetti', 'Riva', 'Sanlorenzo'],
  'Sailing Boats': ['OceanSail', 'WindWhisper', 'SeaBreeze', 'Mariner', 'Voyager'],
  'Catamarans': ['OceanCat', 'Lagoon', 'Fountaine', 'Gemini', 'Bali'],
};

const generateBoats = (category) => {
  const count = category.count;
  const [min, max] = priceRanges[category.name] || [1000, 3000];
  const names = namePool[category.name] || ['Yacht'];

  return Array.from({ length: count }, (_, i) => ({
    id: `${category.key}-${i + 1}`,
    name: `${names[i % names.length]} ${100 + i}`,
    image: imagePool[i % imagePool.length],
    price: Math.floor(Math.random() * (max - min)) + min,
    rating: (4 + Math.random()).toFixed(1),
    guests: Math.floor(Math.random() * 10) + 4,
  }));
};

const CategoryGalleryModal = ({ category, onClose }) => {
  const [visibleCount, setVisibleCount] = useState(12);

  const boats = useMemo(() => {
    if (!category) return [];
    return generateBoats(category);
  }, [category]);

  if (!category) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/70 backdrop-blur-sm p-3 md:p-4">
      <div className="bg-white dark:bg-darkCard rounded-2xl w-full max-w-4xl overflow-hidden shadow-2xl max-h-[92vh] flex flex-col">

        {/* Header */}
        <div className="bg-navy p-5 flex justify-between items-center">
          <div>
            <h3 className="text-white font-bold text-xl flex items-center gap-2">
              <span className="text-2xl">{category.icon}</span>
              {category.name}
            </h3>
            <p className="text-gray-300 text-sm mt-1">
              {category.count}+ boats available
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white text-3xl hover:text-gold leading-none"
          >
            &times;
          </button>
        </div>

        {/* Gallery Body */}
        <div className="p-4 md:p-5 overflow-y-auto flex-1 bg-lightGray dark:bg-darkBg">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {boats.slice(0, visibleCount).map((boat) => (
              <div
                key={boat.id}
                className="bg-white dark:bg-darkCard rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition group"
              >
                <div className="relative h-28 md:h-36">
                  <img
                    src={boat.image}
                    alt={boat.name}
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://picsum.photos/seed/${boat.id}/600/400`;
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute top-2 right-2 bg-black/60 text-white text-xs font-bold px-2 py-0.5 rounded">
                    ★ {boat.rating}
                  </div>
                </div>
                <div className="p-3">
                  <h4 className="font-bold text-navy dark:text-white text-sm truncate">
                    {boat.name}
                  </h4>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-gold font-bold text-sm">
                      ${boat.price.toLocaleString()}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 text-xs">
                      👥 {boat.guests}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {visibleCount < boats.length && (
            <button
              onClick={() => setVisibleCount((prev) => prev + 12)}
              className="w-full mt-6 bg-navy dark:bg-gold text-white dark:text-navy font-bold py-3 rounded-xl hover:opacity-90 transition"
            >
              Load More ({visibleCount} of {boats.length})
            </button>
          )}

          {/* All Loaded */}
          {visibleCount >= boats.length && boats.length > 0 && (
            <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-6">
              ✓ All {boats.length} {category.name.toLowerCase()} loaded
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryGalleryModal;