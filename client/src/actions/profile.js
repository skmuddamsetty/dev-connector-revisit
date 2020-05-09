import axios from 'axios';
// import { setAlert } from './alerts';
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
