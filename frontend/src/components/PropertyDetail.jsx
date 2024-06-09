import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AxiosInstance from './AxiosInstance';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faAngleRight} from '@fortawesome/free-solid-svg-icons'
import {faAngleLeft} from '@fortawesome/free-solid-svg-icons'
import {faBath} from '@fortawesome/free-solid-svg-icons'
import {faBed} from '@fortawesome/free-solid-svg-icons'
import {faHome} from '@fortawesome/free-solid-svg-icons'
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import  '../styles/PropertyDetail.css'


const PropertyDetail = () => {
    const [property, setProperty] = useState([]);
    const { slug } = useParams();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    useEffect(() => {
        AxiosInstance.get(`/api/listings/${slug}`)
        .then(response => {
            setProperty(response.data);
            })
            .catch(error => {
            console.error('Error fetching properties:', error);
        });

    }, [slug]); 

    if (!property) {
      return <div>Chargement...</div>;
    }

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
      
    return (
        (
        <div className='text-black'>
            <div className='property_hero_div mt-8'>
                <div className="container mx-auto flex flex-wrap">
                    <div className="w-full md:w-1/3 p-4 text-black property_div">
                        <h1 className="property_adress">{property.address}</h1>
                        <h1 className="property_adress property_icons">{property.city} {property.zip_code}</h1>
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                            <FontAwesomeIcon icon={faHome} className="mr-1"/>
                            {property.surface}m²
                        </span>
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                            <FontAwesomeIcon icon={faBed} className="mr-1"/>
                            {property.bedrooms}
                        </span>
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                            <FontAwesomeIcon icon={faBath} className="mr-1"/>
                            {property.bathrooms}
                        </span>
                        <span className="text-xl font-semibold text-gray-300 mr-1">|</span>            
                        <span className="text-sm font-semibold text-gray-700">{property.home_type}</span>
                        <h1 className='property_adress property_price'>{property.price} €</h1>
                        <span className="publish_date">Publié le :</span> {property.publish_date}
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
                                <FontAwesomeIcon icon={faAngleRight} color='white'/>
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
                <div className="w-full md:w-2/3 p-4 text-black property_div">
                    <h3 className='property_title mt-3'>{property.title}</h3>
                    <span className='property_adress_description'>
                        {property.address} {property.zip_code} {property.city}
                    </span>
                    <div className='property_adress_description_divider'></div>
                    <p className='property_description_paragraph'>{property.description}</p>
                </div>
                <div className="max-w-xs mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-8 bg-white shadow-xl rounded-lg text-gray-900 h-64">
                    <div className="rounded-t-lg overflow-hidden contact_agent_header w-full h-24">
                        <img className="object-cover object-top w-full" src='https://media.istockphoto.com/id/1149958175/photo/modern-skyscrapers-in-midtown-manhattan.webp?b=1&s=170667a&w=0&k=20&c=GGpQK-UrXnhe25zSk4yNixalZfZoYGcOX-Q65zx5wkA=' alt='buildings'/>
                    </div>
                    <h2 className='contact_agent_text'>Contact de l'agent</h2>
                    {property.realtor && (
                        <div className="ml-4 mt-2">
                            <h2 className="font-semibold">{property.realtor.name}</h2>
                            <div className="flex ml-2 mt-2">
                                <FontAwesomeIcon icon={faPhone} className="mr-2"/>
                                <p>{property.realtor.phone}</p>
                            </div>
                            <div className="flex ml-2 mt-2">
                                <FontAwesomeIcon icon={faEnvelope} className="mr-2"/>
                                <p>{property.realtor.email}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>      
        </div>
        )
    )
};

  export default PropertyDetail;