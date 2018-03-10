import { combineReducers } from "redux";

import { reducer as reduxFormReducer } from "redux-form";

import timerReducer from "./features/dashboard/reducer";
import sideBarReducer from "./features/sidebar/reducer";
import configurationReducer, {
  key as configKey
} from "./features/configuration/reducer";
import authReducer, {
  loginReducer,
  registrationReducer
} from "./features/auth/reducer";
import authorizedReducer from "./features/layouts/authorized/reducer";
import { notificationReducer } from "./features/shared/reducer";
import accountsReducer from "./features/accounts/reducer";

import { key as timerKey } from "./features/dashboard/actions";
import { key as sideBarKey } from "./features/sidebar/actions";
import { key as accountKey } from "./features/accounts/actions";
import authKey, {
  loginActions,
  registrationActions
} from "./features/auth/actions";
import { key as authorizedKey } from "./features/layouts/authorized/actions";
import {
  actionTypes as sharedActionTypes,
  notificationKey
} from "./features/shared/actions";

const statesToBePersisted = ["config", "auth", "authorized"];

const globalReducer = (
  state = { loggedIn: false, isAppLoading: true },
  action
) => {
  switch (action.type) {
    case sharedActionTypes.LOGIN_CHECK:
      return {
        ...state,
        loggedIn: localStorage.getItem("user") !== null,
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
  [loginActions.key]: loginReducer,
  [registrationActions.key]: registrationReducer,
  [authorizedKey]: authorizedReducer,
  [authKey]: authReducer,
  [notificationKey]: notificationReducer,
  [accountKey]: accountsReducer,
  form: reduxFormReducer,
  global: globalReducer
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    Object.keys(state).forEach(key => {
      if (!statesToBePersisted.some(s => s === key)) {
        state[key] = undefined;
      }
    });
  }

  return appReducer(state, action);
};

export default rootReducer;
