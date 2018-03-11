import { key, actionTypes } from './actions';

export const selectors = {
  expanded: state => state[key].expanded,
  rolesError: state => state[key].rolesError,
  usersError: state => state[key].usersError,
  users: state => state[key].users,
  roles: state => state[key].roles
};

const initialState = {
  rolseError: '',
  usersError: '',
  roles: [],
  users: [],
  expanded: 'users'
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.EXPAND_ACCOUNT_PANEL:
      return {
        ...state,
        expanded: action.panel
      };
    case actionTypes.FETCH_ROLES_PROGRESS:
      return {
        ...state,
        rolesInProgress: true
      };
    case actionTypes.FETCH_USERS_PROGRESS:
      return {
        ...state,
        usersInProgress: true
      };
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
        rolesError: action.reason
      };
    case actionTypes.FETCH_USERS_FAILED:
      return {
        ...state,
        usersInProgress: false,
        usersError: action.reason
      };
    default:
      return state;
  }
}
