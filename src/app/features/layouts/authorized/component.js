import React from 'react';
import { injectIntl, intlShape } from 'react-intl';
import Typography from 'material-ui/Typography';

import { Switch, Route, Redirect } from 'react-router-dom';

import {
  MuiThemeProvider,
  createMuiTheme,
  withStyles
} from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';

import AppBar from '../../appBar';
import Sidebar from '../../sidebar';

import TimerPage from '../../dashboard';
import ConfigurationPage from '../../configuration';

import translations from './translations';

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
  classes: {},
  match: {},
  intl: intlShape,
  isLoading: boolean
};

class MiniDrawer extends React.Component<Props> {
  props: Props;
  render() {
    const {
      theme, intl, classes, match, isLoading, history
    } = this.props;

    const muiTheme = createMuiTheme(theme);

    return (
      <MuiThemeProvider theme={muiTheme}>
        <div className={classes.root}>
          <AppBar title={intl.formatMessage(translations.appBarTitle)} />
          <Sidebar
            theme={muiTheme}
            intl={intl}
            history={history}
            match={match}
          />
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Switch>
              <Route path={`${match.path}`} exact component={TimerPage} />
              <Route path={`${match.path}dashboard`} component={TimerPage} />
              <Route
                path={`${match.path}configurations`}
                component={ConfigurationPage}
              />
              <Redirect to={`${match.url}`} />
            </Switch>
          </main>
        </div>
        {isLoading && (
          <CircularProgress
            className="app-loader"
            color="#fff"
            size={120}
            thickness={3}
            style={styles.loader}
          />
        )}
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles, { withTheme: true })(injectIntl(MiniDrawer));
