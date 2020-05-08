import { combineReducers } from 'redux';
import alerts from './alerts';
import auth from './auth';

export default combineReducers({ alerts, auth });
