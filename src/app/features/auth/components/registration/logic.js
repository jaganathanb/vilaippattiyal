import { createLogic } from 'redux-logic';

import { actionTypes } from './actions';

import { SHOW_NOTIFICATION } from '../../../shared/actions';
import translations from './translations';

const registrationLogic = createLogic({
  type: actionTypes.REGISTRATION,
  async process({ action, Db }, dispatch, done) {
    const user = await Db.User.findOne({
      where: { email: action.user.email }
    });

    if (user) {
      dispatch({
        type: actionTypes.REGISTRATION_FAILURE,
        reason: { type: 'register' }
      });
    } else {
      let role = await Db.Role.findOne({ where: { name: 'User' } });
      let status = await Db.Status.findOne({ where: { name: true } });

      if (!role) {
        role = await Db.Role.create({ name: 'User' });
      }

      if (!status) {
        status = await Db.Status.create({ name: true });
      }

      try {
        const newUser = await Db.User.create(action.user);
        await newUser.setRoles([role]);
        await newUser.setStatus(status);

        dispatch({
          type: actionTypes.REGISTRATION_SUCCESS,
          reason: { type: 'success' }
        });
      } catch (error) {
        dispatch({
          type: actionTypes.REGISTRATION_FAILURE,
          reason: { type: 'error', text: error }
        });
      }

      done();
    }
  }
});

const registrationFailureLogic = createLogic({
  type: actionTypes.REGISTRATION_FAILURE,

  process({ action }, dispatch, done) {
    switch (action.reason.type) {
      case 'register':
        dispatch({
          type: SHOW_NOTIFICATION,
          notification: {
            message: translations.userExsits,
            type: 'error'
          }
        });
        break;
      case 'error':
        dispatch({
          type: SHOW_NOTIFICATION,
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
          type: SHOW_NOTIFICATION,
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
