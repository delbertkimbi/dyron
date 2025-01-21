import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Properties', path: '/properties' },
    ...(user?.role === 'seller' ? [{ name: 'Add Property', path: '/properties/add' }] : []),
    ...(user 
      ? [{ 
          name: 'Dashboard', 
          path: user.role === 'buyer' ? '/dashboard/buyer' : '/dashboard/seller'
        }]
      : []
    )
  ];

  return (
    <nav className="bg-white shadow-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex-shrink-0">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-2xl font-bold text-primary-600"
              >
                Dyron
              </motion.div>
            </Link>
          </div>

          {/* Desktop Menu - Right aligned */}
          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-800 hover:text-primary-600 border-b-2 border-transparent hover:border-primary-600 transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}

            {/* Auth Button */}
            {user ? (
              <button
                onClick={logout}
                className="text-gray-800 hover:text-primary-600 px-4 py-2 text-sm font-medium transition-colors"
              >
                Sign Out
              </button>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-full text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200 shadow-sm"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-800 hover:text-primary-600 transition-colors p-2"
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        className="sm:hidden overflow-hidden bg-white border-t border-gray-100"
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="block px-3 py-2 text-base font-medium text-gray-800 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          {!user && (
            <Link
              to="/login"
              className="block w-full text-center mt-2 px-6 py-2.5 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-full transition-colors shadow-sm"
              onClick={() => setIsOpen(false)}
            >
              Sign In
            </Link>
          )}
          {user && (
            <button
              onClick={() => {
                logout();
                setIsOpen(false);
              }}
              className="block w-full text-left px-3 py-2 text-base font-medium text-gray-800 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors"
            >
              Sign Out
            </button>
          )}
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar; 