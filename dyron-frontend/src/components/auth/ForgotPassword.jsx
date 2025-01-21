import { useState } from 'react';
import { motion } from 'framer-motion';
import { validateEmail } from '../../utils/validation';
import { authService } from '../../services/auth';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await authService.forgotPassword(email);
      setStatus('success');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to process request');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-xl"
    >
      <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>

      {status === 'success' ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-green-600 text-center"
        >
          Password reset instructions have been sent to your email.
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-sm"
            >
              {error}
            </motion.p>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className={`w-full py-3 px-4 bg-primary text-white rounded-lg ${
              isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-primary/90'
            }`}
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Reset Password'}
          </motion.button>
        </form>
      )}
    </motion.div>
  );
};

export default ForgotPassword; 