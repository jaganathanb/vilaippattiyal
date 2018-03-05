import React from 'react';

import RegistrationForm from './component';

const RegistrationContainer = ({ registerUser, ...rest }) => (
  <RegistrationForm onSubmit={registerUser} {...rest} />
);

export default RegistrationContainer;
