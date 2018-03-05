export const key = 'notification';
const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';
const HIDE_NOTIFICATION = 'HIDE_NOTIFICATION';

export const actionTypes = {
  SHOW_NOTIFICATION, HIDE_NOTIFICATION
};

const showNotification = (message, type = 'info') => ({
  type: SHOW_NOTIFICATION,
  notification: { message, type },
});

const hideNotification = () => ({
  type: HIDE_NOTIFICATION,
});

export const actions = {
  showNotification,
  hideNotification
};
