/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import layouts from '../features';

import AuthorizedRoute from './privateRoute';
import UnAuthorizedRoute from './publicRoute';

export default () => (
  <Switch>
    <UnAuthorizedRoute path="/public" component={layouts.UnAuthorizedLayout} />
    <AuthorizedRoute path="/" component={layouts.AuthorizedLayout} />
    <Redirect to="/public" />
  </Switch>
);
