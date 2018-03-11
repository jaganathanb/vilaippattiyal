import timerLogics from "./features/dashboard/logic";
import configurationLogics from "./features/configuration/logic";
import { loginLogic, registrationLogic } from "./features/auth/logic";
import accountsLogic from "./features/accounts/logic";
import sharedLogics from "./features/shared/logic";

export default [
  ...timerLogics,
  ...loginLogic,
  ...sharedLogics,
  ...registrationLogic,
  ...configurationLogics,
  ...accountsLogic
];
