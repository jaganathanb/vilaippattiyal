import { connect } from 'react-redux';
import { selectors } from './reducer';

import Accounts from './component';

import actions from './actions';

const enhance = connect(
  state => ({
    expanded: selectors.expanded(state),
    users: selectors.users(state),
    roles: selectors.roles(state),
    rolesError: selectors.rolesError(state),
    usersError: selectors.usersError(state)
  }),
  {
    onExpand: actions.expand,
    fetchUsers: actions.fetchUsers,
    fetchRoles: actions.fetchRoles
  }
);

export default enhance(Accounts);
