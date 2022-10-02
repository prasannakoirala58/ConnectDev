import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../reducers/authSlice';

const PrivateRoute = () => {
  const { isAuthenticated, loading } = useSelector(selectAuth);

  return !isAuthenticated && !loading ? <Navigate to="/login" /> : <Outlet />;
};

export default PrivateRoute;
