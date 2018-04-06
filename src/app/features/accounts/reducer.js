import { actionTypes } from './actions';

export const key = 'accounts';
export const selectors = {
  expanded: state => state[key].expanded,
  rolesError: state => state[key].rolesError,
  usersError: state => state[key].usersError,
  users: state => state[key].users,
  roles: state => state[key].roles,
  isUserSaving: state => state[key].isUserSaving,
  userSaved: state => state[key].userSaved,
  userDeleted: state => state[key].userDeleted,
  userSaveError: state => state[key].userSaveError,
  userDeleteError: state => state[key].userDeleteError
};

const initialState = {
  rolseError: '',
  usersError: '',
  userSaveError: '',
  userDeleteError: '',
  roles: [],
  users: [],
  expanded: 'users',
  userSaved: false,
  userDeleted: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SAVE_USER_SUCCESS:
      return { ...state, userSaved: true };
    case actionTypes.SAVE_USER_FAILURE:
      return {
        ...state,
        saveInProgress: false,
        userSaved: false,
        userSaveError: action.reason.text
      };
    case actionTypes.DELETE_USER_SUCCESS:
      return { ...state, userDeleted: true };
    case actionTypes.DELETE_USER_FAILURE:
      return {
        ...state,
        deleteInProgress: false,
        userDeleted: false,
        userDeleteError: action.reason.text
      };
    case actionTypes.EXPAND_ACCOUNT_PANEL:
      return { ...state, expanded: action.panel };
    case actionTypes.FETCH_ROLES_PROGRESS:
      return { ...state, rolesInProgress: true };
    case actionTypes.FETCH_USERS_PROGRESS:
      return { ...state, usersInProgress: true };
    case actionTypes.FETCH_ROLES_SUCCESS:
      return {
        ...state,
        rolesInProgress: false,
        rolesError: '',
        roles: action.roles
      };
    case actionTypes.FETCH_USERS_SUCCESS:
      return {
        ...state,
        usersInProgress: false,
        usersError: '',
        users: action.users
      };
    case actionTypes.FETCH_ROLES_FAILED:
      return {
        ...state,
        rolesInProgress: false,
        rolesError: action.reason.text
      };
    case actionTypes.FETCH_USERS_FAILED:
      return {
        ...state,
        usersInProgress: false,
        usersError: action.reason.text
      };
    default:
      return state;
  }
}
