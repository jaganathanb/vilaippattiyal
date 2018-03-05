import { actionTypes as sharedActionTypes } from '../shared/actions';

import themes, { defaultTheme } from '../../themes';
import { DEFAILT_THEME } from '../../utils/constants';

import key from './actions';

export const selectors = {
  theme: state => {
    const selectedTheme = themes.filter(t => t.id === state[key].theme)[0];
    return (selectedTheme && selectedTheme.source) || defaultTheme;
  }
};

const initialState = {
  theme: localStorage.getItem('theme') || DEFAILT_THEME
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case sharedActionTypes.CHANGE_THEME:
      return { ...state, theme: action.theme };
    default:
      return state;
  }
}


export loginReducer from './components/login/reducer';
export registrationReducer from './components/registration/reducer';
