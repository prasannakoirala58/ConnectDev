import React from 'react'; // rafce for component generation
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectAuth } from '../../reducers/authSlice';
import { logout } from '../../reducers/authThunk';
import { getProfiles, clearProfile } from '../../reducers/profileThunk';
import { getPosts } from '../../reducers/postThunk';

const Navbar = () => {
  const dispatch = useDispatch();
  let { isAuthenticated, loading } = useSelector(selectAuth);

  const logUserOut = () => {
    dispatch(clearProfile());
    dispatch(logout());
  };

  const getAllProfiles = async () => {
    await dispatch(getProfiles());
  };

  const getAllPosts = async () => {
    await dispatch(getPosts());
  };

  const authLinks = (
    <ul>
      <li>
        <Link onClick={getAllProfiles} to="/profiles">
          <i className="fa-solid fa-code" /> <span className="hide-sm">Developers</span>
        </Link>
      </li>
      <li>
        <Link onClick={getAllPosts} to="/posts">
          <i className="fa-solid fa-signs-post" /> <span className="hide-sm">Posts</span>
        </Link>
      </li>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user" /> <span className="hide-sm">Dashboard</span>
        </Link>
      </li>
      <li>
        <a onClick={logUserOut} href="#!">
          <i className="fas fa-sign-out-alt"></i> <span className="hide-sm">LogOut</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link onClick={getAllProfiles} to="/profiles">
          <i className="fa-solid fa-code" /> <span>Developers</span>
        </Link>
      </li>
      <li>
        <Link to="/register">
          <i className="fa-solid fa-address-card" /> <span>Register</span>
        </Link>
      </li>
      <li>
        <Link to="/login">
          <i className="fa-solid fa-right-to-bracket" /> <span>Login</span>
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i> DevHub
        </Link>
      </h1>
      {!loading && <>{isAuthenticated ? authLinks : guestLinks}</>}
    </nav>
  );
};

export default Navbar;
