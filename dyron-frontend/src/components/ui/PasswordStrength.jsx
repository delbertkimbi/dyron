import { motion } from 'framer-motion';

const PasswordStrength = ({ password }) => {
  const calculateStrength = (pass) => {
    let strength = 0;
    if (pass.length >= 8) strength += 1;
    if (/[A-Z]/.test(pass)) strength += 1;
    if (/[0-9]/.test(pass)) strength += 1;
    if (/[^A-Za-z0-9]/.test(pass)) strength += 1;
    return strength;
  };

  const strength = calculateStrength(password);
  const strengthText = ['Weak', 'Fair', 'Good', 'Strong'];
  const strengthColor = [
    'bg-red-500',
    'bg-yellow-500',
    'bg-blue-500',
    'bg-green-500'
  ];

  return (
    <div className="mt-1">
      <div className="flex gap-1 h-1">
        {[...Array(4)].map((_, index) => (
          <motion.div
            key={index}
            className={`h-full flex-1 rounded-full ${
              index < strength ? strengthColor[strength - 1] : 'bg-gray-200'
            }`}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: index < strength ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
      {password && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`text-sm mt-1 ${
            strength === 0 ? 'text-red-500' : 
            strength === 1 ? 'text-yellow-500' : 
            strength === 2 ? 'text-blue-500' : 
            'text-green-500'
          }`}
        >
          {strengthText[strength - 1]}
        </motion.p>
      )}
    </div>
  );
};

export default PasswordStrength; 