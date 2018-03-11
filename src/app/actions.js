import { actions as timerActions } from "./features/dashboard/actions";
import { actions as sharedActions } from "./features/shared/actions";
import { loginActions, registrationActions } from "./features/auth/actions";
import accountsActions from "./features/accounts/actions";

const rootActions = {
  timerActions,
  sharedActions,
  loginActions,
  registrationActions,
  accountsActions
};

export default rootActions;
