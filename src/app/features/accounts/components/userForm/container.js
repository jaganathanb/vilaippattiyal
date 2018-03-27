import React from 'react';

import UserForm from './component';

const UserFormContainer = ({ addUser, ...rest }) => (
  <UserForm onSubmit={addUser} {...rest} />
);

export default UserFormContainer;
