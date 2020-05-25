import React, { Fragment, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
// Redux
import { Provider } from 'react-redux';
import store from './store/configureStore';
import Alert from './components/layout/Alert';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import PublicRoute from './components/routing/PublicRoute';
import CreateProfile from './components/profile-form/CreateProfile';

const token = localStorage.getItem('token');
if (token) {
  console.log('calling setAuthToken from App.js');
  setAuthToken(token);
}

const App = () => {
  // using useEffect hook which is similar to componentDidMount
  useEffect(() => {
    console.log('calling loadUser from App.js');
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <section className='container'>
            <Alert />
            <Switch>
              <PublicRoute exact path='/login' component={Login} />
              <PublicRoute exact path='/register' component={Register} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute
                exact
                path='/create-profile'
                component={CreateProfile}
              />
            </Switch>
          </section>
        </Fragment>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
