import { actions as timerActions } from './features/dashboard/actions';
import { actions as sharedActions } from './features/shared/actions';
import { loginActions, registrationActions } from './features/auth/actions';

const rootActions = {
  timerActions,
  sharedActions,
  loginActions,
  registrationActions
};

export default rootActions;
