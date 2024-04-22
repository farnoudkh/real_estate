import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AxiosInstance from './AxiosInstance';


const PropertyDetail = () => {
    const [property, setProperty] = useState([]);
    const { slug } = useParams();     
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
      return <div>Loading...</div>;
    }
  
    return (
        <div className="property-details">
            <h2>{property.title}</h2>
            <img src={property.photo_main} alt={property.title} style={{ width: '100%', maxWidth: '600px' }} />
        </div>
    );
  };

  export default PropertyDetail;