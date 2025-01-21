import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Dyron</h2>
            <p className="text-gray-400">
              Your trusted digital real estate platform in Buea.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/properties" className="hover:text-white transition-colors">
                  Browse Properties
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-white transition-colors">
                  Join Us
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <EnvelopeIcon className="h-5 w-5 mr-2" />
                info@dyron.com
              </li>
              <li className="flex items-center">
                <PhoneIcon className="h-5 w-5 mr-2" />
                (+237) 674-208-573
              </li>
              <li className="flex items-center">
                <MapPinIcon className="h-5 w-5 mr-2" />
                Buea, Cameroon
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {/* Add social media icons here */}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-sm">© {new Date().getFullYear()} Dyron. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 