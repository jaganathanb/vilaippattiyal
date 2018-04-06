import { CHANGE_THEME } from '../shared/actions';

import themes, { defaultTheme } from '../../themes';
import { DEFAILT_THEME } from '../../utils/constants';

export const key = 'auth';
export loginReducer, { key as loginKey } from './components/login/reducer';
export registrationReducer, {key as registrationKey} from './components/registration/reducer';

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
    case CHANGE_THEME:
      return { ...state, theme: action.theme };
    default:
      return state;
  }
}
