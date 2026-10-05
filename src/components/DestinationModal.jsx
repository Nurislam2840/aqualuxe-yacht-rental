const DestinationModal = ({ destination, onClose }) => {
  if (!destination) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative max-h-[90vh] overflow-y-auto">
        
        <div className="relative h-48">
          <img src={destination.image} alt={destination.name} className="w-full h-full object-cover" />
          <button onClick={onClose} className="absolute top-4 right-4 bg-white/80 w-8 h-8 rounded-full text-navy font-bold flex items-center justify-center hover:bg-white">&times;</button>
        </div>

        <div className="p-6">
          <p className="text-gold font-semibold text-sm mb-1">{destination.tag}</p>
          <h3 className="text-3xl font-playfair font-bold text-navy mb-4">{destination.name}</h3>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Experience the breathtaking beauty of {destination.name}. From crystal clear waters to luxurious yacht charters, this destination offers an unforgettable escape for you and your loved ones.
          </p>
          
          <div className="bg-lightGray p-4 rounded-xl mb-6">
            <h4 className="font-bold text-navy mb-2">Popular Activities:</h4>
            <ul className="text-sm text-gray-600 space-y-1 list-disc pl-4">
              <li>Luxury Yacht Cruises</li>
              <li>Scuba Diving & Snorkeling</li>
              <li>Sunset Dining on the Sea</li>
            </ul>
          </div>

          <button onClick={onClose} className="w-full bg-navy hover:bg-navy/90 text-white font-bold py-3 rounded-xl transition">
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default DestinationModal;