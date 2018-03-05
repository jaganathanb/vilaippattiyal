export const key = 'registration';

const REGISTRATION = 'REGISTRATION';
const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';
const REGISTRATION_FAILURE = 'REGISTRATION_FAILURE';

export const actionTypes = {
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILURE,
  REGISTRATION
};

const register = user => ({ type: REGISTRATION, user });

export const actions = { register };
