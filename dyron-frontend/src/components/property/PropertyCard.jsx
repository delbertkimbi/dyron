import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HeartIcon, MapPinIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import defaultImage from '../../assets/images/apartment.jpg';

const PropertyCard = ({ property }) => {
  const primaryImage = property.images?.[0] || defaultImage;
  
  console.log('Property:', property);
  console.log('Primary Image:', primaryImage);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden"
    >
      <Link to={`/properties/${property.id}`}>
        <div className="relative aspect-w-16 aspect-h-9">
          <img
            src={primaryImage}
            alt={property.title}
            className="object-cover w-full h-48"
            onError={(e) => {
              e.target.src = defaultImage;
              console.log('Image load error:', e);
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute top-4 right-4 bg-white/90 px-2 py-1 rounded text-sm font-medium">
            {property.type}
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {property.title}
          </h3>
          
          <div className="flex items-center text-gray-800 mb-2">
            <MapPinIcon className="h-4 w-4 mr-1" />
            <span className="text-sm">{property.location}</span>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center text-primary-600 font-bold">
              <CurrencyDollarIcon className="h-5 w-5 mr-1" />
              {Number(property.price).toLocaleString()} XAF
            </div>
            <div className="text-sm font-medium text-gray-800">
              {property.status === 'available' ? 'Available' : 'Sold'}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default PropertyCard; 