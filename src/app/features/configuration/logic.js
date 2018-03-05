import { createLogic } from 'redux-logic';

import { actionTypes as sharedActionTypes } from '../shared/actions';

const localeLogic = createLogic({
  type: sharedActionTypes.CHANGE_LOCALE,
  process({ action }, dispatch, done) {
    localStorage.setItem('language', action.language);
    done();
  }
});

const themeLogic = createLogic({
  type: sharedActionTypes.CHANGE_THEME,
  process({ action }, dispatch, done) {
    localStorage.setItem('theme', action.theme);
    done();
  }
});

export default [themeLogic, localeLogic];
