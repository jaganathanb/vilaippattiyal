import { CHANGE_LOCALE, CHANGE_THEME } from '../shared/actions';

import {
  DEFAULT_LOCALE,
  DEFAILT_THEME,
  LANGUAGES
} from '../../utils/constants';

export const key = 'config';

const translationsLang = [];
Object.keys(LANGUAGES).forEach(msg =>
  translationsLang.push({ ...LANGUAGES[msg], ...{ language: msg } }));

export const selectors = {
  language: state => state[key].language,
  languages: state => state[key].languages,
  theme: state => state[key].theme
};

const initialState = {
  language: localStorage.getItem('language') || DEFAULT_LOCALE,
  languages: translationsLang,
  theme: localStorage.getItem('theme') || DEFAILT_THEME
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_LOCALE:
      return {
        ...state,
        language: action.language
      };
    case CHANGE_THEME:
      return {
        ...state,
        theme: action.theme
      };
    default:
      return state;
  }
}
