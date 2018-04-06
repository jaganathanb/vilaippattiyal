import { SHOW_MODAL, HIDE_MODAL, SHOW_ALERT_IN_MODAL } from '../../actions';

export const key = 'vpmodal';

export const selectors = {
  modals: state => state[key].modals,
  alert: state => state[key].alert
};

const initialState = {
  modals: [],
  alert: { type: 'error', text: '' }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        ...state,
        modals: state.modals.concat(action.options)
      };
    case HIDE_MODAL:
      return {
        ...state,
        modals: state.modals.filter(item => item.id !== action.options.id),
        alert: initialState.alert
      };
    case SHOW_ALERT_IN_MODAL:
      return {
        ...state,
        modals: state.modals.map(modal => ({
          ...modal,
          alert:
            modal.id === action.options.modalId
              ? action.options
              : initialState.alert
        }))
      };
    default:
      return state;
  }
}
