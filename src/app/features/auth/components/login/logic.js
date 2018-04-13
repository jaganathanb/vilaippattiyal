import { createLogic } from 'redux-logic';

import { actionTypes } from './actions';
import {
  LOGIN_FAILURE,
  SHOW_NOTIFICATION,
  LOGIN_SUCCESS,
  LOGIN_CHECK
} from '../../../shared/actions';
import translations from './translations';

const loginLogic = createLogic({
  type: actionTypes.LOGIN,

  async process({ action, Db }, dispatch, done) {
    const user = await Db.User.findOne({
      where: { email: action.user.email },
      include: [{ model: Db.Role }, { model: Db.Status }]
    });
    if (user) {
      if (await user.isPasswordValid(action.user.password)) {
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

        localStorage.setItem('user', JSON.stringify(loggedInUser));
        sessionStorage.setItem('loggedId', JSON.stringify(true));

        dispatch({
          type: LOGIN_SUCCESS,
          payload: {
            user: loggedInUser
          }
        });
      } else {
        dispatch({
          type: LOGIN_FAILURE,
          payload: {
            loggedIn: true,
            reason: { type: 'credential' }
          }
        });
      }
    } else {
      dispatch({
        type: LOGIN_FAILURE,
        payload: {
          loggedIn: true,
          reason: { type: 'register' }
        }
      });
    }

    done();
  }
});

const loginFailureLogic = createLogic({
  type: LOGIN_FAILURE,

  process({ action }, dispatch, done) {
    switch (action.payload.reason.type) {
      case 'register':
        dispatch({
          type: SHOW_NOTIFICATION,
          notification: {
            message: translations.unknownUserErrorText,
            type: 'error'
          }
        });
        break;
      case 'credential':
        dispatch({
          type: SHOW_NOTIFICATION,
          notification: {
            message: translations.credentialMatchErrorText,
            type: 'error'
          }
        });
        break;
      default:
        break;
    }
    done();
  }
});

export default [loginLogic, loginFailureLogic];
//
