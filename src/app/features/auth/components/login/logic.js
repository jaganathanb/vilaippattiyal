import { createLogic } from 'redux-logic';

import { actionTypes } from './actions';
import {
  actionTypes as sharedActionTypes,
  notificationActionTypes
} from '../../../shared/actions';
import translations from './translations';

const loginLogic = createLogic({
  type: actionTypes.LOGIN,

  async process({ action, Db }, dispatch, done) {
    const user = await Db.User.findOne({ where: { email: action.user.email } });
    if (user) {
      if (await user.isPasswordValid(action.user.password)) {
        sessionStorage.setItem('user', user.dataValues);
        dispatch({ type: actionTypes.LOGIN_SUCCESS });
        dispatch({ type: sharedActionTypes.LOGIN_CHECK });
      } else {
        dispatch({
          type: actionTypes.LOGIN_FAILURE,
          loggedIn: true,
          reason: { type: 'credential' }
        });
      }
    } else {
      dispatch({
        type: actionTypes.LOGIN_FAILURE,
        reason: { type: 'register' }
      });
    }

    done();
  }
});

const loginFailureLogic = createLogic({
  type: actionTypes.LOGIN_FAILURE,

  process({ action }, dispatch, done) {
    switch (action.reason.type) {
      case 'register':
        dispatch({
          type: notificationActionTypes.SHOW_NOTIFICATION,
          notification: {
            message: translations.unknownUserErrorText,
            type: 'error'
          }
        });
        break;
      case 'credential':
        dispatch({
          type: notificationActionTypes.SHOW_NOTIFICATION,
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
