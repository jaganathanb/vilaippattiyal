// action type constants
export const SET_SIDEBAR_VISIBILITY = 'SET_SIDEBAR_VISIBILITY';
export const LOGOUT = 'LOGOUT';
export const LOGIN_CHECK = 'LOGIN_CHECK';
export const CHANGE_THEME = 'CHANGE_THEME';
export const CHANGE_LOCALE = 'CHANGE_LOCALE';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const SHOW_MODAL = 'SHOW_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';
export const SHOW_ALERT_IN_MODAL = 'SHOW_ALERT_IN_MODAL';
export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';
export const HIDE_NOTIFICATION = 'HIDE_NOTIFICATION';

// action creators
export const setSideBarVisibility = () => ({ type: SET_SIDEBAR_VISIBILITY });
export const logout = () => ({ type: LOGOUT });
export const isLoggedIn = () => ({ type: LOGIN_CHECK });
export const changeTheme = theme => ({ type: CHANGE_THEME, theme });
export const changeLocale = language => ({
  type: CHANGE_LOCALE,
  language
});
export const showModal = options => ({
  type: SHOW_MODAL,
  options
});
export const hideModal = options => ({
  type: HIDE_MODAL,
  options
});
export const showAlertInModal = options => ({
  type: SHOW_ALERT_IN_MODAL,
  options
});
export const showNotification = (message, type = 'info') => ({
  type: SHOW_NOTIFICATION,
  notification: { message, type }
});

export const hideNotification = () => ({
  type: HIDE_NOTIFICATION
});
