export const key = 'sidebar';

// action type constants
const CHANGE_TAB = 'CHANGE_TAB';

export const actionTypes = { CHANGE_TAB };

// action creators
const changeTab = tab => ({ type: CHANGE_TAB, tab });

export const actions = {
  changeTab
};
