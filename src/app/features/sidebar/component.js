import React, { PureComponent, Fragment } from 'react';
import { intlShape } from 'react-intl';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';
import { green } from 'material-ui/colors';
import Drawer from 'material-ui/Drawer';
import { MenuList, MenuItem } from 'material-ui/Menu';
import { ListItemIcon, ListItemText } from 'material-ui/List';

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
  intl: intlShape.intl,
  classes: any,
  user: any,
  menus: any[],
  onChangeTab: () => void,
  setSideBarVisibility: () => void,
  logout: () => void
};

class Sidebar extends PureComponent<Props> {
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
  getMenuList(menus) {
    const {
 currentTab, classes, user, intl 
} = this.props;
    return (
      <MenuList>
        {menus.filter(menu => menu.requiredRole === user.role).map(menu => (
          <MenuItem
            className={classes.menuItem}
            onClick={this.menuItemClicked.bind(this, menu.key)}
            key={menu.key}
          >
            <ListItemIcon className={classes.icon}>
              <menu.icon
                className={currentTab === menu.key ? classes[menu.key] : null}
              />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.primary }}
              inset
              primary={intl.formatMessage(menu.translation)}
            />
          </MenuItem>
        ))}
      </MenuList>
    );
  }

  render() {
    const { expanded, menus, classes } = this.props;

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
        {this.getMenuList(menus)}
      </Drawer>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Sidebar);
