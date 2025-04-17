import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  // checks if the user is present or not if present then it will lets the user to see the page else it redirects to the home page
  return user ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
