import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions as sharedActions } from '../features/shared/actions';

type Props = {
  isAppLoading: boolean,
  loggedIn: boolean,
  isLoggedIn: () => void,
  component: React.ReactNode
};

class PublicRoute extends React.Component<Props> {
  componentWillMount() {
    this.props.isLoggedIn();
  }

  render() {
    const {
      component: Component,
      isAppLoading,
      loggedIn,
      ...rest
    } = this.props;

    return (
      <Route
        {...rest}
        render={props => {
          if (isAppLoading) {
            return <div>Loading...</div>;
          }
          return <Component {...props} loggedIn={loggedIn} />;
        }}
      />
    );
  }
}

export default connect(
  state => ({
    loggedIn: state.global.loggedIn,
    isAppLoading: state.global.isAppLoading
  }),
  {
    isLoggedIn: sharedActions.isLoggedIn
  }
)(PublicRoute);
