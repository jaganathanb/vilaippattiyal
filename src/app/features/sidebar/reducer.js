import { key, actionTypes } from './actions';
import { actionTypes as sharedActionTypes } from '../shared/actions';

export const selectors = {
  currentTab: state => state[key].currentTab,
  expanded: state => state[key].expanded
};

const initialState = {
  currentTab: 'dashboard',
  expanded: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_TAB:
      return { ...state, currentTab: action.tab };
    case sharedActionTypes.SET_SIDEBAR_VISIBILITY:
      return { ...state, expanded: !state.expanded };
    default:
      return state;
  }
}
