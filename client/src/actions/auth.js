import axios from 'axios';
import { REGISTER_SUCCESS, REGISTER_FAIL } from './types';
import { setAlert } from '../actions/alerts';

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
  } catch (err) {
    console.log(err.response.data);
    const errorMessage = err.response.data.error.message;
    dispatch({ type: REGISTER_FAIL });
    if (errorMessage) {
      dispatch(setAlert(errorMessage, 'danger'));
    }
  }
};
