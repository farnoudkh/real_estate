import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AxiosInstance from './AxiosInstance';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft, faBath, faBed, faHome, faPhone, faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons';
import Footer from './Footer';
import ContactFormProperty from './ContactFormProperty';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Helmet } from 'react-helmet';

import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const PropertyDetail = () => {
  const [property, setProperty] = useState([]);
  const { slug } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    AxiosInstance.get(`listings/${slug}`)
      .then(response => setProperty(response.data))
      .catch(error => console.error('Error fetching property:', error));
  }, [slug]);

  const images = [
    property.photo_main,
    property.photo_1,
    property.photo_2,
    property.photo_3,
    property.photo_4,
  ].filter(Boolean);

  const position = property.latitude && property.longitude ? [property.latitude, property.longitude] : null;

  const handlePrevImage = () => setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const handleNextImage = () => setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  return (
    <div className="bg-[rgb(6,11,34)] min-h-screen text-white">
      <Helmet>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
      </Helmet>

      <div className="bg-gradient-to-b from-violet-600/[.15] via-transparent py-20">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="col-span-1 space-y-2">
              <h1 className="text-4xl font-bold text-[rgb(223,198,103)]">{property.address}</h1>
              <p className="text-[rgb(223,198,103)]">{property.city} {property.zip_code}</p>
              <div className="flex flex-wrap gap-2 text-gray-200 mt-4">
                <span className="bg-gray-800 px-3 py-1 rounded-full text-sm">
                  <FontAwesomeIcon icon={faHome} className="mr-1" />
                  {property.surface} m²
                </span>
                <span className="bg-gray-800 px-3 py-1 rounded-full text-sm">
                  <FontAwesomeIcon icon={faBed} className="mr-1" />
                  {property.bedrooms} Bedrooms
                </span>
                <span className="bg-gray-800 px-3 py-1 rounded-full text-sm">
                  <FontAwesomeIcon icon={faBath} className="mr-1" />
                  {property.bathrooms} Bathrooms
                </span>
              </div>
              <p className="mt-4 text-2xl text-[rgb(223,198,103)] font-bold">{property.price} €</p>
              <p className="text-sm text-gray-400">{property.home_type}</p>
            </div>

            <div className="col-span-2">
              <div className="relative">
                <img
                  src={images[currentImageIndex]}
                  alt="Property"
                  className="w-full h-auto max-h-[500px] rounded-xl shadow-lg"
                />
                <button
                  onClick={handlePrevImage}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black/60 p-3 rounded-full"
                >
                  <FontAwesomeIcon icon={faAngleLeft} color="white" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black/60 p-3 rounded-full"
                >
                  <FontAwesomeIcon icon={faAngleRight} color="white" />
                </button>
              </div>

              <div className="flex justify-center gap-2 mt-4">
                {images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`h-16 w-24 object-cover rounded cursor-pointer ${currentImageIndex === idx ? 'ring-2 ring-[rgb(223,198,103)]' : ''}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-semibold text-[rgb(223,198,103)] mb-2">{property.title}</h2>
              <p className="text-sm text-gray-400 mb-4">
                {property.address}, {property.zip_code} {property.city} • Publish on : {property.publish_date}
              </p>
              <p className="text-white leading-relaxed">{property.description}</p>

              <div className="mt-12">
                {position ? (
                  <MapContainer center={position} zoom={15} style={{ height: "400px", width: "100%", zIndex: 1 }}>
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={position}>
                      <Popup>{property.title}</Popup>
                    </Marker>
                  </MapContainer>
                ) : (
                  <p className="text-gray-400">Loading map...</p>
                )}
              </div>

              <div className="mt-12">
                <ContactFormProperty />
              </div>
            </div>

            <div className="p-4">
              <div className="bg-[rgb(6,11,34)] text-[rgb(223,198,103)] rounded-xl shadow-lg overflow-hidden border border-[rgb(223,198,103)] w-auto max-w-md mx-auto">
                <div className="w-full h-40 overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src="https://media.istockphoto.com/id/1149958175/photo/modern-skyscrapers-in-midtown-manhattan.webp?b=1&s=170667a&w=0&k=20&c=GGpQK-UrXnhe25zSk4yNixalZfZoYGcOX-Q65zx5wkA="
                    alt="Agence"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold text-center mb-4">Realtor Information</h2>
                  {property.realtor && (
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <FontAwesomeIcon icon={faUser} className="mr-2" />
                        <span>{property.realtor.first_name} {property.realtor.last_name}</span>
                      </div>
                      <div className="flex items-center">
                        <FontAwesomeIcon icon={faPhone} className="mr-2" />
                        <span>{property.realtor.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                        <span><a href={`mailto:${property.realtor.email}`}>{property.realtor.email}</a></span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PropertyDetail;
