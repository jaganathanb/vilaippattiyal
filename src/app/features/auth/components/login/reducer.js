import { actionTypes } from './actions';
import { LOGIN_FAILURE, LOGIN_SUCCESS } from '../../../shared/actions';

export const key = 'login';

export const selectors = {
  isLoggingIn: state => state[key].isLoggingIn
};

const initialState = {
  isLoggingIn: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOGIN:
      return { ...state, isLoggingIn: true };
    case LOGIN_SUCCESS:
      return { ...state, isLoggingIn: false };
    case LOGIN_FAILURE:
      return { ...state, isLoggingIn: false };
    default:
      return state;
  }
}
