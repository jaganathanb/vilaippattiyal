import React, { Component } from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { createMuiTheme } from 'material-ui/styles';
import { cyan500, pinkA200 } from 'material-ui/colors';

import { Login, Registration } from './components';
import Notification from '../shared/components/notification';

const styles = {
  main: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    minWidth: 300
  },
  avatar: {
    margin: '1em',
    textAlign: 'center '
  },
  form: {
    padding: '0 1em 1em 1em'
  },
  input: {
    display: 'flex'
  }
};

function getColorsFromTheme(theme) {
  if (!theme) return { primary1Color: cyan500, accent1Color: pinkA200 };
  const { palette: { primary, type, secondary } } = theme;
  return { primary, secondary, type };
}
type Props = {
  loggedIn: boolean,
  theme: {},
  match: {}
};

class AuthContainer extends Component<Props> {
  props: Props;
  render() {
    const { loggedIn, theme, match } = this.props;

    if (loggedIn) {
      return <Redirect to="/" />;
    }

    const muiTheme = createMuiTheme(theme);
    const { primary, type } = getColorsFromTheme(muiTheme);
    return (
      <MuiThemeProvider theme={muiTheme}>
        <div style={{ ...styles.main, backgroundColor: primary[type] }}>
          <main>
            <Switch>
              <Route path={`${match.path}/login`} exact component={Login} />
              <Route path={`${match.path}/register`} component={Registration} />
              <Redirect to={`${match.path}/login`} />
            </Switch>
            <Notification />
          </main>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default AuthContainer;
