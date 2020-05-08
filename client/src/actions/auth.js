import axios from 'axios';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
} from './types';
import { setAlert } from '../actions/alerts';
import setAuthToken from '../utils/setAuthToken';

/**
 * Load User
 */
export const loadUser = () => async (dispatch) => {
  const token = localStorage.getItem('token');
  if (token) {
    setAuthToken(token);
  }
  try {
    // const config = {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${token}`,
    //   },
    // };
    const res = await axios.get('/api/v1/users/auth');
    dispatch({ type: USER_LOADED, payload: res.data });
  } catch (error) {
    dispatch({ type: AUTH_ERROR });
  }
};

/**
 * Register action
 * @param {*} param0
 */
export const register = ({ name, email, password, passwordConfirm }) => async (
  dispatch
) => {
  const newUser = { name, email, password, passwordConfirm };
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify(newUser);
    const res = await axios.post('/api/v1/users/signup', body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: { token: res.data.token, ...res.data.data },
    });
    dispatch(loadUser());
  } catch (err) {
    console.log(err.response.data);
    dispatch({ type: REGISTER_FAIL });
    // TODO
    // const erroObj = err.response.data;
    // if (erroObj && erroObj.error && erroObj.error.message) {
    //   dispatch(setAlert(erroObj.error.message, 'danger'));
    // } else {
    //   dispatch(setAlert(err.response.data, 'danger'));
    // }
  }
};

/**
 * Login action
 * @param {*} param0
 */
export const login = ({ email, password }) => async (dispatch) => {
  const user = { email, password };
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify(user);
    const res = await axios.post('/api/v1/users/login', body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { token: res.data.token, ...res.data.data },
    });
    dispatch(loadUser());
  } catch (err) {
    console.log(err.response.data);
    dispatch({ type: LOGIN_FAIL });
    // TODO
    // const erroObj = err.response.data;
    // if (erroObj && erroObj.error && erroObj.error.message) {
    //   dispatch(setAlert(erroObj.error.message, 'danger'));
    // } else {
    //   dispatch(setAlert(err.response.data, 'danger'));
    // }
  }
};
