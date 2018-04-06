import { createLogic } from 'redux-logic';

import { CHANGE_LOCALE, CHANGE_THEME } from '../shared/actions';

const localeLogic = createLogic({
  type: CHANGE_LOCALE,
  process({ action }, dispatch, done) {
    localStorage.setItem('language', action.language);
    done();
  }
});

const themeLogic = createLogic({
  type: CHANGE_THEME,
  process({ action }, dispatch, done) {
    localStorage.setItem('theme', action.theme);
    done();
  }
});

export default [themeLogic, localeLogic];
