import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const AuthGuard = ({ children, role }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AuthGuard; 