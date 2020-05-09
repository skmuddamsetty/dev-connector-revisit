import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alerts';
import { connect } from 'react-redux';
import { register } from '../../actions/auth';

const Register = ({ setAlert, register, isAuthenticated }) => {
  // below statment is same as
  // state  = {
  //   formData: {

  //   }
  // }
  // and setFormData is similar to this.setState()
  // in the useState Hook we are defining default values(initial State) for the variables in state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  // destructuring to pull out values in state
  const { name, email, password, passwordConfirm } = formData;

  const inputChangeHandler = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      setAlert('password do not match', 'danger');
    } else {
      console.log(formData);
      register(formData);
      // calling rest service from component example
      // const newUser = { name, email, password, passwordConfirm };
      // try {
      //   const config = {
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //   };
      //   const body = JSON.stringify(newUser);
      //   const res = await axios.post('/api/v1/users/signup', body, config);
      //   console.log(res);
      // } catch (error) {
      //   console.log(error.response.data);
      // }
    }
  };

  // // Redirecting based on authenticated state
  // if (isAuthenticated) {
  //   return <Redirect to='/dashboard' />;
  // }

  return (
    <Fragment>
      <h1 className='large text-primary'>Sign Up</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Create Your Account
      </p>
      <form className='form' onSubmit={(e) => onSubmitHandler(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Name'
            name='name'
            // required
            value={name}
            onChange={(e) => inputChangeHandler(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={(e) => inputChangeHandler(e)}
          />
          <small className='form-text'>
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
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
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            name='passwordConfirm'
            minLength='8'
            value={passwordConfirm}
            onChange={(e) => inputChangeHandler(e)}
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Register' />
      </form>
      <p className='my-1'>
        Already have an account? <Link to='/login'>Sign In</Link>
      </p>
    </Fragment>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAlert: (msg, alertType) => dispatch(setAlert(msg, alertType)),
    register: (formData) => dispatch(register(formData)),
  };
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
