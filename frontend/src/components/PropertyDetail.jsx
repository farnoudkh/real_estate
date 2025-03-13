import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AxiosInstance from './AxiosInstance';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft, faBath, faBed, faHome, faPhone, faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons';
import '../styles/PropertyDetail.css';
import { Helmet } from 'react-helmet';
import Footer from './Footer';
import ContactFormProperty from './ContactFormProperty';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const PropertyDetail = () => {
    const [property, setProperty] = useState([]);
    const { slug } = useParams();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        AxiosInstance.get(`/api/listings/${slug}`)
            .then(response => {
                console.log('API Response:', response.data);
                setProperty(response.data);
            })
            .catch(error => {
                console.error('Error fetching properties:', error);
            });
    }, [slug]);

    const images = [
        property.photo_main,
        property.photo_1,
        property.photo_2,
        property.photo_3,
        property.photo_4,
    ].filter(Boolean);

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const position = property.latitude && property.longitude ? [property.latitude, property.longitude] : null;

    return (
        <div>
            <div className='text-black'>
                <Helmet>
                    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
                    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
                </Helmet>
                <div className='property_hero_div mt-8'>
                    <div className="container mx-auto flex flex-wrap">
                        <div className="w-full md:w-1/3 p-4 text-black property_div">
                            <h1 className="property_adress">{property.address}</h1>
                            <h1 className="property_adress property_icons">{property.city} {property.zip_code}</h1>
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                                <FontAwesomeIcon icon={faHome} className="mr-1" />
                                {property.surface}m²
                            </span>
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                                <FontAwesomeIcon icon={faBed} className="mr-1" />
                                {property.bedrooms}
                            </span>
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                                <FontAwesomeIcon icon={faBath} className="mr-1" />
                                {property.bathrooms}
                            </span>
                            <span className="text-xl font-semibold text-gray-300 mr-1">|</span>
                            <span className="text-sm font-semibold text-gray-700">{property.home_type}</span>
                            <h1 className='property_adress property_price'>{property.price} €</h1>
                        </div>
                        <div className="w-full md:w-2/3">
                            <div className="relative">
                                <img
                                    src={images[currentImageIndex]}
                                    alt="Property"
                                    className="w-full h-auto max-h-[500px] rounded"
                                />
                                <button
                                    onClick={handlePrevImage}
                                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 p-2 text-4xl"
                                >
                                    <FontAwesomeIcon icon={faAngleLeft} color='white' />
                                </button>
                                <button
                                    onClick={handleNextImage}
                                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 p-2 text-4xl"
                                >
                                    <FontAwesomeIcon icon={faAngleRight} color='white' />
                                </button>
                            </div>
                            <div className="flex justify-center mt-4 space-x-2">
                                {images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image}
                                        alt={`Thumbnail ${index}`}
                                        className={`w-70 h-16 md:w-50 md:h-32 rounded cursor-pointer ${currentImageIndex === index ? 'border-2 border-blue-500' : ''}`}
                                        onClick={() => setCurrentImageIndex(index)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container mx-auto flex flex-wrap">
                    <div className="w-full md:w-2/3 p-4">
                        <div className="text-black">
                            <h3 className="property_title mt-3">{property.title}</h3>
                            <span className="property_adress_description">
                                {property.address} {property.zip_code} {property.city}
                            </span>
                            <br></br>
                            <span className="property_adress_description">Publié le :{property.publish_date}</span> 
                            <div className="property_adress_description_divider w-full p-4"></div>
                            <p className="property_description_paragraph">{property.description}</p>
                        </div>
                        <div className="property_adress_description_divider w-full p-4"></div>
                        <div className="mt-8">
                        {position ? (
                <MapContainer 
                    center={position} 
                    zoom={15} 
                    style={{ height: "400px", width: "100%" }}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={position}>
                        <Popup>
                            {property.title}
                        </Popup>
                    </Marker>
                </MapContainer>
            ) : (
                <p>Chargement de la carte...</p>
            )}
                        </div>
                        <div className="property_adress_description_divider w-full p-4"></div>
                        <div className="mt-8">
                            <ContactFormProperty />
                        </div>
                    </div>
                    <div className="w-full md:w-1/3 p-4">
                        <div 
                            id="agent_card" 
                            className="max-w-xs bg-white shadow-lg rounded-lg text-gray-900 border-2 mt-6"
                            style={{ height: "auto", backgroundColor: 'rgb(6, 11, 34)' }}
                        >
                            <div className="rounded-t-lg overflow-hidden contact_agent_header w-full bg-white">
                                <img
                                    className="object-cover object-top w-full"
                                    src="https://media.istockphoto.com/id/1149958175/photo/modern-skyscrapers-in-midtown-manhattan.webp?b=1&s=170667a&w=0&k=20&c=GGpQK-UrXnhe25zSk4yNixalZfZoYGcOX-Q65zx5wkA="
                                    alt="buildings"
                                />
                            </div>
                            <h2 className="contact_agent_text text-center mt-4" style={{ color: 'rgb(223,198,103)' }}>
                                Contact de lagent
                            </h2>
                            {property.realtor && (
                                <div className="ml-4 mt-2">
                                    <div className="flex ml-2 mt-2">
                                        <FontAwesomeIcon icon={faUser} className="mr-2" style={{ color: 'rgb(223,198,103)' }} />
                                        <h2 className="font-semibold" style={{ color: 'rgb(223,198,103)' }}>
                                            {property.realtor.first_name} {property.realtor.last_name}
                                        </h2>
                                    </div>
                                    <div className="flex ml-2 mt-2">
                                        <FontAwesomeIcon icon={faPhone} className="mr-2" style={{ color: 'rgb(223,198,103)' }} />
                                        <p style={{ color: 'rgb(223,198,103)' }}>{property.realtor.phone}</p>
                                    </div>
                                    <div className="flex ml-2 mt-2">
                                        <FontAwesomeIcon icon={faEnvelope} className="mr-2" style={{ color: 'rgb(223,198,103)' }} />
                                        <p className="pb-10" style={{ color: 'rgb(223,198,103)' }}>{property.realtor.email}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default PropertyDetail;