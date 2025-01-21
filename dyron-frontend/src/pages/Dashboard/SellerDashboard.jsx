import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';

const SellerDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-lg p-6"
      >
        <h1 className="text-3xl font-bold mb-6">Seller Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">My Listed Properties</h2>
            {/* Listed properties */}
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Sales History</h2>
            {/* Sales history */}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SellerDashboard; 