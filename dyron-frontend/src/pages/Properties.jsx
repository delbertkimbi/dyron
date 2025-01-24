import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { propertyService } from '../services/property';
import PropertyCard from '../components/property/PropertyCard';
import { sampleProperties } from '../data/sampleProperties';
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';

const Properties = () => {
  const [dbProperties, setDbProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    type: 'all',
    location: 'all',
    priceRange: 'all'
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const data = await propertyService.getAllProperties();
        if (data) {
          // Filter out any null or undefined entries
          const validProperties = data.filter(property => property && property.id);
          setDbProperties(validProperties);
        }
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Combine sample and database properties
  const allProperties = [...sampleProperties, ...dbProperties];

  const locations = ['all', 'Molyko', 'Buea town', 'Mile 17', 'Dirty South', 'UB Junction', 'Ndongo'];
  const propertyTypes = ['all', 'room', 'apartment', 'hotel', 'guest house', 'land'];
  const priceRanges = [
    { label: 'All Prices', value: 'all' },
    { label: 'Under 50,000 XAF', value: '0-50000' },
    { label: '50,000 - 100,000 XAF', value: '50000-100000' },
    { label: '100,000 - 500,000 XAF', value: '100000-500000' },
    { label: 'Above 500,000 XAF', value: '500000-above' }
  ];

  // Filter properties based on search and filters
  const filterProperties = (property) => {
    const matchesSearch = searchTerm === '' || 
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filters.type === 'all' || property.type === filters.type;
    const matchesLocation = filters.location === 'all' || property.location === filters.location;
    
    if (filters.priceRange === 'all') return matchesSearch && matchesType && matchesLocation;

    const [min, max] = filters.priceRange.split('-').map(Number);
    const matchesPrice = max === undefined 
      ? property.price >= min
      : property.price >= min && property.price <= max;

    return matchesSearch && matchesType && matchesLocation && matchesPrice;
  };

  const filteredProperties = allProperties.filter(filterProperties);

  // Group properties by source
  const sampleFilteredProperties = filteredProperties.filter(p => p.id <= sampleProperties.length);
  const dbFilteredProperties = filteredProperties.filter(p => p.id > sampleProperties.length);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search properties..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                />
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              <select
                value={filters.type}
                onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
                className="px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              >
                <option value="all" className="text-gray-900">Property Type</option>
                {propertyTypes.map(type => (
                  <option key={type} value={type} className="text-gray-900">
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>

              <select
                value={filters.location}
                onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                className="px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              >
                <option value="all" className="text-gray-900">Location</option>
                {locations.map(location => (
                  <option key={location} value={location} className="text-gray-900">
                    {location.charAt(0).toUpperCase() + location.slice(1)}
                  </option>
                ))}
              </select>

              <select
                value={filters.priceRange}
                onChange={(e) => setFilters(prev => ({ ...prev, priceRange: e.target.value }))}
                className="px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              >
                {priceRanges.map(range => (
                  <option key={range.value} value={range.value} className="text-gray-900">
                    {range.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {filteredProperties.length} Properties Found
          </h2>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full"
            />
          </div>
        ) : (
          <>
            {/* Sample Properties Section */}
            {sampleFilteredProperties.length > 0 && (
              <div className="mb-12">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Featured Properties</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {sampleFilteredProperties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              </div>
            )}

            {/* Database Properties Section */}
            {dbFilteredProperties.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Listed Properties</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {dbFilteredProperties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              </div>
            )}

            {/* No Results Message */}
            {filteredProperties.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No properties found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Properties; 