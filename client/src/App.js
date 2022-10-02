import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
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
              <Route exact path="/dashboard" element={<PrivateRoute />}>
                <Route path="" element={<Dashboard />} />
              </Route>
            </Routes>
          </section>
        </Router>
      </Fragment>
    </Provider>
  );
};

export default App;
