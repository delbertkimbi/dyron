import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import { Navigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();

  // Redirect based on user role
  if (user?.role === 'buyer') {
    return <Navigate to="/dashboard/buyer" replace />;
  }
  if (user?.role === 'seller') {
    return <Navigate to="/dashboard/seller" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow px-5 py-6 sm:px-6"
        >
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900">Loading Dashboard...</h2>
            <p className="mt-2 text-sm text-gray-600">Please wait while we redirect you...</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard; 