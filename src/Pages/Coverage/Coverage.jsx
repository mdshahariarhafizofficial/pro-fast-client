import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { FaSearch } from 'react-icons/fa';

// Fix Leaflet icon paths
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const center = [23.685, 90.3563]; // Bangladesh

const Coverage = () => {
  return (
    <div className="mb-10">
      <div className="bg-white rounded-3xl p-8 md:p-14 shadow">

        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-[#0f172a] text-center mb-8">
          We are available in 64 districts
        </h1>

        {/* Search Box */}
        <div className="flex justify-center mb-10">
          <div className="flex w-full max-w-xl">
            <div className="flex items-center bg-[#f1f5f9] rounded-full w-full overflow-hidden">
              <div className="flex-grow">
                <input
                  type="text"
                  placeholder="Search here"
                  className="bg-transparent outline-none px-5 py-3 w-full"  
                />
              </div>
              <button
                className="px-6 py-3 bg-primary font-semibold rounded-full hover:bg-lime-500 transition"
                disabled
              >
                <div className="flex items-center gap-2">
                  <FaSearch className="text-md" />
                  <span>Search</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Subheading */}
        <h2 className="text-lg font-semibold text-[#0f172a] mb-4">
          We deliver almost all over Bangladesh
        </h2>

        {/* Map */}
        <div className="w-full overflow-hidden rounded-xl border border-gray-300">
          <MapContainer
            center={center}
            zoom={7}
            scrollWheelZoom={false}
            style={{ height: '400px', width: '100%' }}
            className="rounded-xl"
          >
            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={center}>
              <Popup>Dhaka (Capital)</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Coverage;
