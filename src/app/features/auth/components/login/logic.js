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
    const user = await Db.User.findOne({ where: { email: action.user.email } });
    if (user) {
      if (await user.isPasswordValid(action.user.password)) {
        localStorage.setItem('user', JSON.stringify(user.dataValues));
        dispatch({
          type: LOGIN_SUCCESS,
          user: user.dataValues
        });
        dispatch({ type: LOGIN_CHECK });
      } else {
        dispatch({
          type: LOGIN_FAILURE,
          loggedIn: true,
          reason: { type: 'credential' }
        });
      }
    } else {
      dispatch({
        type: LOGIN_FAILURE,
        reason: { type: 'register' }
      });
    }

    done();
  }
});

const loginFailureLogic = createLogic({
  type: LOGIN_FAILURE,

  process({ action }, dispatch, done) {
    switch (action.reason.type) {
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
