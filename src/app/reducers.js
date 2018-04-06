import { combineReducers } from 'redux';

import { reducer as reduxFormReducer } from 'redux-form';

import timerReducer, { key as timerKey } from './features/dashboard/reducer';
import sideBarReducer, { key as sideBarKey } from './features/sidebar/reducer';
import configurationReducer, {key as configKey} from './features/configuration/reducer';
import authReducer, {
  loginReducer,
  registrationReducer,
  loginKey,
  registrationKey,
  key as authKey
} from './features/auth/reducer';
import modalReducer, {key as modalKey} from './features/shared/components/modal/reducer';
import notificationReducer, {key as notificationKey} from './features/shared/components/notification/reducer';
import authorizedReducer, {key as authorizedKey} from './features/layouts/authorized/reducer';
import accountsReducer, {key as accountsKey} from './features/accounts/reducer';

import { LOGIN_CHECK } from './features/shared/actions';

const statesToBePersisted = ['config', 'auth', 'authorized'];

const globalReducer = (
  state = { loggedIn: false, isAppLoading: true },
  action
) => {
  switch (action.type) {
    case LOGIN_CHECK:
      return {
        ...state,
        loggedIn: localStorage.getItem('user') !== null,
        isAppLoading: false
      };
    default:
      return state;
  }
};

const appReducer = combineReducers({
  [timerKey]: timerReducer,
  [sideBarKey]: sideBarReducer,
  [configKey]: configurationReducer,
  [loginKey]: loginReducer,
  [registrationKey]: registrationReducer,
  [authorizedKey]: authorizedReducer,
  [authKey]: authReducer,
  [notificationKey]: notificationReducer,
  [modalKey]: modalReducer,
  [accountsKey]: accountsReducer,
  form: reduxFormReducer,
  global: globalReducer
});

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    Object.keys(state).forEach(key => {
      if (!statesToBePersisted.some(s => s === key)) {
        state[key] = undefined;
      }
    });
  }

  return appReducer(state, action);
};

export default rootReducer;
