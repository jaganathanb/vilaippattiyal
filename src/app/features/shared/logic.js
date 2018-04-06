import { createLogic } from 'redux-logic';

import { LOGIN_CHECK, LOGOUT, LOGIN_SUCCESS, LOGIN_FAILURE } from './actions';

const logoutLogic = createLogic({
  type: LOGOUT,
  process({ action }, dispatch, done) {
    dispatch({ type: LOGIN_CHECK, loggedIn: false });
    done();
  }
});

const loginCheckLogic = createLogic({
  type: LOGIN_CHECK,
  async process({ Db }, dispatch, done) {
    let user;
    try {
      user = JSON.parse(localStorage.getItem('user'));
    } catch (error) {
      user = null;
    }

    if (user) {
      user = await Db.User.findOne({
        where: { id: user.id }
      });
      if (user) {
        dispatch({ type: LOGIN_SUCCESS, loggedIn: user !== null, user });
      } else {
        dispatch({ type: LOGIN_FAILURE, loggedIn: false });
      }
    } else {
      localStorage.removeItem('user');
      dispatch({ type: LOGIN_FAILURE, loggedIn: false });
    }

    done();
  }
});

export default [logoutLogic, loginCheckLogic];
