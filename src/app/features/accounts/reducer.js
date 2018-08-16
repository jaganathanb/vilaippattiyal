import { actionTypes } from './actions';

export const key = 'accounts';
export const selectors = {
  expanded: state => state[key].expanded,
  saveRoleInProgress: state => state[key].saveRoleInProgress,
  saveUserInProgress: state => state[key].saveUserInProgress,
  deleteUserInProgress: state => state[key].deleteUserInProgress,
  deleteRoleInProgress: state => state[key].deleteRoleInProgress,
  rolesInProgress: state => state[key].rolesInProgress,
  usersInProgress: state => state[key].usersInProgress,
  rolesError: state => state[key].rolesError,
  usersError: state => state[key].usersError,
  users: state => state[key].users,
  roles: state => state[key].roles,
  statuses: state => state[key].statuses,
  userSaved: state => state[key].userSaved,
  userDeleted: state => state[key].userDeleted,
  roleSaved: state => state[key].roleSaved,
  roleSaveError: state => state[key].roleSaveError,
  roleDeleted: state => state[key].roleDeleted,
  roleDeleteError: state => state[key].roleDeleteError,
  userSaveError: state => state[key].userSaveError,
  userDeleteError: state => state[key].userDeleteError
};

const initialState = {
  rolesError: '',
  usersError: '',
  roleSaveError: '',
  roleDeleteError: '',
  userSaveError: '',
  userDeleteError: '',
  roles: [],
  users: [],
  statuses: [],
  expanded: 'users',
  saveUserInProgress: false,
  deleteUserInProgress: false,
  saveRoleInProgress: false,
  deleteRoleInProgress: false,
  rolesInProgress: true,
  usersInProgress: true,
  roleSaved: false,
  roleDeleted: false,
  userSaved: false,
  userDeleted: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SAVE_USER_SUCCESS:
      return { ...state, userSaved: true, saveUserInProgress: false };
    case actionTypes.SAVE_ROLE_SUCCESS:
      return { ...state, roleSaved: true, saveRoleInProgress: false };
    case actionTypes.SAVE_USER_INPROGRESS:
      return { ...state, saveUserInProgress: true };
    case actionTypes.SAVE_ROLE_INPROGRESS:
      return { ...state, saveRoleInProgress: true };
    case actionTypes.DELETE_USER_INPROGRESS:
      return { ...state, deleteUserInProgress: true };
    case actionTypes.DELETE_ROLE_INPROGRESS:
      return { ...state, deleteRoleInProgress: true };
    case actionTypes.SAVE_USER_FAILURE:
      return {
        ...state,
        saveUserInProgress: false,
        userSaved: false,
        userSaveError: action.reason.text
      };
    case actionTypes.SAVE_ROLE_FAILURE:
      return {
        ...state,
        saveRoleInProgress: false,
        roleSaved: false,
        roleSaveError: action.reason.text
      };
    case actionTypes.DELETE_USER_SUCCESS:
      return { ...state, userDeleted: true, deleteUserInProgress: false };
    case actionTypes.DELETE_USER_FAILURE:
      return {
        ...state,
        deleteUserInProgress: false,
        userDeleted: false,
        userDeleteError: action.reason.text
      };
    case actionTypes.EXPAND_ACCOUNT_PANEL:
      return { ...state, expanded: action.payload.panel };
    case actionTypes.FETCH_ROLES_PROGRESS:
      return { ...state, rolesInProgress: true };
    case actionTypes.FETCH_USERS_PROGRESS:
      return { ...state, usersInProgress: true };
    case actionTypes.FETCH_ROLES_SUCCESS:
      return {
        ...state,
        rolesInProgress: false,
        rolesError: '',
        roles: action.payload.roles
      };
    case actionTypes.FETCH_USERS_SUCCESS:
      return {
        ...state,
        usersInProgress: false,
        usersError: '',
        users: action.payload.users
      };
    case actionTypes.FETCH_ROLES_FAILED:
      return {
        ...state,
        rolesInProgress: false,
        rolesError: action.payload.reason.text
      };
    case actionTypes.FETCH_STATUS_SUCCESS:
      return {
        ...state,
        statuses: action.payload.statuses
      };
    case actionTypes.FETCH_USERS_FAILED:
      return {
        ...state,
        usersInProgress: false,
        usersError: action.payload.reason.text
      };
    default:
      return state;
  }
}
