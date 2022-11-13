import React from 'react'; // rafce
import { Link, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../reducers/authSlice';

const Landing = () => {
  const { isAuthenticated } = useSelector(selectAuth);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">ConnectDev</h1>
          <p className="lead">
            Create a developer profile/portfolio, share posts and get help from other
            developers
          </p>
          <div className="buttons">
            <Link to="/register" className="btn btn-primary">
              Sign Up
            </Link>
            <Link to="/login" className="btn btn-light">
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
