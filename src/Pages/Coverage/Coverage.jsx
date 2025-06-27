import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { FaSearch } from 'react-icons/fa';
import { useLoaderData } from 'react-router';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const center = [23.685, 90.3563]; // Bangladesh

const MapFlyTo = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, 10);
    }
  }, [position, map]);
  return null;
};

const Coverage = () => {
  const serviceCenter = useLoaderData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPosition, setSelectedPosition] = useState(null);

  const handleSearch = () => {
    const found = serviceCenter.find(
      (service) =>
        service.city.toLowerCase() === searchTerm.toLowerCase() ||
        service.district.toLowerCase() === searchTerm.toLowerCase()
    );
    if (found) {
      setSelectedPosition([found.latitude, found.longitude]);
    } else {
      alert('No service center found for that location.');
    }
  };

  return (
    <div className="mb-10">
      <div className="bg-white rounded-3xl p-8 md:p-14 shadow">
        <h1 className="text-3xl md:text-4xl font-bold text-[#0f172a] text-center mb-8">
          We are available in 64 districts
        </h1>

        {/* Search Box */}
        <div className="flex justify-center mb-10">
          <div className="flex w-full max-w-xl">
            <div className="flex items-center bg-[#f1f5f9] rounded-full w-full overflow-hidden">
              <input
                type="text"
                placeholder="Search city or district"
                className="bg-transparent outline-none px-5 py-3 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                className="px-6 py-3 bg-primary font-semibold rounded-full hover:bg-lime-500 transition"
                onClick={handleSearch}
              >
                <div className="flex items-center gap-2">
                  <FaSearch className="text-md" />
                  <span>Search</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        <h2 className="text-lg font-semibold text-[#0f172a] mb-4">
          We deliver almost all over Bangladesh
        </h2>

        {/* Map */}
        <div className="w-full overflow-hidden rounded-xl border border-gray-300">
          <MapContainer
            center={center}
            zoom={7}
            scrollWheelZoom={false}
            style={{ height: '600px', width: '100%' }}
            className="rounded-xl"
          >
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {selectedPosition && <MapFlyTo position={selectedPosition} />}
            {serviceCenter.map((service, index) => (
              <Marker
                key={index}
                position={[service.latitude, service.longitude]}
              >
                <Popup>
                  <strong>{service.city}, {service.district}</strong><br />
                  {service.covered_area.join(', ')}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Coverage;
