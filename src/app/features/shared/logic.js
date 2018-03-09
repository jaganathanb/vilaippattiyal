import { createLogic } from 'redux-logic';

import { actionTypes } from './actions';

const logoutLogic = createLogic({
  type: actionTypes.LOGOUT,
  process({ action }, dispatch, done) {
    localStorage.removeItem('user');
    dispatch({ type: actionTypes.LOGIN_CHECK, loggedIn: false });
    done();
  }
});

export default [logoutLogic];
