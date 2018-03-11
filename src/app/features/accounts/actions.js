export const key = 'accounts';

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
