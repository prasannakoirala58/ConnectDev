import React, { useEffect, Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectAuth } from './../../reducers/authSlice';
import { selectProfile } from '../../reducers/profileSlice';
import { getCurrentProfile, accountDeleted } from './../../reducers/profileThunk';
import { loadUser, logout } from './../../reducers/authThunk';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(selectAuth);
  const { profile, loading } = useSelector(selectProfile);
  // console.log(`The profile is: ${profile}`);

  useEffect(() => {
    dispatch(getCurrentProfile());
    dispatch(loadUser());
  }, []);

  const onDeleteAccount = () => {
    if (window.confirm('Are you sure? This can NOT be undone!')) {
      dispatch(accountDeleted());
      dispatch(logout());
      navigate('/login');
    } else {
      navigate('/dashboard');
    }
  };

  return loading && profile === null ? (
    <Spinner />
  ) : (
    (user !== null || user !== undefined) && (
      <Fragment>
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Welcome {user && user.user.name}
        </p>
        {!profile ? (
          <Fragment>
            {' '}
            <p>
              You have not yet set up a profile. Please add your profile details.
            </p>{' '}
            <Link to="/create-profile" className="btn btn-primary my-1">
              Create Profile
            </Link>
          </Fragment>
        ) : (
          (profile !== null || profile !== undefined) && (
            <Fragment>
              <DashboardActions />
              <Experience experience={profile.experience} />
              <Education education={profile.education} />

              <div className="my-2">
                <button className="btn btn-danger" onClick={onDeleteAccount}>
                  <i className="fas fa-user-minus"></i> Delete Account
                </button>
              </div>
            </Fragment>
          )
        )}
      </Fragment>
    )
  );
};

export default Dashboard;
