import { connect } from 'react-redux';
import { withTheme } from 'material-ui/styles';

import { selectors as sideBarSelector } from './reducer';
import { actions as sideBarActions } from './actions';

import { logout, setSideBarVisibility } from '../shared/actions';
import menus from '../shared/routes';

import SideBarPage from './container';

const { changeTab } = sideBarActions;

const enhance = connect(
  (state, ...rest) => ({
    currentTab: sideBarSelector.currentTab(state),
    expanded: sideBarSelector.expanded(state),
    menus,
    ...rest
  }),
  {
    onChangeTab: changeTab,
    setSideBarVisibility,
    logout
  }
);

export default withTheme()(enhance(SideBarPage));
