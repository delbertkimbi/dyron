export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  const minLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);

  return {
    isValid: minLength && hasUpper && hasNumber && hasSpecial,
    errors: {
      minLength: !minLength ? 'Password must be at least 8 characters' : null,
      hasUpper: !hasUpper ? 'Password must contain an uppercase letter' : null,
      hasNumber: !hasNumber ? 'Password must contain a number' : null,
      hasSpecial: !hasSpecial ? 'Password must contain a special character' : null
    }
  };
};

export const validatePhone = (phone) => {
  const re = /^\+?[0-9]{9,15}$/;
  return re.test(phone);
}; 