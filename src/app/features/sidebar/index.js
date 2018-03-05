import { connect } from 'react-redux';
import { withTheme } from 'material-ui/styles';

import { selectors as sideBarSelector } from './reducer';
import { actions as sideBarActions } from './actions';

import { actions as sharedActions } from '../shared/actions';

import SideBarPage from './container';

const { changeTab } = sideBarActions;
const { logout, setSideBarVisibility } = sharedActions;

const enhance = connect(
  (state, ...rest) => ({
    currentTab: sideBarSelector.currentTab(state),
    expanded: sideBarSelector.expanded(state),
    ...rest
  }),
  {
    onChangeTab: changeTab,
    setSideBarVisibility,
    logout
  }
);

export default withTheme()(enhance(SideBarPage));
