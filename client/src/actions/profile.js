import axios from 'axios';
import { setAlert } from './alerts';
import { PROFILE_ERROR, GET_PROFILE } from './types';

// Get Current User Profile
export const getCurrentUserProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/v1/profile/me');
    console.log(res.data);
    dispatch({ type: GET_PROFILE, payload: res.data.profile });
  } catch (error) {
    console.log(error.response.data.message);
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        message: error.response.data.message,
      },
    });
  }
};

// Create or Update Profile
export const createProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        'content-type': 'application/json',
      },
    };
    const res = await axios.post('/api/v1/profile', formData, config);
    dispatch({ type: GET_PROFILE, payload: res.data.profile });
    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created'));
    if (!edit) {
      history.push('/dashboard');
    }
  } catch (error) {
    console.log(error.response.data.message);
    // TODO
    // const erroObj = err.response.data;
    // if (erroObj && erroObj.error && erroObj.error.message) {
    //   dispatch(setAlert(erroObj.error.message, 'danger'));
    // } else {
    //   dispatch(setAlert(err.response.data, 'danger'));
    // }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        message: error.response.data.message,
      },
    });
  }
};
