export {
  key as notificationKey,
  actionTypes as notificationActionTypes,
  actions as notificationActions
} from './components/notification/actions';

export const key = 'shared';

// action type constants
const SET_SIDEBAR_VISIBILITY = 'SET_SIDEBAR_VISIBILITY';
const LOGOUT = 'LOGOUT';
const LOGIN_CHECK = 'LOGIN_CHECK';
const CHANGE_THEME = 'CHANGE_THEME';
const CHANGE_LOCALE = 'CHANGE_LOCALE';

export const actionTypes = {
  SET_SIDEBAR_VISIBILITY,
  LOGOUT,
  LOGIN_CHECK,
  CHANGE_THEME,
  CHANGE_LOCALE
};

// action creators
const setSideBarVisibility = () => ({ type: SET_SIDEBAR_VISIBILITY });
const logout = () => ({ type: LOGOUT });
const isLoggedIn = () => ({ type: LOGIN_CHECK });
const changeTheme = theme => ({ type: CHANGE_THEME, theme });
const changeLocale = language => ({
  type: CHANGE_LOCALE,
  language
});

export const actions = {
  setSideBarVisibility,
  logout,
  isLoggedIn,
  changeTheme,
  changeLocale
};
