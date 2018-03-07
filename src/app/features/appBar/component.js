import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import AccountCircle from 'material-ui-icons/AccountCircle';
import MenuIcon from 'material-ui-icons/Menu';

import { ipcRenderer } from 'electron';


const drawerWidth = 240;

const styles = theme => ({
  appBar: {
    background: theme.palette.primary[theme.palette.type],
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20
  },
  title: {
    flex: 1
  },
  accountCircle: {
    padding: `0 ${theme.spacing.unit}px 0 ${theme.spacing.unit}px`
  }
});

type Props = {
  title: string,
  toggleSidebar: () => void,
  classes: any
};

class MenuAppBar extends Component<Props> {
  props: Props;
  shouldComponentUpdate(nextProps) {
    return nextProps.title !== this.props.title || nextProps.classes.appBarShift !== this.props.classes.appBarShift;
  }
  render() {
    const { title, toggleSidebar, classes } = this.props;
    ipcRenderer.send('title', title); // updating internationalized title

    return (
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar disableGutters>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleSidebar}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit" className={classes.title} noWrap>
            {title}
          </Typography>
          <div className={classes.accountCircle}>
            <IconButton
              aria-owns="menu-appbar"
              aria-haspopup="true"
              onClick={this.handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles, { withTheme: true })(MenuAppBar);
