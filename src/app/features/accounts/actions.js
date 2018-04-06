const SAVE_USER = 'SAVE_USER';
const SAVE_USER_SUCCESS = 'SAVE_USER_SUCCESS';
const SAVE_USER_FAILURE = 'SAVE_USER_FAILURE';

const DELETE_USER = 'DELETE_USER';
const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
const DELETE_USER_FAILURE = 'DELETE_USER_FAILURE';

const FETCH_USERS = 'FETCH_USERS';
const FETCH_USERS_FAILED = 'FETCH_USERS_FAILED';
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const FETCH_USERS_PROGRESS = 'FETCH_USERS_PROGRESS';

const FETCH_ROLES = 'FETCH_ROLES';
const FETCH_ROLES_FAILED = 'FETCH_ROLES_FAILED';
const FETCH_ROLES_SUCCESS = 'FETCH_ROLES_SUCCESS';
const FETCH_ROLES_PROGRESS = 'FETCH_ROLES_PROGRESS';

const EXPAND_ACCOUNT_PANEL = 'EXPAND_ACCOUNT_PANEL';
export const actionTypes = {
  SAVE_USER,
  SAVE_USER_SUCCESS,
  SAVE_USER_FAILURE,
  DELETE_USER_FAILURE,
  DELETE_USER_SUCCESS,
  DELETE_USER,
  FETCH_USERS,
  FETCH_USERS_FAILED,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_PROGRESS,
  FETCH_ROLES,
  FETCH_ROLES_FAILED,
  FETCH_ROLES_SUCCESS,
  FETCH_ROLES_PROGRESS,
  EXPAND_ACCOUNT_PANEL
};

const saveUser = user => ({ type: SAVE_USER, user });
const deleteUser = user => ({ type: DELETE_USER, user });
const fetchUsers = () => ({ type: FETCH_USERS });
const fetchRoles = () => ({ type: FETCH_ROLES });
const fetchUsersInProgress = () => ({ type: FETCH_USERS_PROGRESS });
const fetchUsersSuccess = users => ({ type: FETCH_USERS_SUCCESS, users });
const fetchRolesSuccess = roles => ({ type: FETCH_ROLES_SUCCESS, roles });
const fetchRolesFailure = reason => ({ type: FETCH_ROLES_FAILED, reason });
const fetchUsersFailure = reason => ({ type: FETCH_USERS_FAILED, reason });
const fetchRolesInProgress = () => ({ type: FETCH_ROLES_PROGRESS });
const expand = panel => ({
  type: EXPAND_ACCOUNT_PANEL,
  panel
});

export default {
  saveUser,
  deleteUser,
  fetchRoles,
  fetchUsers,
  expand,
  fetchRolesInProgress,
  fetchUsersInProgress,
  fetchRolesFailure,
  fetchUsersFailure,
  fetchRolesSuccess,
  fetchUsersSuccess
};
