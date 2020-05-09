import React, { useState, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  // destructuring to pull out values in state
  const { email, password } = formData;

  const inputChangeHandler = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    login(formData);
  };

  // Redirecting based on authenticated state
  // if (isAuthenticated) {
  //   return <Redirect to='/dashboard' />;
  // }

  return (
    <Fragment>
      <h1 className='large text-primary'>Login</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Log in to your account
      </p>
      <form className='form' onSubmit={(e) => onSubmitHandler(e)}>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={(e) => inputChangeHandler(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            minLength='8'
            value={password}
            onChange={(e) => inputChangeHandler(e)}
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Login' />
      </form>
      <p className='my-1'>
        Don't have an account? <Link to='/register'>Sign Up</Link>
      </p>
    </Fragment>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (formData) => dispatch(login(formData)),
  };
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
