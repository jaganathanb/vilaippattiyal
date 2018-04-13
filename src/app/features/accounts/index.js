import { connect } from 'react-redux';
import { selectors } from './reducer';

import AccountsContainer from './container';

import actions from './actions';

import { showModal, hideModal } from '../shared/actions';

const enhance = connect(
  state => ({
    expanded: selectors.expanded(state),
    users: selectors.users(state),
    roles: selectors.roles(state),
    statuses: selectors.statuses(state),
    rolesError: selectors.rolesError(state),
    usersError: selectors.usersError(state),
    userSaved: selectors.userSaved(state),
    userDeleted: selectors.userDeleted(state)
  }),
  {
    saveUser: actions.saveUser,
    deleteUser: actions.deleteUser,
    saveRole: actions.saveRole,
    removeRole: actions.removeRole,
    onExpand: actions.expand,
    fetchUsers: actions.fetchUsers,
    fetchRoles: actions.fetchRoles,
    fetchStatuses: actions.fetchStatuses,
    showModal,
    hideModal
  }
);

export default enhance(AccountsContainer);
