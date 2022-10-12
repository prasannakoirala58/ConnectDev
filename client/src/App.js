import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import PrivateRoute from './components/routing/PrivateRoute';
// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './reducers/authThunk';
import setAuthToken from './utils/setAuthToken';

import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Fragment>
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Landing />} />
            {/* exact is used to make sure that the path is the same as the one in the url */}
          </Routes>
          <section className="container">
            <Alert />
            <Routes>
              <Route exact path="/register" element={<Register />}></Route>
              <Route exact path="/login" element={<Login />}></Route>
              <Route exact path="/profiles" element={<Profiles />}></Route>
              <Route exact path="/profile/:id" element={<Profile />}></Route>
              <Route exact path="/dashboard" element={<PrivateRoute />}>
                <Route path="" element={<Dashboard />} />
              </Route>
              <Route exact path="/create-profile" element={<PrivateRoute />}>
                <Route path="" element={<CreateProfile />} />
              </Route>
              <Route exact path="/edit-profile" element={<PrivateRoute />}>
                <Route path="" element={<EditProfile />} />
              </Route>
              <Route exact path="/add-experience" element={<PrivateRoute />}>
                <Route path="" element={<AddExperience />} />
              </Route>
              <Route exact path="/add-education" element={<PrivateRoute />}>
                <Route path="" element={<AddEducation />} />
              </Route>
              <Route exact path="/posts" element={<PrivateRoute />}>
                <Route path="" element={<Posts />} />
              </Route>
              <Route exact path="/post/:id" element={<PrivateRoute />}>
                <Route path="" element={<Post />} />
              </Route>
            </Routes>
          </section>
        </Router>
      </Fragment>
    </Provider>
  );
};

export default App;
