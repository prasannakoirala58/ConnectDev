import React, { Fragment, useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { setAlert } from '../../reducers/alertSlice';
import { selectAuth } from '../../reducers/authSlice';
import { login, loadUser } from '../../reducers/authThunk';

const Login = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, payload } = useSelector(selectAuth);
  console.log(payload);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
    dispatch(loadUser());
    // dispatch(dispatchLoadUserThunk());
    // console.log('SUCCESS!');
  };

  // Redirect or Navigate to dashboard  if logged in
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }
  // dispatch(loadUser());

  return (
    <Fragment>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign Into Your Account
      </p>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
            minLength="6"
          />
        </div>

        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </Fragment>
  );
};

export default Login;