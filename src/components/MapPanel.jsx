import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix marker icon issue
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function MapView({ places }) {
  return (
    <MapContainer
      center={[20.5937, 78.9629]} // Centered on India
      zoom={5}
      scrollWheelZoom
      className="h-[75vh] w-full rounded-xl shadow"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {places.map((place) => (
        <Marker
          key={place.id}
          position={[place.location.lat, place.location.lng]}
        >
          <Popup>
            <h3 className="font-bold">{place.name}</h3>
            <p className="text-sm text-gray-700">{place.category}</p>
            <p className="mt-1 text-sm">{place.comment}</p>
            {place.imageUrl && (
              <img
                src={place.imageUrl}
                alt="Place"
                className="mt-2 w-full max-h-40 object-cover rounded"
              />
            )}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
