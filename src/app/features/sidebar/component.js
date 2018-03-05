import React from 'react';
import { intlShape } from 'react-intl';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';
import { green } from 'material-ui/colors';
import Drawer from 'material-ui/Drawer';
import { MenuList, MenuItem } from 'material-ui/Menu';
import { ListItemIcon, ListItemText } from 'material-ui/List';
import { Dashboard, Settings, PowerSettingsNew } from 'material-ui-icons';

import translations from './translations';

const drawerWidth = 240;

const styles = theme => ({
  dashboard: {
    color: green[500]
  },
  configurations: {
    color: green[500]
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    width: 60,
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  }
});

type Props = {
  expanded: boolean,
  currentTab: string,
  theme?: any,
  intl: intlShape.intl,
  onChangeTab: () => void,
  setSideBarVisibility: () => void,
  logout: () => void
};

class Sidebar extends React.Component<Props> {
  props: Props;

  menuItemClicked(menuItem = 'dashboard') {
    const { onChangeTab, setSideBarVisibility, expanded } = this.props;
    if (menuItem === 'logout') {
      this.props.logout();
    } else {
      onChangeTab(menuItem);
      if (expanded) {
        setSideBarVisibility();
      }
      this.props.history.push(`${this.props.match.path}${menuItem}`);
    }
  }

  render() {
    const {
      expanded,
      currentTab,
      setSideBarVisibility,
      classes,
      history,
      match,
      intl
    } = this.props;

    return (
      <Drawer
        variant="permanent"
        classes={{
          paper: classNames(
            classes.drawerPaper,
            !expanded && classes.drawerPaperClose
          )
        }}
        open={expanded}
      >
        <div className={classes.toolbar} />
        <MenuList>
          <MenuItem
            className={classes.menuItem}
            onClick={this.menuItemClicked.bind(this, 'dashboard')}
          >
            <ListItemIcon className={classes.icon}>
              <Dashboard
                className={
                  currentTab === 'dashboard' ? classes.dashboard : null
                }
              />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.primary }}
              inset
              primary={intl.formatMessage(translations.dashboardTitle)}
            />
          </MenuItem>
          <MenuItem
            className={classes.menuItem}
            onClick={this.menuItemClicked.bind(this, 'configurations')}
          >
            <ListItemIcon className={classes.icon}>
              <Settings
                className={
                  currentTab === 'configurations' ? classes.dashboard : null
                }
              />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.primary }}
              inset
              primary={intl.formatMessage(translations.configurationTitle)}
            />
          </MenuItem>
          <MenuItem
            className={classes.menuItem}
            onClick={this.menuItemClicked.bind(this, 'logout')}
          >
            <ListItemIcon className={classes.icon}>
              <PowerSettingsNew />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.primary }}
              inset
              primary={intl.formatMessage(translations.logoutTitle)}
            />
          </MenuItem>
        </MenuList>
      </Drawer>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Sidebar);
