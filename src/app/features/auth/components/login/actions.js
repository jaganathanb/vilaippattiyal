export const key = 'login';

const LOGIN = 'LOGIN';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const actionTypes = {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN
};

const login = user => ({ type: LOGIN, user });

export const actions = {
  login
};
