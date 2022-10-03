import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAuth } from './../../reducers/authSlice';
import { selectProfile } from '../../reducers/profileSlice';
import { getCurrentProfile } from './../../reducers/profileThunk';

const Dashboard = () => {
  const { isAuthenticated, loading } = useSelector(selectAuth);
  //   const profile = useSelector(selectProfile);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentProfile());
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
};

export default Dashboard;
