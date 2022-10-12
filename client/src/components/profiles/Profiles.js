import React, { useEffect, Fragment } from 'react';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
//Redux
import { useSelector, useDispatch } from 'react-redux';
import { getProfiles } from '../../reducers/profileThunk';
import { selectProfile } from '../../reducers/profileSlice';

const Profiles = () => {
  const dispatch = useDispatch();
  const { profiles, loading } = useSelector(selectProfile);
  //   console.log(profiles);

  useEffect(() => {
    dispatch(getProfiles());
  }, []);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Developers</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop"></i> Browse and connect with developers
          </p>
          <div className="profiles">
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4>No profiles found...</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profiles;
