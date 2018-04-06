import { SHOW_NOTIFICATION, HIDE_NOTIFICATION } from '../../actions';

export const key = 'notification';

export const selectors = {
  message: state => state[key].message,
  type: state => state[key].type || 'info'
};

const initialState = {
  message: {},
  type: 'info'
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return {
        ...state,
        ...{
          message: action.notification.message,
          type: action.notification.type
        }
      };
    case HIDE_NOTIFICATION:
      return { ...state, ...{ message: {}, type: 'info' } };
    default:
      return state;
  }
}
