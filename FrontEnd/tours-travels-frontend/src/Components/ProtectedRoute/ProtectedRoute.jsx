import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  // Check token in sessionStorage
  const token = sessionStorage.getItem("token");
  const { user } = useContext(AuthContext);

  if (!token || !user || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute; 