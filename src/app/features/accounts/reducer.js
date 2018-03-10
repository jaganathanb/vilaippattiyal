import { actionTypes as sharedActioTypes } from "../shared/actions";
import { key } from "./actions";

import {
  DEFAULT_LOCALE,
  DEFAILT_THEME,
  LANGUAGES
} from "../../utils/constants";

export const selectors = {
  language: state => state[key].language,
  languages: state => state[key].languages,
  theme: state => state[key].theme
};

const initialState = {
  language: localStorage.getItem("language") || DEFAULT_LOCALE,
  languages: [],
  theme: localStorage.getItem("theme") || DEFAILT_THEME
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case sharedActioTypes.CHANGE_LOCALE:
      return {
        ...state,
        language: action.language
      };
    case sharedActioTypes.CHANGE_THEME:
      return {
        ...state,
        theme: action.theme
      };
    default:
      return state;
  }
}
