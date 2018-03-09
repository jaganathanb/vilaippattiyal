import { key, actionTypes } from './actions';
import { actionTypes as sharedActionTypes } from '../../shared/actions';

import themes, { defaultTheme } from '../../../themes';
import { DEFAILT_THEME } from '../../../utils/constants';

const isLoading = state => state[key].isLoading;
const theme = state => {
  const selectedTheme = themes.filter(t => t.id === state[key].theme)[0];
  return (selectedTheme && selectedTheme.source) || defaultTheme;
};
const user = state => state[key].user;

export const selectors = { isLoading, theme, user };

const initialState = {
  isLoading: true,
  theme: localStorage.getItem('theme') || DEFAILT_THEME,
  user: sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.APP_LOADING:
      return { ...state, isLoading: true };
    case sharedActionTypes.CHANGE_THEME:
      return { ...state, theme: action.theme };
    case sharedActionTypes.LOGIN_SUCCESS:
      return { ...state, user: action.user };
    default:
      return { ...state, isLoading: false };
  }
}
