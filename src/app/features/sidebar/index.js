import { connect } from 'react-redux';
import { withTheme } from 'material-ui/styles';

import { selectors as sideBarSelector } from './reducer';
import { actions as sideBarActions } from './actions';

import { actions as sharedActions } from '../shared/actions';
import menus from '../shared/routes';

import SideBarPage from './container';

const { changeTab } = sideBarActions;
const { logout, setSideBarVisibility } = sharedActions;

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
