// action type constants
const APP_LOADING = 'APP_LOADING';

export const actionTypes = { APP_LOADING };

// action creators
const setAppBusy = () => ({ type: APP_LOADING });

export const actions = { setAppBusy };
