import React, { Fragment, useState } from 'react';

const Register = () => {
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
    password2: '',
  });

  // destructuring to pull out values in state
  const { name, email, password, password2 } = formData;

  const inputChangeHandler = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (password !== password2) {
      console.log('password do not match');
    } else {
      console.log(formData);
    }
  };

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
            required
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
            minLength='6'
            value={password}
            onChange={(e) => inputChangeHandler(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            name='password2'
            minLength='6'
            value={password2}
            onChange={(e) => inputChangeHandler(e)}
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Register' />
      </form>
      <p className='my-1'>
        Already have an account? <a href='login.html'>Sign In</a>
      </p>
    </Fragment>
  );
};

export default Register;
