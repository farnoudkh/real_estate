import React, { useState, useEffect } from 'react';
import AxiosInstance from './AxiosInstance';
import Card from './Card';
import { Link } from 'react-router-dom';

const Property = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    // Fetch property data from backend
    AxiosInstance.get('/api/listings')
      .then(response => {
        setProperties(response.data);
        console.log(response)
      })
      .catch(error => {
        console.error('Error fetching properties:', error);
      });
  }, []);

  return (
    <div className="flex flex-wrap justify-center mt-5">
      {properties.map(property => (
        <div key={property.slug} className="m-4 transform transition-transform duration-300 ease-in-out hover:scale-110">
          <Link to={`/listings/${property.slug}`}>
            <Card 
              title={property.title} 
              price={property.price} 
              surface={property.surface} 
              bathrooms={property.bathrooms} 
              bedrooms={property.bedrooms}
              photo_main={property.photo_main}
              type={property.sale_type}
              address={property.address}
              zip_code={property.zip_code}
              city={property.city}
            />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Property;