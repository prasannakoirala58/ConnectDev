import React from 'react'; // rafce for component generation
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectAuth } from '../../reducers/authSlice';
import { logout } from '../../reducers/authThunk';

const Navbar = () => {
  const dispatch = useDispatch();
  let { isAuthenticated, loading } = useSelector(selectAuth);
  // console.log(`isAuthenticated:${isAuthenticated}, loading:${loading}`);
  // onClick={dispatch(logout())}

  const logUserOut = () => {
    dispatch(logout());
  };

  const authLinks = (
    <ul>
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
        <a to="#!">Developers</a>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
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
