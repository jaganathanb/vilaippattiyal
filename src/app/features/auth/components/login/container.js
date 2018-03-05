import React from 'react';
import LoginForm from './component';

const LoginContainer = ({ logUserIn, ...rest }) => (
  <LoginForm onSubmit={logUserIn} {...rest} />
);

export default LoginContainer;
