import React, { useEffect, Fragment } from 'react';
import { Link, useParams } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
// import ProfileGithub from './ProfileGithub';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { getProfiles, getProfileById } from '../../reducers/profileThunk';
import { selectProfile } from '../../reducers/profileSlice';
import { selectAuth } from '../../reducers/authSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const { profile, loading } = useSelector(selectProfile);
  const auth = useSelector(selectAuth);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getProfileById(id));
  }, []);

  const getAllProfiles = async () => {
    await dispatch(getProfiles());
  };

  return (
    <Fragment>
      {profile === null || loading || profile === undefined ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link onClick={getAllProfiles} to="/profiles" className="btn btn-light">
            Back To Profiles
          </Link>
          {auth.isAuthenticated && auth.loading === false && auth.user.user._id === id && (
            <Link onClick={getAllProfiles} to="/edit-profile" className="btn btn-dark">
              Edit Profile
            </Link>
          )}
          <div className="profile-grid my-1">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />

            {/* Profile Experience */}
            <div className="profile-exp bg-white p-2">
              <h2 className="text-primary">Experience</h2>
              {profile.experience.length > 0 ? (
                <Fragment>
                  {profile.experience.map((exp) => (
                    <ProfileExperience key={exp._id} experience={exp} />
                  ))}
                </Fragment>
              ) : (
                <h4>No experience credentials</h4>
              )}
            </div>

            {/* Profile Education */}
            <div className="profile-edu bg-white p-2">
              <h2 className="text-primary">Education</h2>
              {profile.education.length > 0 ? (
                <Fragment>
                  {profile.education.map((edu) => (
                    <ProfileEducation key={edu._id} education={edu} />
                  ))}
                </Fragment>
              ) : (
                <h4>No education credentials</h4>
              )}
            </div>

            {/* Profile Github */}
            {/* {profile.githubusername && (
              <ProfileGithub username={profile.githubusername} />
            )} */}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
