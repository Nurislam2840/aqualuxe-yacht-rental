import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useEffect } from 'react';
import L from 'leaflet';

const customIcon = () => L.divIcon({
  className: 'custom-marker',
  html: `<div style="
    background-color: #F5A623;
    width: 32px;
    height: 32px;
    border-radius: 50% 50% 50% 0;
    transform: rotate(-45deg);
    border: 3px solid white;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    display: flex;
    align-items: center;
    justify-content: center;
  ">
    <div style="transform: rotate(45deg); color: white; font-size: 14px; font-weight: bold;">⚓</div>
  </div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

export const destinationsWithCoords = [
  { name: 'Maldives', lat: 3.2028, lng: 73.2207, tag: 'Tropical Paradise', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=800&auto=format&fit=crop', description: 'Crystal clear waters and overwater villas.' },
  { name: 'Santorini', lat: 36.3932, lng: 25.4615, tag: 'Greek Isles', image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=800&auto=format&fit=crop', description: 'Iconic white buildings and stunning sunsets.' },
  { name: 'Dubai', lat: 25.2048, lng: 55.2708, tag: 'Luxury & Glamour', image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=800&auto=format&fit=crop', description: 'Ultra-modern skyline and luxury marinas.' },
  { name: 'Miami', lat: 25.7617, lng: -80.1918, tag: 'Coastal Vibes', image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=800&auto=format&fit=crop', description: 'Vibrant nightlife and beautiful beaches.' },
  { name: 'Amalfi Coast', lat: 40.6340, lng: 14.6027, tag: 'Italian Riviera', image: 'https://images.unsplash.com/photo-1533165199080-4b9d6f5c2b52?q=80&w=800&auto=format&fit=crop', description: 'Dramatic cliffs and charming coastal towns.' },
  { name: 'Ibiza', lat: 38.9067, lng: 1.4206, tag: 'Party Island', image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=800&auto=format&fit=crop', description: 'World-famous nightlife and hidden coves.' },
];

function MapController({ selectedCoords }) {
  const map = useMap();
  useEffect(() => {
    if (selectedCoords) {
      map.flyTo([selectedCoords.lat, selectedCoords.lng], 7, { duration: 1.5 });
    }
  }, [selectedCoords, map]);
  return null;
}

const DestinationsMap = ({ selectedDestination }) => {
  return (
    <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-darkCard h-[400px] md:h-[500px] relative z-0">
      <MapContainer center={[20, 30]} zoom={2.5} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }} worldCopyJump={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        {destinationsWithCoords.map((dest, idx) => (
          <Marker key={idx} position={[dest.lat, dest.lng]} icon={customIcon()}>
            <Popup>
              <div className="w-48">
                <img src={dest.image} alt={dest.name} className="w-full h-24 object-cover rounded-md mb-2" />
                <p className="text-xs font-semibold text-gold uppercase mb-1">{dest.tag}</p>
                <h3 className="font-bold text-navy text-base mb-1">{dest.name}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{dest.description}</p>
              </div>
            </Popup>
          </Marker>
        ))}
        <MapController selectedCoords={selectedDestination} />
      </MapContainer>
    </div>
  );
};

export default DestinationsMap;