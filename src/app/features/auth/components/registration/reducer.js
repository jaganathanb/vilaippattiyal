import { key, actionTypes } from './actions';

export const selectors = {
  isRegistering: state => state[key].isRegistering,
  registered: state => state[key].registered
};

const initialState = {
  isRegistering: false,
  registered: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.REGISTRATION:
      return { ...state, isRegistering: true };
    case actionTypes.REGISTRATION_SUCCESS:
      return { ...state, isRegistering: false, registered: true };
    case actionTypes.REGISTRATION_FAILURE:
      return { ...state, isRegistering: false, registered: false };
    default:
      return state;
  }
}
