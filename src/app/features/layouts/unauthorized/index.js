import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import AuthPage from '../../auth';

const UnAuthorizedLayout = ({ match, loggedIn }) => (
  <Switch>
    <Route
      path={`${match.path}/auth`}
      render={props => <AuthPage {...props} loggedIn={loggedIn} />}
    />
    <Redirect to={`${match.path}/auth`} />
  </Switch>
);

export default UnAuthorizedLayout;
