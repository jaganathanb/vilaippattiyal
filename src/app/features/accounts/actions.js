export const key = 'accounts';

const FETCH_USERS = 'FETCH_USERS';
const FETCH_USERS_FAILED = 'FETCH_USERS_FAILED';
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const FETCH_USERS_PROGRESS = 'FETCH_USERS_PROGRESS';

const FETCH_ROLES = 'FETCH_ROLES';
const FETCH_ROLES_FAILED = 'FETCH_ROLES';
const FETCH_ROLES_SUCCESS = 'FETCH_ROLES';
const FETCH_ROLES_PROGRESS = 'FETCH_ROLES';
export const actionTypes = {
  FETCH_USERS,
  FETCH_USERS_FAILED,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_PROGRESS,
  FETCH_ROLES,
  FETCH_ROLES_FAILED,
  FETCH_ROLES_SUCCESS,
  FETCH_ROLES_PROGRESS
};

const fetchUsers = () => ({ type: FETCH_USERS });
const fetchRoles = () => ({ type: FETCH_ROLES });

export const actions = {
  fetchRoles,
  fetchUsers
};
