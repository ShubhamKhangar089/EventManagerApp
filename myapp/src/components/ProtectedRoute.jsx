/* eslint-disable react/prop-types */
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../contextAPI/authContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    // If not logged in, redirect to login
    return <Navigate to="/login" />;
  }

  if (requiredRole && user.role !== requiredRole) {
    // If logged in but doesn't have the required role, redirect to home or another page
    return <Navigate to="/" />;
  }

  // If the user is logged in and has the required role, allow access to the route
  return children;
};

export default ProtectedRoute;
