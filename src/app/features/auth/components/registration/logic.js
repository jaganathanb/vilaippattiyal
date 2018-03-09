import { createLogic } from 'redux-logic';

import { actionTypes } from './actions';

import { notificationActionTypes } from '../../../shared/actions';
import translations from './translations';

const registrationLogic = createLogic({
  type: actionTypes.REGISTRATION,
  async process({ action, Db }, dispatch, done) {
    const user = await Db.User.findOne({ where: { email: action.user.email } });
    if (user) {
      dispatch({
        type: actionTypes.REGISTRATION_FAILURE,
        reason: { type: 'register' }
      });
    } else {
      const data = {
        email: action.user.email,
        password: action.user.password,
        firstName: action.user.firstname,
        lastName: action.user.lastname,
        createdAt: new Date()
      };

      const newUser = await Db.User.create(data);
      if (!newUser) {
        dispatch({ type: actionTypes.REGISTRATION_FAILURE, reason: { type: 'error' } });
      }

      if (newUser) {
        dispatch({ type: actionTypes.REGISTRATION_SUCCESS, reason: { type: 'success' } });
      }
    }

    done();
  }
});

const registrationFailureLogic = createLogic({
  type: actionTypes.REGISTRATION_FAILURE,

  process({ action }, dispatch, done) {
    switch (action.reason.type) {
      case 'register':
        dispatch({
          type: notificationActionTypes.SHOW_NOTIFICATION,
          notification: {
            message: translations.userExsits,
            type: 'error'
          }
        });
        break;
      case 'error':
        dispatch({
          type: notificationActionTypes.SHOW_NOTIFICATION,
          notification: {
            message: translations.somethingWentWrong,
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

const registrationSuccessLogic = createLogic({
  type: actionTypes.REGISTRATION_SUCCESS,

  process({ action }, dispatch, done) {
    switch (action.reason.type) {
      case 'success':
        dispatch({
          type: notificationActionTypes.SHOW_NOTIFICATION,
          notification: {
            message: translations.success
          }
        });
        break;
      default:
        break;
    }
    done();
  }
});

export default [registrationLogic, registrationFailureLogic, registrationSuccessLogic];
//
