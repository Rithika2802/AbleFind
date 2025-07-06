import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Default marker icon fix for Leaflet
const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

function FlyToLatestMarker({ location }) {
  const map = useMap();
  useEffect(() => {
    if (location?.lat && location?.lng) {
      map.flyTo([location.lat, location.lng], 14, { duration: 1.5 });
    }
  }, [location, map]);

  return null;
}

export default function MapView({ reviews }) {
  const defaultPosition = [20.5937, 78.9629]; // India center

  const latestLocation = reviews.length > 0 ? reviews[reviews.length - 1].location : null;

  return (
    <MapContainer center={defaultPosition} zoom={5} style={{ height: "400px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
      />
      {latestLocation && <FlyToLatestMarker location={latestLocation} />}
      {reviews.map(
        (review) =>
          review.location?.lat &&
          review.location?.lng && (
            <Marker
              key={review.id}
              position={[review.location.lat, review.location.lng]}
              icon={markerIcon}
            >
              <Popup>
                <strong>{review.placeName}</strong>
                <br />
                {review.comments || "No comment provided."}
              </Popup>
            </Marker>
          )
      )}
    </MapContainer>
  );
}
