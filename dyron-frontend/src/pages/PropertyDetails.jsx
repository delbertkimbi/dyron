import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { propertyService } from '../services/property';
import { sampleProperties } from '../data/sampleProperties';
import { MapPinIcon, PhoneIcon, EnvelopeIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';

const PropertyDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        // First check if it's a sample property
        const sampleProperty = sampleProperties.find(p => p.id === parseInt(id));
        if (sampleProperty) {
          setProperty({
            ...sampleProperty,
            seller_name: "Sample Seller",
            seller_email: "seller@example.com",
            seller_phone: "+237 674-208-573"
          });
          setLoading(false);
          return;
        }

        // If not a sample property, fetch from API
        const data = await propertyService.getPropertyById(id);
        setProperty(data);
      } catch (error) {
        toast.error('Failed to fetch property details');
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Property not found</h2>
        <Link to="/properties" className="text-primary-600 hover:text-primary-700 mt-4 inline-block">
          Browse other properties
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Image Gallery */}
          <div className="relative aspect-w-16 aspect-h-9 bg-gray-200">
            <img
              src={property.images[activeImage]}
              alt={property.title}
              className="object-cover w-full h-full"
            />
            {property.images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {property.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`w-3 h-3 rounded-full ${
                      activeImage === index ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {property.images.length > 1 && (
            <div className="flex gap-2 p-4 overflow-x-auto">
              {property.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden ${
                    activeImage === index ? 'ring-2 ring-primary-500' : ''
                  }`}
                >
                  <img src={image} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Property Details */}
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
                <div className="flex items-center text-gray-800 mb-4">
                  <MapPinIcon className="h-5 w-5 mr-2" />
                  <span>{property.location}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-primary-600">
                  {Number(property.price).toLocaleString()} XAF
                </div>
                <div className="text-sm font-medium text-gray-800">{property.type}</div>
              </div>
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Description</h2>
              <p className="text-gray-800 whitespace-pre-line">{property.description}</p>
            </div>

            {/* Seller Info */}
            {property.seller_name && (
              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Contact Seller</h2>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <span className="font-medium mr-2">Name:</span>
                    {property.seller_name}
                  </div>
                  {property.seller_email && (
                    <div className="flex items-center">
                      <EnvelopeIcon className="h-5 w-5 mr-2 text-gray-400" />
                      <a
                        href={`mailto:${property.seller_email}`}
                        className="text-primary-600 hover:text-primary-700"
                      >
                        {property.seller_email}
                      </a>
                    </div>
                  )}
                  {property.seller_phone && (
                    <div className="flex items-center">
                      <PhoneIcon className="h-5 w-5 mr-2 text-gray-400" />
                      <a
                        href={`tel:${property.seller_phone}`}
                        className="text-primary-600 hover:text-primary-700"
                      >
                        {property.seller_phone}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails; 