import { actionTypes } from './actions';
import {
  LOGIN_CHECK,
  LOGIN_FAILURE,
  LOGIN_SUCCESS
} from '../../../shared/actions';

export const key = 'login';

export const selectors = {
  isLoggingIn: state => state[key].isLoggingIn,
  loggedIn: state => state[key].loggedIn
};

const initialState = {
  isLoggingIn: false,
  loggedIn: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOGIN:
      return { ...state, isLoggingIn: true };
    case LOGIN_CHECK:
      return {
        ...state,
        isLoggingIn: false,
        loggedIn: localStorage.getItem('user') !== null
      };
    case LOGIN_SUCCESS:
      return { ...state, loggedIn: true, isLoggingIn: false };
    case LOGIN_FAILURE:
      return { ...state, isLoggingIn: false };
    default:
      return state;
  }
}
