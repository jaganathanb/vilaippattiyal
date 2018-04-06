import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { CircularProgress } from 'material-ui/Progress';
import { withStyles } from 'material-ui/styles';

import { isLoggedIn } from '../features/shared/actions';

const styles = () => ({
  center: {
    display: 'flex',
    height: '100%',
    padding: 0,
    margin: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  circle: {
    maxWidth: '50%'
  }
});

type Props = {
  classes: {},
  isAppLoading: boolean,
  loggedIn: boolean,
  isLoggedIn: () => void,
  component: React.ReactNode
};

class PrivateRoute extends React.Component<Props> {
  componentWillMount() {
    this.props.isLoggedIn();
  }

  render() {
    const {
      component: Component,
      isAppLoading,
      loggedIn,
      classes,
      ...rest
    } = this.props;

    return (
      <Route
        {...rest}
        render={props => {
          if (isAppLoading) {
            return (
              <div className={classes.center}>
                <div className={classes.circle}>
                  <CircularProgress size={160} thickness={3} />
                </div>
              </div>
            );
          }
          if (loggedIn) {
            return <Component {...props} />;
          }
          return <Redirect to="/public/auth/login" />;
        }}
      />
    );
  }
}

export default withStyles(styles)(connect(
    state => ({
      loggedIn: state.global.loggedIn,
      isAppLoading: state.global.isAppLoading
    }),
    {
      isLoggedIn
    }
  )(PrivateRoute));
