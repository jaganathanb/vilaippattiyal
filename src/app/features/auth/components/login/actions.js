const LOGIN = 'LOGIN';

export const actionTypes = {
  LOGIN
};

const login = user => ({ type: LOGIN, user });

export const actions = {
  login
};
