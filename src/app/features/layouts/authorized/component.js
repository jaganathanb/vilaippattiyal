import React from 'react';
import { injectIntl, intlShape } from 'react-intl';

import { Switch, Route, Redirect } from 'react-router-dom';

import {
  MuiThemeProvider,
  createMuiTheme,
  withStyles
} from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';

import AppBar from '../../appBar';
import Sidebar from '../../sidebar';
import VPModal from '../../shared/components/modal';

import translations from './translations';

import routes from '../../shared/routes';

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex'
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background[theme.palette.type],
    padding: theme.spacing.unit * 3
  }
});

type Props = {
  theme: any,
  intl: intlShape.intl,
  classes: any,
  match: any,
  intl: intlShape,
  isLoading: boolean,
  history: any,
  user: any
};

class MiniDrawer extends React.Component<Props> {
  props: Props;
  render() {
    const {
      theme,
      intl,
      classes,
      match,
      isLoading,
      history,
      user
    } = this.props;

    const muiTheme = createMuiTheme(theme);

    return (
      <MuiThemeProvider theme={muiTheme}>
        <div className={classes.root}>
          <AppBar title={intl.formatMessage(translations.appBarTitle)} />
          <Sidebar
            user={user}
            theme={muiTheme}
            intl={intl}
            history={history}
            match={match}
          />
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Switch>
              {routes
                .filter(route => route.requiredRole === user.role)
                .map(route => (
                  <Route
                    {...route}
                    path={`${match.path}${route.path}`}
                    component={route.component}
                  />
                ))}
              <Redirect to={`${match.url}`} />
            </Switch>
            <VPModal />
          </main>
        </div>
        {isLoading && (
          <CircularProgress
            className="app-loader"
            color="primary"
            size={120}
            thickness={3}
          />
        )}
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles, { withTheme: true })(injectIntl(MiniDrawer));
