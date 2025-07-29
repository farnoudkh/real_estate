import { useState, useEffect } from 'react';
import Footer from './Footer';
import Property from './Property';
import AxiosInstance from './AxiosInstance';

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchCriteria, setSearchCriteria] = useState({
    city: '',
    home_type: '',
    min_bedrooms: '',
    priceRange: '',
  });

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await AxiosInstance.get('/api/listings');
        setProperties(response.data);
        setFilteredProperties(response.data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const propertyTypes = [
    { value: '', label: 'Any Type' },
    { value: 'House', label: 'House' },
    { value: 'Apartment', label: 'Apartment' },
  ];

  const bedroomOptions = [
    { value: '', label: 'Any' },
    { value: '1', label: '1+' },
    { value: '2', label: '2+' },
    { value: '3', label: '3+' },
    { value: '4', label: '4+' },
    { value: '5', label: '5+' }
  ];

  const priceRanges = [
    { value: '', label: 'Any Price' },
    { value: '0-100000', label: 'Under €100K' },
    { value: '100000-250000', label: '€100K - €250K' },
    { value: '250000-500000', label: '€250K - €500K' },
    { value: '500000-1000000', label: '€500K - €1M' },
    { value: '1000000-', label: 'Over €1M' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria(prev => {
      const updatedCriteria = { ...prev, [name]: value };
      return updatedCriteria;
    });
  };

  const filterProperties = () => {
    let results = [...properties];
  
    if (searchCriteria.city) {
      results = results.filter(property =>
        property.city.toLowerCase().includes(searchCriteria.city.toLowerCase()))
    }
  
    if (searchCriteria.home_type) {
      results = results.filter(property =>
        property.home_type === searchCriteria.home_type)
    }
  
    if (searchCriteria.min_bedrooms) {
      results = results.filter(property =>
        property.bedrooms >= parseInt(searchCriteria.min_bedrooms))
    }
  
    if (searchCriteria.priceRange) {
      const [minPrice, maxPrice] = searchCriteria.priceRange.split('-');
      
      if (minPrice) {
        results = results.filter(property =>
          property.price >= parseInt(minPrice))
      }
      if (maxPrice) {
        results = results.filter(property =>
          property.price <= parseInt(maxPrice))
      }
    }
  
    setFilteredProperties(results);
  };

  const handleResetFilters = () => {
    setSearchCriteria({
      city: '',
      home_type: '',
      min_bedrooms: '',
      priceRange: '',
    });
    setFilteredProperties(properties); 
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-[rgb(6,11,34)] flex-grow">
        <div className="bg-gradient-to-b from-violet-600/[.15] via-transparent">
          <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-8">
            <div className="max-w-3xl text-center mx-auto">
              <h1 className="block font-medium text-[rgb(223,198,103)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                Find Your Dream Home Today
              </h1>
            </div>
            <div className="max-w-3xl text-center mx-auto">
              <p className="text-lg text-[rgb(223,198,103)]">Discover the perfect property that matches your lifestyle</p>
            </div>
            
            <div className="max-w-4xl mx-auto bg-[rgb(6,11,34)] border border-[rgb(223,198,103)] rounded-xl shadow-lg p-6">
              <form onSubmit={(e) => e.preventDefault()} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[rgb(223,198,103)] mb-1">
                    City
                  </label>
                  <input 
                    type="text" 
                    name="city"
                    value={searchCriteria.city}
                    onChange={handleInputChange}
                    className="w-full p-3 text-sm text-gray-900 border border-[rgb(223,198,103)] rounded-lg bg-white" 
                    placeholder="Enter city"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[rgb(223,198,103)] mb-1">
                    Property Type
                  </label>
                  <select 
                    name="home_type"
                    value={searchCriteria.home_type}
                    onChange={handleInputChange}
                    className="w-full p-3 text-sm text-gray-900 border border-[rgb(223,198,103)] rounded-lg bg-white"
                  >
                    {propertyTypes.map((type) => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-[rgb(223,198,103)] mb-1">
                        Bedrooms
                    </label>
                    <select
                        name="min_bedrooms"
                        value={searchCriteria.min_bedrooms}
                        onChange={handleInputChange}
                        className="w-full p-3 text-sm text-gray-900 border border-[rgb(223,198,103)] rounded-lg bg-white"
                    >
                        {bedroomOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                        ))}
                    </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[rgb(223,198,103)] mb-1">
                    Price Range
                  </label>
                  <select 
                    name="priceRange"
                    value={searchCriteria.priceRange}
                    onChange={handleInputChange}
                    className="w-full p-3 text-sm text-gray-900 border border-[rgb(223,198,103)] rounded-lg bg-white"
                  >
                    {priceRanges.map((range) => (
                      <option key={range.value} value={range.value}>{range.label}</option>
                    ))}
                  </select>
                </div>
                
                <div className="md:col-span-2 lg:col-span-4 text-center mt-4 flex justify-center space-x-4">
                  <button 
                    onClick={filterProperties}
                    className="bg-[rgb(223,198,103)] hover:bg-[rgb(243,218,123)] text-[rgb(6,11,34)] font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    Search Properties
                  </button>
                  <button 
                    onClick={handleResetFilters}
                    className="bg-[rgb(103,198,223)] hover:bg-[rgb(123,218,243)] text-[rgb(6,11,34)] font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    Reset Filters
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[rgb(6,11,34)] py-12">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[rgb(223,198,103)] mb-8 text-center">
            Lists of properties
          </h2>
          {loading ? (
            <div className="text-center py-8 text-[rgb(223,198,103)]">Loading properties...</div>
          ) : (
            <>
              {filteredProperties && filteredProperties.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-xl text-gray-600">No properties found matching your criteria.</p>
                </div>
              ) : (
                <Property properties={filteredProperties} />
              )}
            </>
          )}
        </div>
      </div>
        
      <Footer />
    </div>
  );
};

export default Home;
