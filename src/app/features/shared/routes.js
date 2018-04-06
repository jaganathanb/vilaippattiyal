import { Dashboard, Settings, AccountBox } from 'material-ui-icons';

import VPDashboard from '../dashboard';
import Configurations from '../configuration';
import Accounts from '../accounts';

export default [
  {
    path: '/',
    component: VPDashboard,
    requiredRole: 'admin',
    icon: Dashboard,
    exact: true,
    key: 'dashboard',
    translation: {
      id: 'vp.sideBar.dashboard.title',
      defaultMessage: 'Dashboard'
    }
  },
  {
    path: 'configurations',
    key: 'configurations',
    icon: Settings,
    component: Configurations,
    requiredRole: 'admin',
    translation: {
      id: 'vp.sideBar.configuration.title',
      defaultMessage: 'Configuration'
    }
  },
  {
    path: 'accounts',
    key: 'accounts',
    component: Accounts,
    icon: AccountBox,
    requiredRole: 'admin',
    translation: {
      id: 'vp.sideBar.accounts.title',
      defaultMessage: 'Accounts'
    }
  }
];
