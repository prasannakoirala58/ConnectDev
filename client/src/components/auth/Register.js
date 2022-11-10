import React, { Fragment, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types'; // used to type check the props passed to any component
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { setAlert } from '../../reducers/alertSlice';
import { selectAuth } from '../../reducers/authSlice';
import { register, loadUser } from '../../reducers/authThunk';

// Register Component
const Register = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(selectAuth);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      dispatch(setAlert('Passwords do not match', 'danger'));

      // console.log('Passwords do not match');
    } else if (!/^[a-zA-Z]+$/.test(name)) {
      dispatch(setAlert('Name must not contain letters', 'danger'));
    } else {
      // console.log(formData, 'SUCCESS!');
      dispatch(register({ name, email, password }));
      dispatch(loadUser());
      // dispatch(dispatchLoadUserThunk());
    }
  };

  // Redirect or Navigate to dashboard if registered successfully
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a Gravatar email
          </small>
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
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={(e) => onChange(e)}
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  );
};

// Register.propTypes = {
//   setAlert: PropTypes.func.isRequired,
// };

export default Register;

///^[a-zA-ZäöüÄÖÜ]/;
// const re = /^[A-Za-z]+$/;
