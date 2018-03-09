import Dashboard from '../dashboard';
import Configurations from '../configuration';

export default [{
  path: '/',

  component: Dashboard,
  requiredRole: 'admin',
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
  component: Configurations,
  requiredRole: 'user',
  key: 2,
  translation: {
    id: 'vp.sideBar.configuration.title',
    defaultMessage: 'Configuration'
  }
}];
