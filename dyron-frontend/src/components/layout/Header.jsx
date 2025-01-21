import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { motion } from 'framer-motion';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="text-2xl font-bold text-primary"
            >
              Dyron
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/properties" className="nav-link">
              Properties
            </Link>
            {user ? (
              <>
                <Link to={`/dashboard/${user.role}`} className="nav-link">
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="btn-primary"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="nav-link">
                  Login
                </Link>
                <Link to="/register" className="btn-primary">
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden pt-4 pb-3 space-y-3"
          >
            <Link
              to="/properties"
              className="block px-3 py-2 rounded-md hover:bg-gray-100"
            >
              Properties
            </Link>
            {user ? (
              <>
                <Link
                  to={`/dashboard/${user.role}`}
                  className="block px-3 py-2 rounded-md hover:bg-gray-100"
                >
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md hover:bg-gray-100"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 rounded-md hover:bg-gray-100"
                >
                  Register
                </Link>
              </>
            )}
          </motion.div>
        )}
      </nav>
    </header>
  );
};

export default Header; 