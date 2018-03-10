import VPDashboard from '../dashboard';
import Configurations from '../configuration';
import Accounts from '../accounts';

import { Dashboard, Settings, AccountBox } from 'material-ui-icons';

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
    children: [
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
      }
    ],
    requiredRole: 'admin',
    translation: {
      id: 'vp.sideBar.accounts.title',
      defaultMessage: 'Accounts'
    }
  }
];
