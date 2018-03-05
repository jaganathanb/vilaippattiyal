import { key, actionTypes } from './actions';

export const selectors = {
  message: state => state[key].message,
  type: state => state[key].type
};

const initialState = {
  message: {},
  type: 'info'
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SHOW_NOTIFICATION:
      return { ...state, ...{ message: action.notification.message, type: action.notification.type } };
    case actionTypes.HIDE_NOTIFICATION:
      return { ...state, ...{ message: {}, type: 'info' } };
    default:
      return state;
  }
}
