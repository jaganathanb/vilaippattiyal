import { createLogic } from 'redux-logic';

import { LOGIN_CHECK, LOGOUT, LOGIN_SUCCESS, LOGIN_FAILURE } from './actions';

const logoutLogic = createLogic({
  type: LOGOUT,
  process({ action }, dispatch, done) {
    localStorage.removeItem('user');
    sessionStorage.removeItem('loggedIn');
    dispatch({
      type: LOGIN_CHECK
    });
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

    if (user || sessionStorage.getItem('loggedIn')) {
      user = await Db.User.findOne({
        where: { userId: user.userId },
        include: [{ model: Db.Role }, { model: Db.Status }]
      });

      if (user) {
        const {
          userId,
          firstName,
          lastName,
          email,
          Status: { name: status },
          Roles
        } = user.dataValues;

        const loggedInUser = {
          userId,
          firstName,
          lastName,
          email,
          status,
          roles: Roles.map(r => r.name)
        };

        dispatch({
          type: LOGIN_SUCCESS,
          payload: {
            loggedIn: loggedInUser !== null,
            user: loggedInUser
          }
        });
      } else {
        localStorage.removeItem('user');
        sessionStorage.removeItem('loggedIn');
        dispatch({
          type: LOGIN_FAILURE,
          payload: {
            loggedIn: false,
            reason: { type: 'internal', text: 'Something went wrong' }
          }
        });
      }
    } else {
      localStorage.removeItem('user');
      sessionStorage.removeItem('loggedIn');
      dispatch({
        type: LOGIN_FAILURE,
        payload: {
          loggedIn: false,
          reason: { type: 'internal', text: 'Something went wrong' }
        }
      });
    }

    done();
  }
});

export default [logoutLogic, loginCheckLogic];
