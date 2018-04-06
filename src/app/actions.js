import { actions as timerActions } from './features/dashboard/actions';
import { loginActions, registrationActions } from './features/auth/actions';
import accountsActions from './features/accounts/actions';

import * as sharedActions from './features/shared/actions';

const {
  hideModal,
  hideNotification,
  showModal,
  showNotification,
  logout,
  isLoggedIn,
  setSideBarVisibility,
  changeTheme,
  changeLocale
} = sharedActions;

const rootActions = {
  timerActions,
  sharedActions,
  loginActions,
  registrationActions,
  accountsActions,
  hideModal,
  hideNotification,
  showModal,
  showNotification,
  logout,
  isLoggedIn,
  setSideBarVisibility,
  changeTheme,
  changeLocale
};

export default rootActions;
